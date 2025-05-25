"use client";
import { useRef } from "react";
import AnimatedParticlesBackground from "./AnimatedParticlesBackground";

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
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
        <button
          onClick={scrollToAbout}
          className="creative-btn bg-white text-black font-semibold px-8 py-3 rounded-full shadow-lg transition-all animate-pop-in"
        >
          Saber más
        </button>
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
      <footer className="w-full text-center py-6 text-gray-400 text-sm animate-fade-in-delay-3">
        Powered by <a href="https://zanovix.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition">Zanovix</a>
      </footer>
    </div>
  );
}
