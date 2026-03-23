/**
 * AeroPaqLogo — componente reutilizable
 * Props:
 *   variant: "light" (texto blanco, para fondos oscuros) | "dark" (texto azul, por defecto)
 *   size:    "sm" (navbar) | "md" (footer/contacto) | "lg" (hero/portada)
 */
export default function AeroPaqLogo({ variant = "dark", size = "sm" }) {
  const sizes = {
    sm: { icon: 36, fontSize: "20px" },
    md: { icon: 42, fontSize: "22px" },
    lg: { icon: 56, fontSize: "28px" },
  };

  const { icon, fontSize } = sizes[size];
  const textColor = variant === "light" ? "#ffffff" : "#1A3C6E";
  const paqColor = "#2ECC71";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <polygon points="32,3 57,17.5 57,46.5 32,61 7,46.5 7,17.5" fill="#1A3C6E" />
        <rect x="13" y="28" width="30" height="8" rx="4" fill="#2ECC71" />
        <polygon points="43,28 55,32 43,36" fill="#2ECC71" />
        <polygon points="13,28 6,20 15,28" fill="#2ECC71" />
        <polygon points="13,36 6,44 15,36" fill="#2ECC71" />
        <polygon points="26,28 17,15 35,28" fill="#ffffff" opacity="0.9" />
        <polygon points="26,36 17,49 35,36" fill="#ffffff" opacity="0.7" />
      </svg>
      <span style={{ fontSize, fontWeight: "800", letterSpacing: "-0.5px", fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif", lineHeight: 1 }}>
        <span style={{ color: textColor }}>Aero</span>
        <span style={{ color: paqColor }}>Paq</span>
      </span>
    </div>
  );
}
