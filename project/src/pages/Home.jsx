import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    title: "Envío Express",
    desc: "Entregas urgentes en el menor tiempo posible a nivel nacional.",
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    title: "Internacional",
    desc: "Conectamos tus paquetes con más de 200 países alrededor del mundo.",
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
    title: "Logística Integral",
    desc: "Soluciones completas de almacenamiento, distribución y logística inversa.",
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    title: "Seguimiento 24/7",
    desc: "Monitorea el estado de tus envíos en tiempo real desde cualquier lugar.",
  },
];

const stats = [
  { value: "20+", label: "Años de experiencia" },
  { value: "200+", label: "Países con cobertura" },
  { value: "50k+", label: "Envíos mensuales" },
  { value: "99%", label: "Entregas exitosas" },
];

export default function Home() {
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

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif", color: "#2D2D2D", backgroundColor: "#F7F8FA" }}>

      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg, #1A3C6E 0%, #1e4d8c 60%, #1a5c6e 100%)",
        padding: isMobile ? "48px 20px 56px" : "80px 24px",
        display: "flex",
        alignItems: "center",
        minHeight: isMobile ? "auto" : "520px",
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          gap: isMobile ? "32px" : "48px",
        }}>
          {/* Text */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)",
              fontSize: "13px", fontWeight: "500", padding: "6px 14px",
              borderRadius: "50px", width: "fit-content",
            }}>
              🚀 Soluciones de envío para empresas y particulares
            </span>
            <h1 style={{
              fontSize: isMobile ? "36px" : "clamp(36px, 5vw, 56px)",
              fontWeight: "800", color: "#ffffff", lineHeight: "1.15",
              margin: 0, letterSpacing: "-1px",
            }}>
              Envía tus paquetes<br />con <span style={{ color: "#2ECC71" }}>AeroPaq</span>
            </h1>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: "1.7", maxWidth: "520px", margin: 0 }}>
              Soluciones de envío confiables, rápidas y seguras para empresas y particulares. Conectamos tu mundo con el resto del planeta.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "8px" }}>
              <Link to="/cotizador" style={{
                backgroundColor: "#2ECC71", color: "#ffffff", fontWeight: "700",
                fontSize: "15px", padding: "13px 28px", borderRadius: "50px", textDecoration: "none",
              }}>Cotizar Envío</Link>
              <Link to="/servicios" style={{
                backgroundColor: "transparent", color: "#ffffff", fontWeight: "600",
                fontSize: "15px", padding: "13px 28px", borderRadius: "50px", textDecoration: "none",
                border: "2px solid rgba(255,255,255,0.5)",
              }}>Ver Servicios</Link>
            </div>
          </div>

          {/* Image placeholder — hidden on mobile */}
          {!isMobile && (
            <div style={{
              width: "320px", height: "260px", flexShrink: 0,
              backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "16px",
              border: "1px dashed rgba(255,255,255,0.15)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", marginTop: "10px" }}>Imagen ilustrativa</p>
            </div>
          )}
        </div>
      </section>

      {/* STATS */}
      <section style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #EEF2F8" }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          padding: isMobile ? "28px 20px" : "32px 24px",
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: isMobile ? "20px" : "24px",
        }}>
          {stats.map((s) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <span style={{ fontSize: isMobile ? "28px" : "32px", fontWeight: "800", color: "#1A3C6E", letterSpacing: "-1px" }}>{s.value}</span>
              <span style={{ fontSize: "13px", color: "#718096", fontWeight: "500", textAlign: "center" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: isMobile ? "56px 20px" : "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700", color: "#2ECC71", textTransform: "uppercase", letterSpacing: "1px" }}>Nuestros Servicios</span>
            <h2 style={{ fontSize: isMobile ? "26px" : "36px", fontWeight: "800", color: "#1A3C6E", margin: 0, letterSpacing: "-0.5px" }}>
              Todo lo que necesitas para enviar
            </h2>
            <p style={{ fontSize: "16px", color: "#718096", maxWidth: "480px", lineHeight: "1.6", margin: 0 }}>
              Ofrecemos una gama completa de servicios logísticos adaptados a tus necesidades.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: "20px",
          }}>
            {services.map((s) => (
              <div key={s.title} style={{
                backgroundColor: "#ffffff", borderRadius: "14px", padding: "28px 24px",
                border: "1px solid #EEF2F8", display: "flex", flexDirection: "column", gap: "12px",
              }}>
                <div style={{
                  width: "52px", height: "52px", backgroundColor: "#F0FFF7",
                  borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#1A3C6E", margin: 0 }}>{s.title}</h3>
                <p style={{ fontSize: "14px", color: "#718096", lineHeight: "1.6", margin: 0, flex: 1 }}>{s.desc}</p>
                <Link to="/servicios" style={{ fontSize: "14px", fontWeight: "600", color: "#2ECC71", textDecoration: "none" }}>
                  Ver detalles →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRACKING */}
      <section style={{ padding: isMobile ? "0 20px 56px" : "0 24px 80px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            backgroundColor: "#ffffff", borderRadius: "16px",
            padding: isMobile ? "28px 20px" : "40px 48px",
            border: "1px solid #EEF2F8",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            gap: "24px",
          }}>
            <div>
              <h2 style={{ fontSize: isMobile ? "20px" : "24px", fontWeight: "800", color: "#1A3C6E", margin: "0 0 8px" }}>Rastrea tu envío</h2>
              <p style={{ fontSize: "14px", color: "#718096", margin: 0 }}>Ingresa tu número de seguimiento para conocer el estado de tu paquete.</p>
            </div>
            <div style={{ display: "flex", gap: "10px", width: isMobile ? "100%" : "auto", flex: isMobile ? "none" : 1, maxWidth: "420px" }}>
              <input type="text" placeholder="Ej: APQ123456789" style={{
                flex: 1, padding: "12px 16px", borderRadius: "8px",
                border: "1.5px solid #E2E8F0", fontSize: "14px", outline: "none", fontFamily: "inherit",
              }}/>
              <button style={{
                backgroundColor: "#1A3C6E", color: "#ffffff", fontWeight: "600",
                fontSize: "14px", padding: "12px 20px", borderRadius: "8px",
                border: "none", cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
              }}>Rastrear</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{
        background: "linear-gradient(135deg, #1A3C6E, #1e4d8c)",
        padding: isMobile ? "56px 20px" : "80px 24px",
        textAlign: "center",
      }}>
        <h2 style={{ fontSize: isMobile ? "24px" : "36px", fontWeight: "800", color: "#ffffff", margin: "0 0 12px", letterSpacing: "-0.5px" }}>
          ¿Listo para enviar tu primer paquete?
        </h2>
        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", margin: "0 0 32px" }}>
          Obtén una cotización personalizada en menos de 2 minutos.
        </p>
        <Link to="/cotizador" style={{
          backgroundColor: "#2ECC71", color: "#ffffff", fontWeight: "700",
          fontSize: "15px", padding: "14px 32px", borderRadius: "50px",
          textDecoration: "none", display: "inline-block",
        }}>Cotizar Ahora</Link>
      </section>

    </div>
  );
}
