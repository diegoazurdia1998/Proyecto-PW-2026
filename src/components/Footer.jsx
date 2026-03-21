import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer style={{ backgroundColor: "#1A3C6E", color: "#ffffff", fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif" }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: isMobile ? "40px 20px 32px" : "56px 24px 48px",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr 1fr" : "2fr 1fr 1fr 1fr",
        gap: isMobile ? "32px 20px" : "40px",
      }}>

        {/* Brand — full width on mobile */}
        <div style={{ gridColumn: isMobile ? "1 / -1" : "auto", display: "flex", flexDirection: "column", gap: "16px" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div style={{
              width: "36px", height: "36px", backgroundColor: "rgba(255,255,255,0.15)",
              borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
            <span style={{ fontSize: "19px", fontWeight: "700", color: "#ffffff" }}>AeroPaq</span>
          </Link>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", lineHeight: "1.7", margin: 0, maxWidth: "260px" }}>
            Conectando personas y negocios a través de soluciones de envío confiables y eficientes.
          </p>
        </div>

        {/* Servicios */}
        <div>
          <h4 style={{ fontSize: "13px", fontWeight: "700", color: "#ffffff", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "16px", marginTop: 0 }}>Servicios</h4>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
            {["Envío Nacional", "Envío Internacional", "Envío Express", "Carga Pesada"].map((item) => (
              <li key={item}><Link to="/servicios" style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>{item}</Link></li>
            ))}
          </ul>
        </div>

        {/* Empresa */}
        <div>
          <h4 style={{ fontSize: "13px", fontWeight: "700", color: "#ffffff", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "16px", marginTop: 0 }}>Empresa</h4>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
            <li><Link to="/nosotros" style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>Nosotros</Link></li>
            <li><Link to="/como-funciona" style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>Cómo Funciona</Link></li>
            <li><Link to="/cobertura" style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>Cobertura</Link></li>
            <li><Link to="/contacto" style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>Contacto</Link></li>
          </ul>
        </div>

        {/* Soporte */}
        <div>
          <h4 style={{ fontSize: "13px", fontWeight: "700", color: "#ffffff", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "16px", marginTop: 0 }}>Soporte</h4>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
            <li><Link to="/faq" style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>Preguntas Frecuentes</Link></li>
            <li><Link to="/contacto" style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>Centro de Ayuda</Link></li>
            <li><Link to="/" style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>Términos y Condiciones</Link></li>
            <li><Link to="/" style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>Política de Privacidad</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          padding: isMobile ? "16px 20px" : "20px 24px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", margin: 0, textAlign: isMobile ? "center" : "left" }}>
            © 2026 AeroPaq. Todos los derechos reservados.
          </p>
          <div style={{ display: "flex", gap: "8px" }}>
            {[
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>,
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>,
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
            ].map((icon, i) => (
              <a key={i} href="#" style={{
                width: "34px", height: "34px", backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.7)", textDecoration: "none",
              }}>
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
