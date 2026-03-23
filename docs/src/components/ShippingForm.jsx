import { useState } from 'react';
// 1. Importamos la función matemática
import { calcularCotizacion } from '.././utils/shippingMath';

export default function ShippingForm() {
    const [formData, setFormData] = useState({
        origenDestino: 'local',
        peso: '',
        largo: '',
        ancho: '',
        alto: '',
        nivelServicio: 'estandar',
        recoleccion: false,
        seguro: false
    });

    // 2. Nuevo estado para guardar el resultado de la cotización
    const [resultadoCotizacion, setResultadoCotizacion] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const datosProcesados = {
            origenDestino: formData.origenDestino,
            peso: Number(formData.peso),
            nivelServicio: formData.nivelServicio,
            recoleccion: formData.recoleccion,
            seguro: formData.seguro,
            dimensiones: (formData.largo && formData.ancho && formData.alto)
                ? [Number(formData.largo), Number(formData.ancho), Number(formData.alto)]
                : undefined
        };

        // 3. Llamamos a la función y guardamos el resultado en el estado
        const cotizacionCalculada = calcularCotizacion(datosProcesados);
        setResultadoCotizacion(cotizacionCalculada);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Cotizador de Envíos</h2>

            {/* --- FORMULARIO --- */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontWeight: 'bold' }}>Origen y Destino:</label>
                    <select name="origenDestino" value={formData.origenDestino} onChange={handleChange} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
                        <option value="local">Misma Ciudad</option>
                        <option value="nacional">Otro Departamento</option>
                        <option value="internacional">Internacional</option>
                    </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontWeight: 'bold' }}>Peso físico (Libras):</label>
                    <input type="number" onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()} name="peso" value={formData.peso} onChange={handleChange} required min="0.1" step="0.1" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                </div>

                {/* Dimensiones (Opcionales) */}
                <fieldset style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', boxSizing: 'border-box', width: '100%' }}>
                    <legend style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Dimensiones en cm (Opcional)</legend>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <input
                            type="number" onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()} name="largo" placeholder="Largo" value={formData.largo} onChange={handleChange} min="1"
                            style={{ flex: '1 1 80px', minWidth: '0', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                        />
                        <input
                            type="number" onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()} name="ancho" placeholder="Ancho" value={formData.ancho} onChange={handleChange} min="1"
                            style={{ flex: '1 1 80px', minWidth: '0', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                        />
                        <input
                            type="number" onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()} name="alto" placeholder="Alto" value={formData.alto} onChange={handleChange} min="1"
                            style={{ flex: '1 1 80px', minWidth: '0', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                        />
                    </div>
                </fieldset>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontWeight: 'bold' }}>Nivel de Servicio:</label>
                    <select name="nivelServicio" value={formData.nivelServicio} onChange={handleChange} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
                        <option value="estandar">Estándar</option>
                        <option value="expres">Exprés</option>
                    </select>
                </div>

                <fieldset style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                    <legend style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Servicios Extra</legend>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input type="checkbox" name="recoleccion" checked={formData.recoleccion} onChange={handleChange} />
                            Recolección a domicilio
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input type="checkbox" name="seguro" checked={formData.seguro} onChange={handleChange} />
                            Seguro contra pérdida
                        </label>
                    </div>
                </fieldset>

                <button type="submit" style={{ padding: '12px', backgroundColor: '#0d6efd', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', marginTop: '10px' }}>
                    Calcular Costo
                </button>
            </form>

            {/* --- RESULTADOS DE LA COTIZACIÓN --- */}
            {/* Esta sección solo se dibuja si 'resultadoCotizacion' tiene datos */}
            {resultadoCotizacion && (
                <div style={{ marginTop: '2rem', padding: '20px', backgroundColor: '#eef2f7', borderRadius: '8px', borderLeft: '5px solid #0d6efd' }}>
                    <h3 style={{ margin: '0 0 15px 0', color: '#0d6efd' }}>Resumen de Cotización</h3>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #ccc' }}>
                        <div>
                            <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#666' }}>Tiempo Estimado </p>
                            <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.1rem' }}>{resultadoCotizacion.tiempoEstimado} </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#666' }}>Costo Total</p>
                            <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.5rem', color: '#198754' }}>
                                Q{resultadoCotizacion.total.toFixed(2)}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#333' }}>Desglose de Costos </h4>
                        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: '#555', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Costo Base:</span>
                                <span>Q{resultadoCotizacion.desglose.base.toFixed(2)} </span>
                            </li>
                            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Costo por Distancia:</span>
                                <span>Q{resultadoCotizacion.desglose.distancia.toFixed(2)} </span>
                            </li>
                            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Costo por Peso / Volumen:</span>
                                <span>Q{resultadoCotizacion.desglose.peso.toFixed(2)} </span>
                            </li>
                            {resultadoCotizacion.desglose.recargoServicio > 0 && (
                                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Recargo Servicio Exprés:</span>
                                    <span>Q{resultadoCotizacion.desglose.recargoServicio.toFixed(2)}</span>
                                </li>
                            )}
                            {resultadoCotizacion.desglose.extras > 0 && (
                                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Servicios Extra:</span>
                                    <span>Q{resultadoCotizacion.desglose.extras.toFixed(2)}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
