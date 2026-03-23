import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const sections = [
  {
    number: "2.1",
    title: "Recolección de Información",
    content: "La plataforma recolecta datos a través del formulario de contacto. La información recopilada incluye, de forma enunciativa pero no limitativa: nombre, correo electrónico y detalles del paquete para la cotización.",
  },
  {
    number: "2.2",
    title: "Uso y Finalidad de los Datos",
    content: "Los datos recolectados se utilizan exclusivamente para:",
    list: [
      "Procesar las solicitudes de cotización mediante la lógica de negocio implementada.",
      "Establecer contacto directo con el cliente a través de la integración con Google Apps Script.",
      "Mejorar la experiencia de usuario y la precisión de los algoritmos de envío.",
    ],
  },
  {
    number: "2.3",
    title: "Almacenamiento y Seguridad",
    content: "AeroPaq implementa medidas de seguridad estándar para la transmisión de datos. Al ser una aplicación que utiliza microservicios de terceros para el backend, el almacenamiento se rige bajo los protocolos de seguridad de la infraestructura en la nube utilizada.",
  },
  {
    number: "2.4",
    title: "Derechos del Usuario (ARCO)",
    content: "De acuerdo con las buenas prácticas de ingeniería, el usuario tiene derecho a solicitar la actualización o eliminación de sus datos de contacto de nuestra base de datos en cualquier momento mediante una solicitud formal a través de los canales de soporte del sitio.",
  },
];

export default function Privacidad() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ backgroundColor: "#F7F8FA", fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif", minHeight: "100vh" }}>

      {/* HEADER */}
      <section style={{ backgroundColor: "#1A3C6E", color: "#ffffff", padding: isMobile ? "48px 20px" : "72px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Link to="/" style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "20px" }}>
            ← Volver al inicio
          </Link>
          <span style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#2ECC71", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>
            Tratamiento de Datos Personales
          </span>
          <h1 style={{ fontSize: isMobile ? "28px" : "40px", fontWeight: "800", margin: "0 0 12px", letterSpacing: "-1px" }}>
            Política de Privacidad
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", margin: 0 }}>
            Última actualización: enero 2026
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ padding: isMobile ? "40px 20px 64px" : "56px 24px 80px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
          {sections.map((s) => (
            <div key={s.number} style={{
              backgroundColor: "#ffffff", borderRadius: "14px",
              padding: isMobile ? "24px" : "32px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <span style={{
                  backgroundColor: "#EEF2F8", color: "#1A3C6E",
                  fontSize: "12px", fontWeight: "700", padding: "4px 10px",
                  borderRadius: "6px", flexShrink: 0,
                }}>
                  {s.number}
                </span>
                <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#1A3C6E", margin: 0 }}>{s.title}</h2>
              </div>
              <p style={{ fontSize: "15px", color: "#4A5568", lineHeight: "1.75", margin: 0 }}>{s.content}</p>
              {s.list && (
                <ul style={{ margin: "12px 0 0 0", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {s.list.map((item, i) => (
                    <li key={i} style={{ fontSize: "15px", color: "#4A5568", lineHeight: "1.6" }}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Link a términos */}
          <div style={{ backgroundColor: "#F0FFF7", borderRadius: "14px", padding: "24px 28px", border: "1px solid #C6F6D5", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <p style={{ fontSize: "15px", fontWeight: "600", color: "#1A3C6E", margin: "0 0 4px" }}>¿Buscas los Términos y Condiciones?</p>
              <p style={{ fontSize: "13.5px", color: "#718096", margin: 0 }}>Conoce las condiciones de uso de la plataforma.</p>
            </div>
            <Link to="/terminos" style={{
              backgroundColor: "#2ECC71", color: "#ffffff", fontWeight: "600",
              fontSize: "14px", padding: "10px 20px", borderRadius: "50px",
              textDecoration: "none", whiteSpace: "nowrap",
            }}>
              Ver Términos →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
