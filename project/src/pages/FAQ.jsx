import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const categories = [
  { id: "todos", label: "Todos" },
  { id: "envios", label: "Envíos" },
  { id: "pagos", label: "Pagos" },
  { id: "seguimiento", label: "Seguimiento" },
  { id: "cuentas", label: "Cuentas" },
  { id: "internacional", label: "Internacional" },
];

const faqs = [
  {
    category: "envios",
    question: "¿Cuáles son los tiempos de entrega?",
    answer: "Los tiempos de entrega varían según el tipo de servicio: Envío Express (24-48 horas), Envío Nacional Estándar (2-5 días hábiles), y Envío Internacional (5-15 días hábiles dependiendo del destino). Estos tiempos son estimados y pueden variar según la ubicación exacta y condiciones especiales.",
  },
  {
    category: "envios",
    question: "¿Cuál es el peso máximo que puedo enviar?",
    answer: "Para envíos estándar, el peso máximo es de 30 kg. Sin embargo, ofrecemos servicios especializados de carga pesada que pueden manejar envíos de cualquier peso. Para paquetes superiores a 30 kg, contacta a nuestro equipo de carga pesada para obtener una cotización personalizada.",
  },
  {
    category: "pagos",
    question: "¿Qué métodos de pago aceptan?",
    answer: "Aceptamos diversos métodos de pago incluyendo: tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencias bancarias, PayPal, y pago contra entrega (disponible solo en ciertas zonas). Para empresas, también ofrecemos cuentas corporativas con facturación mensual.",
  },
  {
    category: "seguimiento",
    question: "¿Cómo puedo rastrear mi paquete?",
    answer: "Puedes rastrear tu paquete ingresando el número de guía en nuestra página de inicio o en la sección de seguimiento. Recibirás actualizaciones automáticas por email y SMS en cada punto de control. También puedes descargar nuestra app móvil para recibir notificaciones en tiempo real.",
  },
  {
    category: "internacional",
    question: "¿Necesito documentación especial para envíos internacionales?",
    answer: "Sí, para envíos internacionales necesitas proporcionar una factura comercial y declaración de contenido. Dependiendo del país de destino y el tipo de mercancía, pueden requerirse documentos adicionales. Nuestro equipo de envíos internacionales te asesorará sobre la documentación específica que necesitas.",
  },
  {
    category: "cuentas",
    question: "¿Cómo creo una cuenta empresarial?",
    answer: "Para crear una cuenta empresarial, contáctanos a través del formulario de contacto o llámanos directamente. Nuestro equipo comercial te ayudará a configurar una cuenta con beneficios especiales: tarifas preferenciales, facturación mensual, reportes detallados y un ejecutivo de cuenta dedicado.",
  },
  {
    category: "envios",
    question: "¿Puedo cambiar la dirección de entrega después de enviar el paquete?",
    answer: "Sí, es posible cambiar la dirección de entrega siempre y cuando el paquete no haya salido de nuestro centro de distribución. Contáctanos lo antes posible con tu número de guía y la nueva dirección. Ten en cuenta que puede aplicar un cargo adicional por el cambio de ruta.",
  },
  {
    category: "pagos",
    question: "¿Emiten facturas fiscales?",
    answer: "Sí, emitimos facturas fiscales por todos nuestros servicios. Puedes solicitarla al momento de contratar el servicio o dentro de los 3 días hábiles posteriores al envío. Para cuentas empresariales, la facturación se realiza de forma mensual con el detalle de todos los envíos del período.",
  },
];

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [openItem, setOpenItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === "todos" || faq.category === selectedCategory;
    const matchesSearch = searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: "#ffffff", fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif" }}>

      {/* HEADER */}
      <section style={{ backgroundColor: "#1A3C6E", color: "#ffffff", padding: isMobile ? "56px 20px 80px" : "80px 24px 100px", textAlign: "center" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <span style={{ fontSize: "13px", fontWeight: "700", color: "#2ECC71", textTransform: "uppercase", letterSpacing: "1px" }}>
            Centro de ayuda
          </span>
          <h1 style={{ fontSize: isMobile ? "30px" : "44px", fontWeight: "800", margin: "12px 0 16px", letterSpacing: "-1px" }}>
            Preguntas Frecuentes
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.8)", maxWidth: "540px", lineHeight: "1.7", margin: "0 auto" }}>
            Encuentra respuestas rápidas a las preguntas más comunes sobre nuestros servicios.
          </p>
        </div>
      </section>

      {/* SEARCH BAR — overlapping header */}
      <section style={{ maxWidth: "800px", margin: isMobile ? "-28px auto 0" : "-36px auto 0", padding: "0 20px" }}>
        <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", padding: "8px 8px 8px 16px", display: "flex", alignItems: "center", gap: "10px" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Buscar en preguntas frecuentes..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setOpenItem(null); }}
            style={{
              flex: 1, border: "none", outline: "none", fontSize: "15px",
              color: "#2D2D2D", fontFamily: "inherit", padding: "10px 0",
              backgroundColor: "transparent",
            }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", color: "#9CA3AF" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          )}
        </div>
      </section>

      {/* CATEGORY FILTERS */}
      <section style={{ padding: "36px 20px 8px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => { setSelectedCategory(cat.id); setOpenItem(null); }} style={{
              padding: "8px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: "600",
              border: "none", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
              backgroundColor: selectedCategory === cat.id ? "#2ECC71" : "#F7F8FA",
              color: selectedCategory === cat.id ? "#ffffff" : "#4A5568",
              boxShadow: selectedCategory === cat.id ? "0 4px 12px rgba(46,204,113,0.3)" : "none",
            }}>
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section style={{ padding: isMobile ? "24px 20px 56px" : "32px 24px 72px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "12px" }}>

          {filteredFaqs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 20px", color: "#718096" }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#CBD5E0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 16px", display: "block" }}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <p style={{ fontSize: "16px", fontWeight: "600", color: "#4A5568", margin: "0 0 8px" }}>No se encontraron resultados</p>
              <p style={{ fontSize: "14px", margin: 0 }}>Intenta con otras palabras o selecciona otra categoría.</p>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => (
              <div key={index} style={{
                backgroundColor: "#ffffff", borderRadius: "12px",
                border: `1.5px solid ${openItem === index ? "#2ECC71" : "#E2E8F0"}`,
                overflow: "hidden", transition: "border-color 0.2s",
                boxShadow: openItem === index ? "0 4px 16px rgba(46,204,113,0.1)" : "none",
              }}>
                <button
                  onClick={() => setOpenItem(openItem === index ? null : index)}
                  style={{
                    width: "100%", padding: "20px 24px", display: "flex", alignItems: "center",
                    justifyContent: "space-between", textAlign: "left", background: "none",
                    border: "none", cursor: "pointer", fontFamily: "inherit",
                    backgroundColor: openItem === index ? "#F0FFF7" : "transparent",
                    transition: "background 0.2s",
                  }}
                >
                  <span style={{ fontSize: "15px", fontWeight: "600", color: "#1A3C6E", paddingRight: "16px", lineHeight: "1.5" }}>
                    {faq.question}
                  </span>
                  <svg
                    width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="#2ECC71" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ flexShrink: 0, transform: openItem === index ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s" }}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {openItem === index && (
                  <div style={{ padding: "0 24px 20px", fontSize: "14.5px", color: "#718096", lineHeight: "1.75", borderTop: "1px solid #EEF2F8" }}>
                    <div style={{ paddingTop: "16px" }}>{faq.answer}</div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* SUPPORT CTA */}
      <section style={{ backgroundColor: "#F7F8FA", padding: isMobile ? "40px 20px" : "56px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            backgroundColor: "#ffffff", borderRadius: "16px", padding: isMobile ? "32px 24px" : "48px",
            textAlign: "center", border: "1px solid #E2E8F0",
            boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
          }}>
            <div style={{ width: "64px", height: "64px", backgroundColor: "#F0FFF7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <h2 style={{ fontSize: isMobile ? "22px" : "28px", fontWeight: "800", color: "#1A3C6E", margin: "0 0 10px", letterSpacing: "-0.5px" }}>
              ¿No encontraste lo que buscabas?
            </h2>
            <p style={{ fontSize: "15px", color: "#718096", margin: "0 0 28px", lineHeight: "1.6" }}>
              Nuestro equipo de soporte está disponible 24/7 para ayudarte.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <button style={{
                backgroundColor: "#2ECC71", color: "#ffffff", border: "none",
                padding: "13px 28px", borderRadius: "50px", fontSize: "14px",
                fontWeight: "700", cursor: "pointer", fontFamily: "inherit",
              }}>
                Chat en Vivo
              </button>
              <Link to="/contacto" style={{
                border: "2px solid #2ECC71", color: "#2ECC71", backgroundColor: "transparent",
                padding: "11px 28px", borderRadius: "50px", fontSize: "14px",
                fontWeight: "700", textDecoration: "none", display: "inline-block",
              }}>
                Contactar Soporte
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
