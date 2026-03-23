//import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HashRouter, Routes, Route } from "react-router-dom"; // Cambia BrowserRouter por HashRouter
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import Cobertura from "./pages/Cobertura";
import ComoFunciona from "./pages/ComoFunciona";
import SobreNosotros from "./pages/SobreNosotros";
import FAQ from "./pages/FAQ";
import Contacto from "./pages/Contacto";
import Cotizador from "./pages/Cotizador";
import Terminos   from "./pages/Terminos";
import Privacidad from "./pages/Privacidad";


export default function App() {
  return (
    <HashRouter>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/cobertura" element={<Cobertura />} />
            <Route path="/como-funciona" element={<ComoFunciona />} />
            <Route path="/nosotros" element={<SobreNosotros />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/cotizador" element={<Cotizador />} />
            <Route path="/terminos"   element={<Terminos />} />
            <Route path="/privacidad" element={<Privacidad />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
