import { useState } from 'react';
import './landing/landing.css';
import AeroPaqLogo from "./AeroPaqLogo";

export default function ContactForm() {
    // 1. Manejamos el estado de los campos del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        telefono: '',
        mensaje: ''
    });
    //Prteccion de SPAM
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 2. Función para actualizar el estado cuando el usuario escribe
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // 3. Función para enviar los datos a Google Sheets
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue

        // Aquí irían tus validaciones de nombre, correo, teléfono y mensaje antes de enviar

        // Medida de seguridad extra: si ya está enviando, no hagas nada.
        if (isSubmitting) return;

        // Bloqueamos el formulario
        setIsSubmitting(true);

        const URL_GOOGLE_SCRIPT = 'https://script.google.com/macros/s/AKfycby7oo0Orrw2tzhdfjbt76IphHMeDP9D7YAcTnVxqIzThp_LhABWE94Dc7UPX3jYNkk2Ew/exec';

        try {
            const response = await fetch(URL_GOOGLE_SCRIPT, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            alert('¡Mensaje enviado con éxito!');
            setFormData({ nombre: '', correo: '', telefono: '', mensaje: '' });

        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
            alert('Hubo un error al enviar tu mensaje.');
        } finally {
            // Pase lo que pase (éxito o error), volvemos a habilitar el botón al terminar
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-wrapper">
            <div className="contact-header">

                <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
                    <AeroPaqLogo variant="dark" size="md" />
                </div>

                <h2>Contáctanos</h2>
                <p>Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos pronto.</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>Nombre Completo:</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                            minLength="3"
                            placeholder="Ej. Juan Pérez"
                        />
                    </div>

                    <div className="form-group">
                        <label>Correo Electrónico:</label>
                        <input
                            type="email"
                            name="correo"
                            value={formData.correo}
                            onChange={handleChange}
                            required
                            placeholder="ejemplo@correo.com"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Teléfono:</label>
                    <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                        pattern="[0-9]+"
                        title="Por favor ingresa solo números"
                        placeholder="Ej. 12345678"
                    />
                </div>

                <div className="form-group">
                    <label>Mensaje:</label>
                    <textarea
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                        rows="4"
                        placeholder="¿En qué podemos ayudarte?"
                    />
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
            </form>
        </div>
    );
}
