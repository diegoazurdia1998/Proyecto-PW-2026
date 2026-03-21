import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const links = [
    { label: "Inicio", to: "/" },
    { label: "Servicios", to: "/servicios" },
    { label: "Cobertura", to: "/cobertura" },
    { label: "Cómo Funciona", to: "/como-funciona" },
    { label: "Nosotros", to: "/nosotros" },
    { label: "FAQ", to: "/faq" },
    { label: "Contacto", to: "/contacto" },
  ];

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          <div style={styles.logoIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>
          <span style={styles.logoText}>AeroPaq</span>
        </Link>

        {!isMobile && (
          <ul style={styles.navLinks}>
            {links.map((link) => (
              <li key={link.to}>
                <Link to={link.to} style={{ ...styles.navLink, ...(location.pathname === link.to ? styles.navLinkActive : {}) }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {!isMobile && (
          <Link to="/cotizador" style={styles.ctaButton}>Cotizar Envío</Link>
        )}

        {isMobile && (
          <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A3C6E" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A3C6E" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        )}
      </div>

      {isMobile && menuOpen && (
        <div style={styles.mobileMenu}>
          {links.map((link) => (
            <Link key={link.to} to={link.to}
              style={{ ...styles.mobileLink, ...(location.pathname === link.to ? styles.mobileLinkActive : {}) }}
              onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link to="/cotizador" style={styles.mobileCta} onClick={() => setMenuOpen(false)}>
            Cotizar Envío
          </Link>
        </div>
      )}
    </nav>
  );
}

const styles = {
  navbar: { position: "sticky", top: 0, zIndex: 1000, backgroundColor: "#ffffff", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif" },
  container: { maxWidth: "1200px", margin: "0 auto", padding: "0 24px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" },
  logo: { display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 },
  logoIcon: { width: "38px", height: "38px", backgroundColor: "#1A3C6E", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" },
  logoText: { fontSize: "20px", fontWeight: "700", color: "#1A3C6E", letterSpacing: "-0.3px" },
  navLinks: { display: "flex", alignItems: "center", gap: "2px", listStyle: "none", margin: 0, padding: 0, flex: 1, justifyContent: "center" },
  navLink: { fontSize: "14px", fontWeight: "500", color: "#4A5568", textDecoration: "none", padding: "6px 10px", borderRadius: "6px", whiteSpace: "nowrap" },
  navLinkActive: { color: "#1A3C6E", fontWeight: "600", backgroundColor: "#EEF2F8" },
  ctaButton: { backgroundColor: "#2ECC71", color: "#ffffff", fontWeight: "600", fontSize: "14px", padding: "10px 20px", borderRadius: "50px", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 },
  hamburger: { background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", alignItems: "center" },
  mobileMenu: { display: "flex", flexDirection: "column", padding: "8px 16px 20px", borderTop: "1px solid #EEF2F8", gap: "2px", backgroundColor: "#ffffff" },
  mobileLink: { fontSize: "15px", fontWeight: "500", color: "#4A5568", textDecoration: "none", padding: "12px 14px", borderRadius: "8px" },
  mobileLinkActive: { color: "#1A3C6E", fontWeight: "600", backgroundColor: "#EEF2F8" },
  mobileCta: { marginTop: "8px", backgroundColor: "#2ECC71", color: "#ffffff", fontWeight: "600", fontSize: "15px", padding: "13px 22px", borderRadius: "50px", textDecoration: "none", textAlign: "center" },
};
