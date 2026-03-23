import { useState, useEffect } from "react";
import ContactForm from "../components/ContactForm";
import AeroPaqLogo from "../components/AeroPaqLogo";

const WA_NUMBER    = "50245312858";
const WA_GENERAL   = `https://wa.me/${WA_NUMBER}?text=Hola%2C%20necesito%20informaci%C3%B3n%20sobre%20mis%20env%C3%ADos`;
const WA_EMERGENCY = `https://wa.me/${WA_NUMBER}?text=Hola%2C%20tengo%20una%20emergencia%20con%20mi%20env%C3%ADo`;

const contactInfo = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: "Oficina Principal",
    lines: ["6a Avenida 0-60, Zona 4", "Ciudad de Guatemala 01004"],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    title: "WhatsApp",
    lines: [
      <a
        key="wa"
        href={WA_GENERAL}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#2ECC71", textDecoration: "none", fontWeight: "600" }}
      >
        +502 4531 2858
      </a>,
      "Disponible 24/7 · Respuesta inmediata",
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    title: "Email",
    lines: ["contacto@aeropaq.com", "soporte@aeropaq.com"],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "Horario de Atención",
    lines: ["Lunes - Viernes: 8:00 - 20:00", "Sábado: 9:00 - 14:00", "Domingo: Cerrado"],
  },
];

const socialIcons = [
  {
    label: "Facebook",
    href: "https://www.facebook.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://www.x.com",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
];

export default function Contacto() {
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
          <div style={{ marginBottom: "28px" }}>
            <AeroPaqLogo variant="light" size="md" />
          </div>
          <span style={{ fontSize: "13px", fontWeight: "700", color: "#2ECC71", textTransform: "uppercase", letterSpacing: "1px" }}>
            Estamos para ayudarte
          </span>
          <h1 style={{ fontSize: isMobile ? "32px" : "44px", fontWeight: "800", margin: "12px 0 16px", letterSpacing: "-1px" }}>
            Contáctanos
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.8)", maxWidth: "560px", lineHeight: "1.7", margin: 0 }}>
            Estamos aquí para ayudarte. Completa el formulario o usa cualquiera de nuestros canales de contacto.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ padding: isMobile ? "40px 20px 60px" : "64px 24px 80px" }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 420px",
          gap: isMobile ? "32px" : "40px",
          alignItems: "start",
        }}>

          {/* LEFT — ContactForm */}
          <div style={{
            backgroundColor: "#ffffff", borderRadius: "16px",
            border: "1px solid #E2E8F0", overflow: "hidden",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}>
            <div style={{
              padding: "20px 28px", borderBottom: "1px solid #EEF2F8",
              display: "flex", alignItems: "center", gap: "12px",
              backgroundColor: "#FAFBFC",
            }}>
              <div style={{ width: "40px", height: "40px", backgroundColor: "#F0FFF7", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div>
                <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#1A3C6E", margin: 0 }}>Envíanos un Mensaje</h2>
                <p style={{ fontSize: "13px", color: "#718096", margin: 0 }}>Te responderemos en menos de 24 horas</p>
              </div>
            </div>
            <div style={{ padding: isMobile ? "20px" : "28px" }}>
              <ContactForm />
            </div>
          </div>

          {/* RIGHT — Info + Social + Emergency */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Contact Info */}
            <div style={{ backgroundColor: "#F7F8FA", borderRadius: "16px", padding: isMobile ? "24px" : "28px", border: "1px solid #EEF2F8" }}>
              <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#1A3C6E", margin: "0 0 24px" }}>
                Información de Contacto
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {contactInfo.map((item) => (
                  <div key={item.title} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <div style={{ width: "44px", height: "44px", backgroundColor: "#F0FFF7", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 style={{ fontSize: "14px", fontWeight: "700", color: "#1A3C6E", margin: "0 0 4px" }}>{item.title}</h4>
                      {item.lines.map((line, i) => (
                        <p key={i} style={{ fontSize: "13.5px", color: "#718096", margin: "2px 0" }}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div style={{ backgroundColor: "#F7F8FA", borderRadius: "16px", padding: "24px 28px", border: "1px solid #EEF2F8" }}>
              <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#1A3C6E", margin: "0 0 8px" }}>Síguenos</h3>
              <p style={{ fontSize: "13.5px", color: "#718096", margin: "0 0 16px" }}>
                Mantente al día con nuestras novedades y promociones.
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                {socialIcons.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    style={{
                      width: "42px", height: "42px", backgroundColor: "#ffffff",
                      borderRadius: "10px", border: "1px solid #E2E8F0",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#4A5568", textDecoration: "none",
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Emergency */}
            <div style={{
              background: "linear-gradient(135deg, #2ECC71, #27AE60)",
              borderRadius: "16px", padding: "24px 28px", color: "#ffffff",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <h3 style={{ fontSize: "17px", fontWeight: "700", margin: 0 }}>Atención de Emergencias</h3>
              </div>
              <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.85)", margin: "0 0 12px" }}>
                Para asuntos urgentes relacionados con tu envío.
              </p>
              <a
                href={WA_EMERGENCY}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "26px", fontWeight: "800", margin: "0 0 4px", letterSpacing: "-0.5px", color: "#ffffff", textDecoration: "none", display: "block" }}
              >
                +502 4531 2858
              </a>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", margin: 0 }}>Disponible 24/7 · Abre WhatsApp</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
