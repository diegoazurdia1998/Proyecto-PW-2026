import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: "Confianza",
    description: "Más de 20 años siendo el aliado logístico de miles de empresas y personas, cumpliendo cada compromiso con responsabilidad y transparencia.",
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    title: "Innovación",
    description: "Adoptamos las últimas tecnologías en logística para ofrecer soluciones más eficientes, rápidas y confiables a nuestros clientes.",
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>,
    title: "Eficiencia",
    description: "Optimizamos cada proceso para garantizar entregas puntuales y costos competitivos, maximizando el valor para nuestros clientes.",
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    title: "Seguridad",
    description: "Protocolos estrictos de manejo y transporte, con seguros incluidos y sistemas de rastreo en tiempo real para tu tranquilidad.",
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    title: "Compromiso",
    description: "Cada paquete es importante para nosotros. Tratamos cada envío con el cuidado y la atención que merece, como si fuera nuestro.",
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 0 1 0 20"/><path d="M12 2C8 6 8 12 12 22"/><path d="M2 12h20"/></svg>,
    title: "Sostenibilidad",
    description: "Comprometidos con el medio ambiente, implementamos prácticas ecológicas y buscamos reducir nuestra huella de carbono continuamente.",
  },
];

const stats = [
  { value: "20+", label: "Años de experiencia" },
  { value: "200+", label: "Países conectados" },
  { value: "5M+", label: "Envíos anuales" },
  { value: "10K+", label: "Clientes activos" },
];

const teamStats = [
  { value: "5,000+", label: "Empleados" },
  { value: "150+", label: "Oficinas" },
  { value: "500+", label: "Vehículos" },
];

export default function SobreNosotros() {
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
    <div style={{ backgroundColor: "#ffffff", fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif" }}>

      {/* HEADER */}
      <section style={{ backgroundColor: "#1A3C6E", color: "#ffffff", padding: isMobile ? "56px 20px" : "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <span style={{ fontSize: "13px", fontWeight: "700", color: "#2ECC71", textTransform: "uppercase", letterSpacing: "1px" }}>
            Quiénes somos
          </span>
          <h1 style={{ fontSize: isMobile ? "28px" : "44px", fontWeight: "800", margin: "12px 0 16px", letterSpacing: "-1px", maxWidth: "700px", marginLeft: "auto", marginRight: "auto" }}>
            Más de 20 años conectando personas y negocios
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.8)", maxWidth: "620px", lineHeight: "1.7", margin: "0 auto" }}>
            Somos líderes en soluciones logísticas integrales, comprometidos con la excelencia y la innovación en cada envío.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: isMobile ? "40px 20px" : "64px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: "16px",
          }}>
            {stats.map((s) => (
              <div key={s.label} style={{
                textAlign: "center", padding: isMobile ? "24px 16px" : "32px 20px",
                backgroundColor: "#F7F8FA", borderRadius: "14px",
                border: "1px solid #EEF2F8",
              }}>
                <div style={{ fontSize: isMobile ? "36px" : "48px", fontWeight: "800", color: "#2ECC71", letterSpacing: "-2px", marginBottom: "8px" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "14px", color: "#4A5568", fontWeight: "500" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section style={{ backgroundColor: "#F7F8FA", padding: isMobile ? "48px 20px" : "72px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700", color: "#2ECC71", textTransform: "uppercase", letterSpacing: "1px" }}>
              Nuestra razón de ser
            </span>
            <h2 style={{ fontSize: isMobile ? "26px" : "34px", fontWeight: "800", color: "#1A3C6E", margin: "12px 0 0", letterSpacing: "-0.5px" }}>
              Misión y Visión
            </h2>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "20px",
          }}>
            {/* Mission */}
            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: isMobile ? "28px" : "36px", border: "1px solid #EEF2F8", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", backgroundColor: "#2ECC71" }} />
              <div style={{ width: "44px", height: "44px", backgroundColor: "#F0FFF7", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#1A3C6E", margin: "0 0 14px" }}>Nuestra Misión</h2>
              <p style={{ fontSize: "15px", color: "#718096", lineHeight: "1.8", margin: 0 }}>
                Facilitar el comercio y las conexiones humanas a través de soluciones logísticas confiables, eficientes e innovadoras. Nos esforzamos por superar las expectativas de nuestros clientes en cada envío, contribuyendo al crecimiento de sus negocios y la satisfacción de sus necesidades personales.
              </p>
            </div>

            {/* Vision */}
            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: isMobile ? "28px" : "36px", border: "1px solid #EEF2F8", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", backgroundColor: "#1A3C6E" }} />
              <div style={{ width: "44px", height: "44px", backgroundColor: "#EEF2F8", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A3C6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#1A3C6E", margin: "0 0 14px" }}>Nuestra Visión</h2>
              <p style={{ fontSize: "15px", color: "#718096", lineHeight: "1.8", margin: 0 }}>
                Ser la empresa de logística más confiable y preferida en América Latina, reconocida por nuestra excelencia en el servicio, innovación tecnológica y compromiso con la sostenibilidad. Aspiramos a conectar cada rincón del continente con soluciones que transformen la forma en que las personas y empresas envían.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: isMobile ? "48px 20px" : "72px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700", color: "#2ECC71", textTransform: "uppercase", letterSpacing: "1px" }}>
              Lo que nos define
            </span>
            <h2 style={{ fontSize: isMobile ? "26px" : "34px", fontWeight: "800", color: "#1A3C6E", margin: "12px 0 12px", letterSpacing: "-0.5px" }}>
              Nuestros Valores
            </h2>
            <p style={{ fontSize: "15px", color: "#718096", maxWidth: "480px", margin: "0 auto", lineHeight: "1.6" }}>
              Los principios que guían cada decisión y acción en AeroPaq.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
            gap: "20px",
          }}>
            {values.map((v) => (
              <div key={v.title} style={{
                backgroundColor: "#ffffff", borderRadius: "14px", padding: "28px",
                border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "14px",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}>
                <div style={{ width: "60px", height: "60px", backgroundColor: "#F0FFF7", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {v.icon}
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1A3C6E", margin: 0 }}>{v.title}</h3>
                <p style={{ fontSize: "14px", color: "#718096", lineHeight: "1.7", margin: 0 }}>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM BANNER */}
      <section style={{ background: "linear-gradient(135deg, #1A3C6E 0%, #1e4d8c 60%, #1a5c6e 100%)", padding: isMobile ? "56px 20px" : "80px 24px", textAlign: "center", color: "#ffffff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: isMobile ? "24px" : "34px", fontWeight: "800", margin: "0 0 12px", letterSpacing: "-0.5px" }}>
            Un equipo comprometido con tu éxito
          </h2>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.8)", maxWidth: "540px", margin: "0 auto 48px", lineHeight: "1.7" }}>
            Más de 5,000 profesionales trabajan cada día para que tus envíos lleguen a su destino de forma segura y puntual.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: "20px", maxWidth: "700px", margin: "0 auto",
          }}>
            {teamStats.map((s) => (
              <div key={s.label} style={{ backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "14px", padding: "28px 20px", border: "1px solid rgba(255,255,255,0.12)" }}>
                <div style={{ fontSize: "36px", fontWeight: "800", color: "#2ECC71", marginBottom: "8px", letterSpacing: "-1px" }}>{s.value}</div>
                <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", fontWeight: "500" }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "40px" }}>
            <Link to="/contacto" style={{ backgroundColor: "#2ECC71", color: "#ffffff", fontWeight: "700", fontSize: "15px", padding: "14px 32px", borderRadius: "50px", textDecoration: "none", display: "inline-block" }}>
              Trabaja con Nosotros
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
