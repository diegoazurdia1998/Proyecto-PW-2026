import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const coverageTypes = [
  { id: "nacional", label: "Nacional", desc: "Llegamos a donde tus envíos necesitan ir, con rapidez y seguridad en todo el territorio." },
  { id: "internacional", label: "Internacional", desc: "Servicio disponible en más de 200 países alrededor del mundo." },
  { id: "urbana", label: "Urbana", desc: "Entregas express en principales zonas metropolitanas del país." },
];

// Markers per coverage type
const mapConfig = {
  nacional: {
    center: [15.5, -90.3],
    zoom: 7,
    markers: [
      { lat: 14.6349, lng: -90.5069, label: "Ciudad de Guatemala" },
      { lat: 14.8333, lng: -91.5167, label: "Quetzaltenango" },
      { lat: 15.7167, lng: -90.3833, label: "Cobán" },
      { lat: 14.5436, lng: -90.7478, label: "Escuintla" },
      { lat: 14.7007, lng: -89.7217, label: "Chiquimula" },
      { lat: 15.3000, lng: -91.8000, label: "Huehuetenango" },
    ],
  },
  internacional: {
    center: [15, -85],
    zoom: 4,
    markers: [
      { lat: 14.6349, lng: -90.5069, label: "Guatemala" },
      { lat: 19.4326, lng: -99.1332, label: "México" },
      { lat: 13.6929, lng: -89.2182, label: "El Salvador" },
      { lat: 14.0818, lng: -87.2068, label: "Honduras" },
      { lat: 12.1364, lng: -86.8182, label: "Nicaragua" },
      { lat: 9.9281, lng: -84.0907, label: "Costa Rica" },
    ],
  },
  urbana: {
    center: [14.6349, -90.5069],
    zoom: 11,
    markers: [
      { lat: 14.6349, lng: -90.5069, label: "Centro Guatemala" },
      { lat: 14.6300, lng: -90.5700, label: "Mixco" },
      { lat: 14.5254, lng: -90.5893, label: "Villa Nueva" },
      { lat: 14.6500, lng: -90.4900, label: "Zona 10" },
      { lat: 14.6419, lng: -90.5133, label: "Zona 4" },
    ],
  },
};

const offices = [
  { city: "Ciudad de Guatemala", address: "6a Avenida 0-60, Zona 4, Ciudad de Guatemala 01004", phone: "+502 2234 5678", email: "guatemala@aeropaq.com", hours: "Lun - Vie: 8:00 - 19:00, Sáb: 9:00 - 14:00" },
  { city: "Mixco", address: "Calzada San Juan 21-00, Zona 1, Mixco 01057", phone: "+502 2456 7890", email: "mixco@aeropaq.com", hours: "Lun - Vie: 8:00 - 19:00, Sáb: 9:00 - 14:00" },
  { city: "Villa Nueva", address: "Diagonal 6, 13-42, Zona 4, Villa Nueva 01064", phone: "+502 2678 9012", email: "villanueva@aeropaq.com", hours: "Lun - Vie: 8:00 - 19:00, Sáb: 9:00 - 14:00" },
];

function LeafletMap({ selected }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    // Load Leaflet CSS
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    // Load Leaflet JS
    const initMap = () => {
      if (!window.L || !mapRef.current) return;
      const L = window.L;
      const config = mapConfig[selected];

      if (!mapInstanceRef.current) {
        mapInstanceRef.current = L.map(mapRef.current).setView(config.center, config.zoom);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        }).addTo(mapInstanceRef.current);
      } else {
        mapInstanceRef.current.setView(config.center, config.zoom);
      }

      // Clear old markers
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];

      // Custom green icon
      const greenIcon = L.divIcon({
        className: "",
        html: `<div style="width:14px;height:14px;background:#2ECC71;border:2px solid #ffffff;border-radius:50%;box-shadow:0 2px 6px rgba(46,204,113,0.5)"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      config.markers.forEach(({ lat, lng, label }) => {
        const marker = L.marker([lat, lng], { icon: greenIcon })
          .addTo(mapInstanceRef.current)
          .bindPopup(`<b style="color:#1A3C6E">${label}</b><br><small style="color:#2ECC71">✓ Cobertura AeroPaq</small>`);
        markersRef.current.push(marker);
      });
    };

    if (window.L) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = initMap;
      document.head.appendChild(script);
    }

    return () => {
      markersRef.current.forEach(m => m?.remove());
      markersRef.current = [];
    };
  }, [selected]);

  return (
    <div ref={mapRef} style={{ width: "100%", height: "400px", borderRadius: "14px", zIndex: 1 }} />
  );
}

const IconPin = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const IconPhone = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const IconMail = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const IconClock = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;

export default function Cobertura() {
  const [selected, setSelected] = useState("nacional");
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

  const inputStyle = {
    width: "100%", padding: "11px 14px", borderRadius: "8px",
    border: "1.5px solid #E2E8F0", fontSize: "14px", outline: "none",
    fontFamily: "inherit", color: "#2D2D2D", boxSizing: "border-box",
  };

  return (
    <div style={{ backgroundColor: "#ffffff", fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif" }}>

      {/* HEADER */}
      <section style={{ backgroundColor: "#1A3C6E", color: "#ffffff", padding: isMobile ? "48px 20px" : "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <span style={{ fontSize: "13px", fontWeight: "700", color: "#2ECC71", textTransform: "uppercase", letterSpacing: "1px" }}>Dónde llegamos</span>
          <h1 style={{ fontSize: isMobile ? "32px" : "44px", fontWeight: "800", margin: "12px 0 16px", letterSpacing: "-1px" }}>Nuestra Cobertura Global</h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.8)", maxWidth: "600px", lineHeight: "1.7", margin: 0 }}>
            Presencia en más de 200 países con cobertura completa nacional. Llevamos tus envíos a donde los necesites.
          </p>
        </div>
      </section>

      {/* SELECTOR */}
      <section style={{ padding: "32px 24px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          {coverageTypes.map((type) => (
            <button key={type.id} onClick={() => setSelected(type.id)} style={{
              padding: "10px 28px", borderRadius: "50px", fontSize: "14px", fontWeight: "600",
              border: "none", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
              backgroundColor: selected === type.id ? "#2ECC71" : "#F7F8FA",
              color: selected === type.id ? "#ffffff" : "#4A5568",
              boxShadow: selected === type.id ? "0 4px 12px rgba(46,204,113,0.3)" : "none",
            }}>
              {type.label}
            </button>
          ))}
        </div>
      </section>

      {/* MAP */}
      <section style={{ padding: isMobile ? "24px 20px 40px" : "32px 24px 56px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid #E2E8F0", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <LeafletMap selected={selected} />
          </div>
          {/* Legend */}
          <div style={{ display: "flex", gap: "20px", marginTop: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            {[["#2ECC71", "Cobertura Completa"], ["#F59E0B", "Cobertura Parcial"], ["#CBD5E0", "Próximamente"]].map(([color, label]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#718096" }}>
                <span style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: color, display: "inline-block" }} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINDER */}
      <section style={{ backgroundColor: "#F7F8FA", padding: isMobile ? "40px 20px" : "56px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: isMobile ? "22px" : "28px", fontWeight: "800", color: "#1A3C6E", textAlign: "center", margin: "0 0 32px", letterSpacing: "-0.5px" }}>
            Encuentra un Punto de Servicio
          </h2>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: isMobile ? "20px" : "28px", border: "1px solid #E2E8F0" }}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr auto", gap: "12px" }}>
              <div style={{ position: "relative" }}>
                <input type="text" placeholder="Ciudad o código postal" style={{ ...inputStyle, paddingLeft: "42px" }} />
                <svg style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <select style={inputStyle}>
                <option>Tipo de servicio</option>
                <option>Oficina</option>
                <option>Centro de distribución</option>
                <option>Punto de recolección</option>
              </select>
              <button style={{ backgroundColor: "#2ECC71", color: "#ffffff", border: "none", borderRadius: "8px", padding: "11px 28px", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
                Buscar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* OFFICES */}
      <section style={{ padding: isMobile ? "40px 20px" : "56px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: isMobile ? "22px" : "28px", fontWeight: "800", color: "#1A3C6E", margin: "0 0 32px", letterSpacing: "-0.5px" }}>
            Principales Oficinas
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: "20px" }}>
            {offices.map((office) => (
              <div key={office.city} style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "24px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "14px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1A3C6E", margin: 0 }}>{office.city}</h3>
                {[[<IconPin />, office.address], [<IconPhone />, office.phone], [<IconMail />, office.email], [<IconClock />, office.hours]].map(([icon, text], i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <div style={{ flexShrink: 0, marginTop: "1px" }}>{icon}</div>
                    <span style={{ fontSize: "13.5px", color: "#718096", lineHeight: "1.5" }}>{text}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#2ECC71", padding: isMobile ? "48px 20px" : "64px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: isMobile ? "22px" : "30px", fontWeight: "800", color: "#ffffff", margin: "0 0 12px", letterSpacing: "-0.5px" }}>
            ¿No encuentras cobertura en tu zona?
          </h2>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.9)", margin: "0 0 28px" }}>
            Contáctanos y te ayudaremos a encontrar la mejor solución de envío.
          </p>
          <Link to="/contacto" style={{ backgroundColor: "#ffffff", color: "#2ECC71", fontWeight: "700", fontSize: "15px", padding: "13px 32px", borderRadius: "50px", textDecoration: "none", display: "inline-block" }}>
            Contactar Ahora
          </Link>
        </div>
      </section>

    </div>
  );
}
