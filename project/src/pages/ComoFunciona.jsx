import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const steps = [
  {
    number: 1,
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    title: "Cotiza tu envío",
    description: "Ingresa los detalles de tu paquete y destino en nuestro cotizador online. Obtén el precio al instante y elige el servicio que mejor se adapte a tus necesidades.",
    cta: "Cotizar ahora",
    to: "/cotizador",
  },
  {
    number: 2,
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    title: "Programa la recolección",
    description: "Selecciona la fecha y hora más conveniente para que recojamos tu paquete. También puedes llevarlo directamente a cualquiera de nuestras oficinas.",
    cta: "Ver oficinas",
    to: "/cobertura",
  },
  {
    number: 3,
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    title: "Prepara tu paquete",
    description: "Embala tu paquete de forma segura siguiendo nuestras recomendaciones. Imprime la guía de envío y pégala en un lugar visible del paquete.",
    cta: "Guía de embalaje",
    to: "/servicios",
  },
  {
    number: 4,
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    title: "Enviamos tu paquete",
    description: "Nuestro equipo recogerá tu paquete y lo transportará de forma segura hasta su destino. Mantenemos tu envío bajo estrictos controles de calidad.",
    cta: "Ver proceso",
    to: "/servicios",
  },
  {
    number: 5,
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    title: "Recibe confirmación",
    description: "Te notificamos cuando tu paquete ha sido entregado exitosamente. Puedes rastrear tu envío en tiempo real desde nuestra plataforma.",
    cta: "Rastrear envío",
    to: "/",
  },
];

const infoCards = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    title: "Notificaciones en Tiempo Real",
    desc: "Recibe actualizaciones por SMS y email en cada etapa del envío.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
    title: "Seguro Incluido",
    desc: "Todos los envíos incluyen seguro básico sin costo adicional.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    title: "Garantía de Entrega",
    desc: "Si no cumplimos con el tiempo estimado, te devolvemos el costo.",
  },
];

export default function ComoFunciona() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ backgroundColor: "#ffffff", fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif" }}>

      {/* HEADER */}
      <section style={{ backgroundColor: "#1A3C6E", color: "#ffffff", padding: isMobile ? "48px 20px" : "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <span style={{ fontSize: "13px", fontWeight: "700", color: "#2ECC71", textTransform: "uppercase", letterSpacing: "1px" }}>
            Proceso de envío
          </span>
          <h1 style={{ fontSize: isMobile ? "32px" : "44px", fontWeight: "800", margin: "12px 0 16px", letterSpacing: "-1px" }}>
            Cómo Funciona
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.8)", maxWidth: "600px", lineHeight: "1.7", margin: 0 }}>
            Enviar con AeroPaq es simple y rápido. Sigue estos 5 pasos y tu paquete estará en camino en cuestión de minutos.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ padding: isMobile ? "48px 20px" : "72px 24px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", position: "relative" }}>

          {/* Vertical green line */}
          {!isMobile && (
            <div style={{
              position: "absolute",
              left: "31px",
              top: "32px",
              bottom: "32px",
              width: "2px",
              backgroundColor: "#2ECC71",
              zIndex: 0,
            }} />
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "24px" : "40px" }}>
            {steps.map((step) => (
              <div key={step.number} style={{ display: "flex", gap: isMobile ? "16px" : "28px", alignItems: "flex-start", position: "relative" }}>

                {/* Circle */}
                <div style={{
                  flexShrink: 0,
                  width: "64px", height: "64px",
                  backgroundColor: "#2ECC71",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  zIndex: 1,
                  boxShadow: "0 4px 16px rgba(46,204,113,0.35)",
                  border: "3px solid #ffffff",
                }}>
                  {step.icon}
                </div>

                {/* Card */}
                <div style={{
                  flex: 1,
                  backgroundColor: "#ffffff",
                  borderRadius: "14px",
                  border: "1px solid #E2E8F0",
                  padding: isMobile ? "20px" : "24px 28px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  marginTop: "8px",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1A3C6E", margin: 0 }}>
                      {step.title}
                    </h3>
                    <span style={{ fontSize: "12px", fontWeight: "700", color: "#2ECC71", backgroundColor: "#F0FFF7", padding: "4px 10px", borderRadius: "50px", whiteSpace: "nowrap", marginLeft: "12px" }}>
                      Paso {step.number}
                    </span>
                  </div>
                  <p style={{ fontSize: "14px", color: "#718096", lineHeight: "1.7", margin: "0 0 14px" }}>
                    {step.description}
                  </p>
                  <Link to={step.to} style={{ fontSize: "14px", fontWeight: "600", color: "#2ECC71", textDecoration: "none" }}>
                    {step.cta} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INFO CARDS */}
      <section style={{ backgroundColor: "#F7F8FA", padding: isMobile ? "48px 20px" : "72px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: "20px",
          }}>
            {infoCards.map((card) => (
              <div key={card.title} style={{
                backgroundColor: "#ffffff", borderRadius: "14px", padding: "28px 24px",
                border: "1px solid #EEF2F8", textAlign: "center",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "14px",
              }}>
                <div style={{
                  width: "52px", height: "52px", backgroundColor: "#F0FFF7",
                  borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {card.icon}
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1A3C6E", margin: 0 }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: "13.5px", color: "#718096", lineHeight: "1.6", margin: 0 }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: isMobile ? "56px 20px" : "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: isMobile ? "26px" : "34px", fontWeight: "800", color: "#1A3C6E", margin: "0 0 12px", letterSpacing: "-0.5px" }}>
            ¿Listo para enviar?
          </h2>
          <p style={{ fontSize: "16px", color: "#718096", margin: "0 0 32px", lineHeight: "1.6" }}>
            Comienza ahora y experimenta la forma más fácil de enviar tus paquetes.
          </p>
          <Link to="/cotizador" style={{
            backgroundColor: "#2ECC71", color: "#ffffff", fontWeight: "700",
            fontSize: "15px", padding: "14px 36px", borderRadius: "50px",
            textDecoration: "none", display: "inline-block",
          }}>
            Empezar Ahora
          </Link>
        </div>
      </section>

    </div>
  );
}
