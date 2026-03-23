import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const sections = [
  {
    number: "1.1",
    title: "Aceptación de los Términos",
    content: "Al acceder y utilizar la plataforma AeroPaq, el usuario acepta de manera expresa los presentes Términos y Condiciones. El uso del sistema de cotización y contacto implica la comprensión de que esta es una herramienta de gestión logística digital desarrollada con fines educativos y de optimización de servicios de mensajería.",
  },
  {
    number: "1.2",
    title: "Descripción del Servicio",
    content: "AeroPaq proporciona una interfaz basada en React para el cálculo de tarifas de envío y la gestión de solicitudes de información. Los cálculos presentados son referenciales y sujetos a las variables logísticas de peso, volumen y destino ingresadas por el usuario.",
  },
  {
    number: "1.3",
    title: "Responsabilidad del Usuario",
    content: "El usuario se compromete a:",
    list: [
      "Proporcionar información verídica en los formularios de contacto.",
      "No utilizar scripts maliciosos o herramientas de automatización que comprometan la integridad de la infraestructura web.",
      "Utilizar el cotizador únicamente para fines de consulta logística.",
    ],
  },
  {
    number: "1.4",
    title: "Limitación de Responsabilidad",
    content: "AeroPaq no se hace responsable por errores derivados de la entrada de datos incorrectos por parte del usuario ni por interrupciones técnicas ajenas al control del desarrollo (servicios de hosting o APIs externas).",
  },
];

export default function Terminos() {
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
            Versión 1.0 – Proyecto Académico
          </span>
          <h1 style={{ fontSize: isMobile ? "28px" : "40px", fontWeight: "800", margin: "0 0 12px", letterSpacing: "-1px" }}>
            Términos y Condiciones de Uso
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

          {/* Link a privacidad */}
          <div style={{ backgroundColor: "#F0FFF7", borderRadius: "14px", padding: "24px 28px", border: "1px solid #C6F6D5", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <p style={{ fontSize: "15px", fontWeight: "600", color: "#1A3C6E", margin: "0 0 4px" }}>¿Buscas la Política de Privacidad?</p>
              <p style={{ fontSize: "13.5px", color: "#718096", margin: 0 }}>Conoce cómo tratamos tus datos personales.</p>
            </div>
            <Link to="/privacidad" style={{
              backgroundColor: "#2ECC71", color: "#ffffff", fontWeight: "600",
              fontSize: "14px", padding: "10px 20px", borderRadius: "50px",
              textDecoration: "none", whiteSpace: "nowrap",
            }}>
              Ver Política →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
