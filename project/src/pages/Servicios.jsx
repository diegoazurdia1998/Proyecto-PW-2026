import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    title: "Envío Nacional",
    description: "Cobertura completa en todo el territorio nacional con entregas rápidas y seguras. Ideal para e-commerce y envíos personales.",
    features: ["Entregas 2-5 días", "Seguimiento en tiempo real", "Seguro incluido"],
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    title: "Envío Internacional",
    description: "Conectamos tu negocio con más de 200 países. Gestión integral de aduanas y documentación internacional.",
    features: ["Cobertura global", "Gestión aduanera", "Asesoría especializada"],
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    title: "Envío Express",
    description: "Entregas urgentes en 24-48 horas a principales ciudades. Servicio premium con máxima prioridad.",
    features: ["24-48 horas", "Prioridad máxima", "Notificaciones SMS"],
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    title: "Carga Pesada",
    description: "Soluciones especializadas para envíos de gran volumen y peso. Equipos dedicados y vehículos especializados.",
    features: ["Sin límite de peso", "Embalaje especializado", "Manejo industrial"],
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></svg>,
    title: "Logística Inversa",
    description: "Gestión completa de devoluciones y retornos. Optimiza tu cadena de suministro con nuestro servicio de reversa.",
    features: ["Gestión de devoluciones", "Recolección programada", "Informes detallados"],
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    title: "Almacenamiento",
    description: "Bodegas seguras y climatizadas con sistemas de gestión avanzados. Soluciones de fulfillment integradas.",
    features: ["Bodegas seguras", "Control de inventario", "Fulfillment"],
  },
];

const values = [
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: "Seguridad Garantizada",
    description: "Todos los envíos incluyen seguro y rastreo",
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    title: "Puntualidad",
    description: "98% de entregas a tiempo",
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
    title: "Calidad Certificada",
    description: "Certificaciones internacionales ISO",
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    title: "Soporte 24/7",
    description: "Atención al cliente siempre disponible",
  },
];

export default function Servicios() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cols = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";
  const valCols = isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)";

  return (
    <div style={{ backgroundColor: "#ffffff", fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif" }}>

      {/* HEADER */}
      <section style={{ backgroundColor: "#1A3C6E", color: "#ffffff", padding: isMobile ? "48px 20px" : "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <span style={{ fontSize: "13px", fontWeight: "700", color: "#2ECC71", textTransform: "uppercase", letterSpacing: "1px" }}>
            Lo que ofrecemos
          </span>
          <h1 style={{ fontSize: isMobile ? "32px" : "44px", fontWeight: "800", margin: "12px 0 16px", letterSpacing: "-1px" }}>
            Nuestros Servicios
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.8)", maxWidth: "600px", lineHeight: "1.7", margin: 0 }}>
            Soluciones completas de envío y logística diseñadas para satisfacer todas tus necesidades, desde paquetes personales hasta carga empresarial.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section style={{ padding: isMobile ? "48px 20px" : "72px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: cols, gap: "20px" }}>
            {services.map((s) => (
              <div key={s.title} style={{
                backgroundColor: "#ffffff", padding: isMobile ? "24px" : "32px",
                borderRadius: "14px", border: "1px solid #E2E8F0",
                display: "flex", flexDirection: "column", gap: "12px",
                transition: "box-shadow 0.2s",
              }}>
                <div style={{
                  width: "60px", height: "60px", backgroundColor: "#F0FFF7",
                  borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1A3C6E", margin: 0 }}>{s.title}</h3>
                <p style={{ fontSize: "14px", color: "#718096", lineHeight: "1.65", margin: 0 }}>{s.description}</p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {s.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", color: "#4A5568" }}>
                      <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#2ECC71", flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/cotizador" style={{ fontSize: "14px", fontWeight: "600", color: "#2ECC71", textDecoration: "none", marginTop: "4px" }}>
                  Ver Detalles →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ backgroundColor: "#F7F8FA", padding: isMobile ? "48px 20px" : "72px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700", color: "#2ECC71", textTransform: "uppercase", letterSpacing: "1px" }}>
              Nuestras ventajas
            </span>
            <h2 style={{ fontSize: isMobile ? "26px" : "34px", fontWeight: "800", color: "#1A3C6E", margin: "12px 0 12px", letterSpacing: "-0.5px" }}>
              Por Qué Elegir AeroPaq
            </h2>
            <p style={{ fontSize: "15px", color: "#718096", maxWidth: "520px", margin: "0 auto", lineHeight: "1.6" }}>
              Más de 20 años de experiencia nos respaldan como líderes en soluciones logísticas.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: valCols, gap: "16px" }}>
            {values.map((v) => (
              <div key={v.title} style={{
                backgroundColor: "#ffffff", padding: "28px 20px",
                borderRadius: "14px", textAlign: "center",
                border: "1px solid #EEF2F8",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "12px",
              }}>
                <div style={{
                  width: "56px", height: "56px", backgroundColor: "#F0FFF7",
                  borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {v.icon}
                </div>
                <h4 style={{ fontSize: "15px", fontWeight: "700", color: "#1A3C6E", margin: 0 }}>{v.title}</h4>
                <p style={{ fontSize: "13.5px", color: "#718096", margin: 0, lineHeight: "1.5" }}>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: "linear-gradient(135deg, #1A3C6E, #1e4d8c)",
        padding: isMobile ? "56px 20px" : "80px 24px",
        textAlign: "center",
      }}>
        <h2 style={{ fontSize: isMobile ? "24px" : "34px", fontWeight: "800", color: "#ffffff", margin: "0 0 12px", letterSpacing: "-0.5px" }}>
          ¿Listo para cotizar tu envío?
        </h2>
        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", margin: "0 0 32px" }}>
          Obtén un precio personalizado en menos de 2 minutos.
        </p>
        <Link to="/cotizador" style={{
          backgroundColor: "#2ECC71", color: "#ffffff", fontWeight: "700",
          fontSize: "15px", padding: "14px 32px", borderRadius: "50px",
          textDecoration: "none", display: "inline-block",
        }}>
          Cotizar Ahora
        </Link>
      </section>

    </div>
  );
}
