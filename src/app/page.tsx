"use client";
import { useRef, useEffect } from "react";
import AnimatedParticlesBackground from "./AnimatedParticlesBackground";

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null);

  // Cal.com API init
  useEffect(() => {
    (async function () {
      // Eliminar: const cal = await getCalApi({ namespace: "30min" });
      // Eliminar: cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
      {/* Fondo animado de partículas y haz de luz */}
      <AnimatedParticlesBackground />
      {/* Sección 1: Hero */}
      <section className="flex flex-col items-center justify-center min-h-screen text-center px-4 animate-fade-in">
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-2 animate-slide-down">Lanzadera de clientes</h1>
        <h2 className="text-lg sm:text-2xl text-gray-300 mb-6 animate-slide-up">Por Patricio Wamba</h2>
        <p className="text-base sm:text-lg text-gray-200 max-w-xl mb-8 animate-fade-in-delay">
          Aprende inteligencia artificial conmigo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/patricio"
            className="creative-btn bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-white font-extrabold text-xl px-10 py-5 rounded-full shadow-2xl transition-all animate-pop-in text-center border-4 border-white drop-shadow-lg"
            style={{ display: 'inline-block', lineHeight: '2.75rem', fontSize: '1.5rem', letterSpacing: '0.05em' }}
          >
            Comenzar una agencia de IA exitosa
          </a>
          <a
            href="/formaciones"
            className="creative-btn bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all animate-pop-in text-center"
            style={{ display: 'inline-block', lineHeight: '2.25rem' }}
          >
            Ver formaciones
          </a>
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
      {/* Footer */}
      <footer className="w-full text-center py-8 text-gray-500 text-sm">
        <span>Copyright 2025 - LanzaderaClientes.ES - Todos los derechos reservados</span>
        <span className="mx-2">|</span>
        <span>Desarrollado por <a href="https://zanovix.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition">zanovix.com</a></span>
      </footer>
    </div>
  );
}
