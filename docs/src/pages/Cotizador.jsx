import { useState, useEffect } from "react";
import { calcularCotizacion } from "../utils/shippingMath";

const packageTypes = [
  { id: "sobre",        label: "Sobre",        maxVol: 500   },
  { id: "caja-pequena", label: "Caja Pequeña", maxVol: 5000  },
  { id: "caja-mediana", label: "Caja Mediana", maxVol: 20000 },
  { id: "caja-grande",  label: "Caja Grande",  maxVol: Infinity },
];

export default function Cotizador() {
  const [isMobile, setIsMobile]           = useState(window.innerWidth < 768);
  const [selectedPackage, setSelectedPackage] = useState("caja-pequena"); // default
  const [resultado, setResultado]         = useState(null);
  const [pesoError, setPesoError]         = useState(false); // solo marca rojo al intentar cotizar
  const [formData, setFormData]           = useState({
    origenDestino: "local",
    peso: "",
    largo: "", ancho: "", alto: "",
    nivelServicio: "estandar",
    recoleccion: false,
    seguro: false,
    entregaUrgente: false,
    nombre: "", email: "", telefono: "",
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-seleccionar tipo de paquete según volumen de dimensiones
  useEffect(() => {
    const { largo, ancho, alto } = formData;
    if (largo && ancho && alto) {
      const vol = Number(largo) * Number(ancho) * Number(alto);
      const match = packageTypes.find((t) => vol <= t.maxVol);
      if (match) setSelectedPackage(match.id);
    }
  }, [formData.largo, formData.ancho, formData.alto]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newVal = type === "checkbox" ? checked : value;
    if (name === "peso" && pesoError && value) setPesoError(false);
    setFormData({ ...formData, [name]: newVal });
  };

  const handleCalcular = () => {
    if (!formData.peso) {
      setPesoError(true);
      return;
    }
    const datos = {
      origenDestino: formData.origenDestino,
      peso: Number(formData.peso),
      nivelServicio: "estandar", // base siempre estándar; las tarjetas muestran los 3 niveles
      recoleccion: formData.recoleccion,
      seguro: formData.seguro,
      dimensiones: (formData.largo && formData.ancho && formData.alto)
        ? [Number(formData.largo), Number(formData.ancho), Number(formData.alto)]
        : undefined,
    };
    const cotizacion = calcularCotizacion(datos);
    setResultado(cotizacion);
    setTimeout(() => document.getElementById("resultados")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const inputStyle = {
    width: "100%", padding: "11px 14px", borderRadius: "8px",
    border: "1.5px solid #E2E8F0", fontSize: "14px", outline: "none",
    fontFamily: "inherit", boxSizing: "border-box", color: "#2D2D2D",
    backgroundColor: "#ffffff",
  };
  const labelStyle    = { fontSize: "13px", fontWeight: "600", color: "#4A5568", marginBottom: "6px", display: "block" };
  const sectionTitle  = { fontSize: "17px", fontWeight: "700", color: "#1A3C6E", margin: "0 0 20px" };

  return (
    <div style={{ backgroundColor: "#F7F8FA", fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif" }}>

      {/* Placeholders grises — no se puede hacer con inline styles */}
      <style>{`
        .aero-input::placeholder { color: #B0BAC9; font-style: italic; }
        .aero-input:focus { border-color: #1A3C6E !important; box-shadow: 0 0 0 3px rgba(26,60,110,0.08) !important; }
      `}</style>

      {/* HEADER */}
      <section style={{ background: "linear-gradient(135deg, #1A3C6E 0%, #1e4d8c 60%, #1a5c6e 100%)", padding: isMobile ? "48px 20px" : "72px 24px", color: "#ffffff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <span style={{ fontSize: "13px", fontWeight: "700", color: "#2ECC71", textTransform: "uppercase", letterSpacing: "1px" }}>Herramienta de cotización</span>
          <h1 style={{ fontSize: isMobile ? "32px" : "44px", fontWeight: "800", margin: "12px 0 16px", letterSpacing: "-1px" }}>Cotizador de Envíos</h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.8)", maxWidth: "560px", lineHeight: "1.7", margin: 0 }}>
            Calcula el costo de tu envío en segundos. Obtén una cotización personalizada y elige el servicio que mejor se adapte a tus necesidades.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "32px 20px" : "56px 24px" }}>
        <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #E2E8F0", padding: isMobile ? "24px" : "40px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "32px" : "48px", marginBottom: "32px" }}>

            {/* LEFT — Origen y Destino */}
            <div>
              <h3 style={sectionTitle}>Origen y Destino</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Tipo de Envío</label>
                  <select name="origenDestino" value={formData.origenDestino} onChange={handleChange} style={inputStyle}>
                    <option value="local">Misma Ciudad</option>
                    <option value="nacional">Otro Departamento</option>
                    <option value="internacional">Internacional</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Ciudad de Origen</label>
                  <input className="aero-input" type="text" placeholder="Ej. Guatemala" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Código Postal de Origen</label>
                  <input className="aero-input" type="text" placeholder="Ej. 01001" style={inputStyle} />
                </div>

                <div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}>
                  <div style={{ width: "44px", height: "44px", backgroundColor: "#F0FFF7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
                    </svg>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Ciudad de Destino</label>
                  <input className="aero-input" type="text" placeholder="Ej. Quetzaltenango" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Código Postal de Destino</label>
                  <input className="aero-input" type="text" placeholder="Ej. 09001" style={inputStyle} />
                </div>
              </div>
            </div>

            {/* RIGHT — Detalles del Paquete */}
            <div>
              <h3 style={sectionTitle}>Detalles del Paquete</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

                {/* Dimensiones */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {[["largo", "Largo (cm)", "Ej. 30"], ["ancho", "Ancho (cm)", "Ej. 20"], ["alto", "Alto (cm)", "Ej. 10"]].map(([name, label, ph]) => (
                    <div key={name}>
                      <label style={labelStyle}>{label}</label>
                      <input
                        className="aero-input"
                        type="number"
                        onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                        name={name} value={formData[name]} onChange={handleChange}
                        placeholder={ph} min="0" step="0.1"
                        style={inputStyle}
                      />
                    </div>
                  ))}
                </div>

                {/* Peso — fila separada, rojo solo si intentó cotizar sin llenarlo */}
                <div style={{ borderTop: "1px solid #EEF2F8", paddingTop: "14px" }}>
                  <p style={{ fontSize: "12px", color: "#718096", margin: "0 0 10px" }}>
                    <span style={{ color: "#e53e3e", fontWeight: "700" }}>*</span> Campo obligatorio
                  </p>
                  <div style={{ maxWidth: "50%" }}>
                    <label style={labelStyle}>
                      Peso (lb) <span style={{ color: "#e53e3e" }}>*</span>
                    </label>
                    <input
                      className="aero-input"
                      type="number"
                      onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                      name="peso" value={formData.peso} onChange={handleChange}
                      placeholder="Ej. 5" min="0" step="0.1"
                      style={{
                        ...inputStyle,
                        borderColor: pesoError ? "#e53e3e" : "#E2E8F0",
                        boxShadow: pesoError ? "0 0 0 3px rgba(229,62,62,0.1)" : "none",
                      }}
                    />
                    {pesoError && (
                      <p style={{ fontSize: "12px", color: "#e53e3e", margin: "6px 0 0", fontWeight: "500" }}>
                        Ingresa el peso para cotizar
                      </p>
                    )}
                  </div>
                </div>

                {/* Tipo de paquete — auto-seleccionado según dimensiones */}
                <div>
                  <label style={labelStyle}>
                    Tipo de Paquete
                    <span style={{ fontSize: "11px", fontWeight: "400", color: "#A0AEC0", marginLeft: "8px" }}>
                      (se sugiere según dimensiones)
                    </span>
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    {packageTypes.map((t, index) => {
                      const vol = (formData.largo && formData.ancho && formData.alto)
                        ? Number(formData.largo) * Number(formData.ancho) * Number(formData.alto)
                        : null;
                      const minVol = index > 0 ? packageTypes[index - 1].maxVol : 0;
                      // Deshabilitar si el volumen no cae en el rango de este tipo
                      const disabled = vol !== null && (vol > t.maxVol || vol <= minVol);
                      return (
                        <button key={t.id} onClick={() => !disabled && setSelectedPackage(t.id)} style={{
                          padding: "10px 14px", borderRadius: "8px", fontSize: "13.5px", fontWeight: "500",
                          border: `1.5px solid ${selectedPackage === t.id ? "#2ECC71" : "#E2E8F0"}`,
                          backgroundColor: disabled ? "#F7F8FA" : selectedPackage === t.id ? "#F0FFF7" : "#ffffff",
                          color: disabled ? "#C0C9D4" : selectedPackage === t.id ? "#1A3C6E" : "#4A5568",
                          cursor: disabled ? "not-allowed" : "pointer",
                          fontFamily: "inherit", transition: "all 0.15s",
                          textDecoration: disabled ? "line-through" : "none",
                        }}>{t.label}</button>
                      );
                    })}
                  </div>
                  <p style={{ fontSize: "11px", color: "#A0AEC0", margin: "8px 0 0" }}>
                    Sobre &lt; 500 cm³ · Caja Pequeña &lt; 5,000 · Caja Mediana &lt; 20,000 · Caja Grande en adelante
                  </p>
                </div>

                {/* Nivel de servicio */}
                <div>
                  <label style={labelStyle}>Nivel de Servicio</label>
                  <select name="nivelServicio" value={formData.nivelServicio} onChange={handleChange} style={inputStyle}>
                    <option value="estandar">Estándar</option>
                    <option value="expres">Exprés</option>
                  </select>
                </div>

                {/* Servicios adicionales */}
                <div>
                  <label style={labelStyle}>Servicios Adicionales</label>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {[
                      { name: "seguro",         label: "Seguro contra pérdida y accidentes" },
                      { name: "recoleccion",    label: "Recolección a domicilio" },
                      { name: "entregaUrgente", label: "Entrega urgente" },
                    ].map((extra) => (
                      <label key={extra.name} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                        <input type="checkbox" name={extra.name} checked={formData[extra.name]} onChange={handleChange}
                          style={{ width: "17px", height: "17px", accentColor: "#2ECC71" }} />
                        <span style={{ fontSize: "14px", color: "#4A5568" }}>{extra.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CALCULATE BUTTON */}
          <button onClick={handleCalcular} style={{
            width: "100%", backgroundColor: "#2ECC71", color: "#ffffff",
            border: "none", borderRadius: "10px", padding: "16px",
            fontSize: "16px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit",
            transition: "background 0.2s",
          }}>
            Calcular Costo
          </button>
        </div>

        {/* RESULTS */}
        {resultado && (
          <div id="resultados" style={{ marginTop: "32px" }}>
            <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#1A3C6E", margin: "0 0 24px", letterSpacing: "-0.5px" }}>
              Resultado de Cotización
            </h3>

            {/* Option cards */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
              {[
                { label: "Envío Estándar", multiplier: 1,   days: "3-5 días hábiles",  features: ["Seguimiento incluido", "Seguro básico"], recommended: false },
                { label: "Envío Exprés",   multiplier: 1.5, days: "24-48 horas",        features: ["Seguimiento en tiempo real", "Seguro completo", "Notificaciones SMS"], recommended: true },
                { label: "Envío Premium",  multiplier: 2.5, days: "Garantizado 24h",    features: ["Prioridad máxima", "Seguro premium", "Soporte dedicado", "Embalaje especial"], recommended: false },
              ].map((opt) => (
                <div key={opt.label} style={{
                  backgroundColor: "#ffffff", borderRadius: "14px", padding: "24px",
                  border: opt.recommended ? "2px solid #2ECC71" : "1px solid #E2E8F0",
                  position: "relative", boxShadow: opt.recommended ? "0 4px 20px rgba(46,204,113,0.15)" : "none",
                }}>
                  {opt.recommended && (
                    <div style={{
                      position: "absolute", top: "-12px", right: "16px",
                      backgroundColor: "#2ECC71", color: "#ffffff",
                      fontSize: "11px", fontWeight: "700", padding: "4px 12px", borderRadius: "50px",
                    }}>Recomendado</div>
                  )}
                  <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#1A3C6E", margin: "0 0 12px" }}>{opt.label}</h4>
                  <div style={{ marginBottom: "16px" }}>
                    <span style={{ fontSize: "32px", fontWeight: "800", color: "#2D2D2D" }}>
                      Q{(resultado.total * opt.multiplier).toFixed(2)}
                    </span>
                  </div>
                  <div style={{ fontSize: "13px", color: "#718096", marginBottom: "14px" }}>⏱ {opt.days}</div>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {opt.features.map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#4A5568" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button style={{
                    width: "100%", padding: "10px", borderRadius: "8px", fontSize: "14px", fontWeight: "600",
                    cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
                    backgroundColor: opt.recommended ? "#2ECC71" : "transparent",
                    color: opt.recommended ? "#ffffff" : "#2ECC71",
                    border: "2px solid #2ECC71",
                  }}>Seleccionar</button>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "28px", border: "1px solid #E2E8F0" }}>
              <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#1A3C6E", margin: "0 0 20px" }}>Desglose de Costos (base Estándar)</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  ["Costo base",              resultado.desglose.base],
                  ["Costo por distancia",     resultado.desglose.distancia],
                  ["Costo por peso / volumen",resultado.desglose.peso],
                  ...(resultado.desglose.recargoServicio > 0 ? [["Recargo Exprés", resultado.desglose.recargoServicio]] : []),
                  ...(resultado.desglose.extras > 0          ? [["Servicios extra", resultado.desglose.extras]]        : []),
                ].map(([label, val]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span style={{ color: "#718096" }}>{label}</span>
                    <span style={{ color: "#2D2D2D", fontWeight: "500" }}>Q{Number(val).toFixed(2)}</span>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid #EEF2F8", paddingTop: "12px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "16px", fontWeight: "700", color: "#1A3C6E" }}>Total Estándar</span>
                  <span style={{ fontSize: "22px", fontWeight: "800", color: "#2ECC71" }}>Q{resultado.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
