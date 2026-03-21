import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { logger } from '../utils/logger'; // ← importa el logger
import './landing/landing.css';

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TPL_CONFIRM = import.meta.env.VITE_EMAILJS_TEMPLATE_CONFIRMACION;
const TPL_NOTIFY  = import.meta.env.VITE_EMAILJS_TEMPLATE_NOTIFICACION;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function ContactForm() {

  const [formData, setFormData] = useState({
    nombre: '', correo: '', telefono: '', mensaje: ''
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    logger.info('FORM_SUBMIT', { correo: formData.correo, nombre: formData.nombre });

    try {
      // Confirmación al usuario
      await emailjs.send(SERVICE_ID, TPL_CONFIRM, formData, PUBLIC_KEY);
      logger.success('EMAIL_CONFIRMACION_SENT', { destinatario: formData.correo });

      // Notificación interna
      await emailjs.send(SERVICE_ID, TPL_NOTIFY, formData, PUBLIC_KEY);
      logger.success('EMAIL_NOTIFICACION_SENT', { nombre: formData.nombre });

      setStatus('success');
      setFormData({ nombre: '', correo: '', telefono: '', mensaje: '' });

    } catch (error) {
      logger.error('EMAIL_SEND_FAILED', {
        message: error?.text || error?.message || 'Unknown error',
        status: error?.status,
      });
      setStatus('error');
    }
  };

  return (
    <div className="contact-wrapper">
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Nombre Completo:</label>
            <input type="text" name="nombre" value={formData.nombre}
              onChange={handleChange} required minLength="3" placeholder="Ej. Juan Pérez" />
          </div>
          <div className="form-group">
            <label>Correo Electrónico:</label>
            <input type="email" name="correo" value={formData.correo}
              onChange={handleChange} required placeholder="ejemplo@correo.com" />
          </div>
        </div>

        <div className="form-group">
          <label>Teléfono:</label>
          <input type="tel" name="telefono" value={formData.telefono}
            onChange={handleChange} required pattern="[0-9]+" placeholder="Ej. 12345678" />
        </div>

        <div className="form-group">
          <label>Mensaje:</label>
          <textarea name="mensaje" value={formData.mensaje}
            onChange={handleChange} required rows="4" placeholder="¿En qué podemos ayudarte?" />
        </div>

        <button type="submit" className="submit-btn" disabled={status === 'sending'}>
          {status === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
        </button>

        {status === 'success' && (
          <div style={{
            marginTop: '16px', padding: '14px 18px',
            backgroundColor: '#F0FFF7', border: '1px solid #2ECC71',
            borderRadius: '10px', color: '#1A7A45', fontSize: '14px',
            display: 'flex', alignItems: 'center', gap: '10px'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            ¡Mensaje enviado! Te responderemos en menos de 24 horas.
          </div>
        )}
        {status === 'error' && (
          <div style={{
            marginTop: '16px', padding: '14px 18px',
            backgroundColor: '#FFF5F5', border: '1px solid #FC8181',
            borderRadius: '10px', color: '#C53030', fontSize: '14px',
            display: 'flex', alignItems: 'center', gap: '10px'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E53E3E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Error al enviar. Verifica tu conexión e intenta de nuevo.
          </div>
        )}
      </form>
    </div>
  );
}
