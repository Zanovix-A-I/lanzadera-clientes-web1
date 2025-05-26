"use client";
import { useRef, useEffect } from "react";
import AnimatedParticlesBackground from "./AnimatedParticlesBackground";
import Cal, { getCalApi } from "@calcom/embed-react";

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Cal.com API init
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
      {/* Fondo animado de partículas y haz de luz */}
      <AnimatedParticlesBackground />
      {/* Sección 1: Hero */}
      <section className="flex flex-col items-center justify-center min-h-screen text-center px-4 animate-fade-in">
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-2 animate-slide-down">Lanzadera de clientes</h1>
        <h2 className="text-lg sm:text-2xl text-gray-300 mb-6 animate-slide-up">Por Patricio Wamba</h2>
        <p className="text-base sm:text-lg text-gray-200 max-w-xl mb-8 animate-fade-in-delay">
          Estas a un paso de poder llegar a mi facturación mensual con tu agencia desde ahora a las próximas semanas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={scrollToAbout}
            className="creative-btn bg-white text-black font-semibold px-8 py-3 rounded-full shadow-lg transition-all animate-pop-in"
          >
            Saber más
          </button>
          <button
            onClick={scrollToContact}
            className="creative-btn bg-white text-black font-semibold px-8 py-3 rounded-full shadow-lg transition-all animate-pop-in"
          >
            Contactar
          </button>
        </div>
      </section>
      {/* Sección 2: Sobre mí */}
      <section ref={aboutRef} className="flex flex-col items-center justify-center min-h-[60vh] py-24 px-4 animate-fade-in-delay-2">
        <div className="backdrop-blur-md bg-black/60 border border-white/10 rounded-2xl shadow-2xl p-8 sm:p-12 max-w-2xl w-full flex flex-col items-center floating-card">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 animate-slide-down">Sobre mí</h3>
          <p className="text-base sm:text-lg text-gray-200 animate-fade-in text-center">
            Patricio Wamba es el fundador de una innovadora agencia de Inteligencia Artificial que está revolucionando el mercado.<br /><br />
            Con su visión y liderazgo, la agencia ha alcanzado una facturación mensual superior a los 10.000€, demostrando el poder y la rentabilidad de las soluciones de IA bien implementadas para escalar negocios.
          </p>
        </div>
      </section>
      {/* Sección 3: Contacto */}
      <section ref={contactRef} className="flex flex-col items-center justify-center min-h-[60vh] py-24 px-4 animate-fade-in-delay-2 gap-8" id="contacto">
        <div className="backdrop-blur-md bg-black/60 border border-white/10 rounded-2xl shadow-2xl p-8 sm:p-12 max-w-2xl w-full flex flex-col items-center floating-card">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 animate-slide-down">Contacto</h3>
          <p className="text-base sm:text-lg text-gray-200 animate-fade-in text-center mb-6">
            Reserva una llamada directamente en mi calendario o escríbeme a <a href="mailto:patricio@lanzaderaclientes.es" className="underline text-blue-300 hover:text-blue-100 transition">patricio@lanzaderaclientes.es</a>
          </p>
          <div className="w-full h-[600px] max-w-2xl rounded-xl overflow-hidden border border-white/10 bg-black/70">
            <Cal
              namespace="30min"
              calLink="patriciowamba/30min"
              style={{ width: "100%", height: "100%", overflow: "scroll" }}
              config={{ layout: "month_view" }}
            />
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="w-full text-center py-6 text-gray-400 text-sm animate-fade-in-delay-3">
        Powered by <a href="https://zanovix.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition">Zanovix</a>
      </footer>
    </div>
  );
}
