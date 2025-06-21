"use client";
import { useEffect, useRef, useState } from "react";
// import Cal, { getCalApi } from "@calcom/embed-react"; // Remove Cal.com import
import AnimatedParticlesBackground from "../AnimatedParticlesBackground";

export default function PatricioPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // 'muted_autoplay': initial state, video plays muted with overlay
  // 'playing': video is unmuted and playing
  // 'paused': video is unmuted and paused
  const [videoState, setVideoState] = useState<'muted_autoplay' | 'playing' | 'paused'>('muted_autoplay');
  const [isCalendlyFocused, setIsCalendlyFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loadCalendly, setLoadCalendly] = useState(false);
  const calendlyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for mobile screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // (async function () {
    //   const cal = await getCalApi({ namespace: "30min" });
    //   cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    // })(); // Remove Cal.com initialization

    // Autoplay muted video on mount
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
        // Fallback for strict autoplay policies: ensure it's muted
        if (videoRef.current) videoRef.current.muted = true;
      });
    }

    // Lazy load Calendly
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadCalendly(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (calendlyRef.current) {
      observer.observe(calendlyRef.current);
    }

    // Add Calendly script dynamically
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script on unmount if necessary, though Calendly script is often left.
      // document.body.removeChild(script);
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
    };

  }, []);

  const handleVideoAreaClick = () => {
    if (!videoRef.current) return;

    if (videoState === 'muted_autoplay') {
      // First click: Unmute, restart, and switch to playing state
      videoRef.current.muted = false;
      videoRef.current.currentTime = 0; // Restart video
      videoRef.current.play(); // Ensure it's playing
      setVideoState('playing');
    } else if (videoState === 'playing') {
      // Subsequent clicks: Pause
      videoRef.current.pause();
      setVideoState('paused');
    } else if (videoState === 'paused') {
      // Subsequent clicks: Play
      videoRef.current.play();
      setVideoState('playing');
    }
  };

  // Adelantar 10 segundos
  const handleForward10 = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.duration,
        videoRef.current.currentTime + 10
      );
    }
  };

  // Retroceder 10 segundos
  const handleBackward10 = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        0,
        videoRef.current.currentTime - 10
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!videoRef.current) return;
      if (videoState === 'muted_autoplay') return;
      if (e.key === 'ArrowRight') {
        handleForward10();
      } else if (e.key === 'ArrowLeft') {
        handleBackward10();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [videoState]);

  return (
    <div className="relative min-h-screen flex flex-col items-center py-16 px-4 bg-black text-white overflow-x-hidden">
      {!isMobile && <AnimatedParticlesBackground />}
      {/* Título de la VSL */}
      <h1 className={`text-3xl sm:text-5xl font-bold text-center mb-12 max-w-4xl ${!isMobile ? 'animate-slide-down' : ''}`}>
        ¿Te gustaría poder estar viviendo de tu Agencia de IA de aquí a unos meses?
      </h1>

      {/* Video VSL */}
      <div
        className={`relative w-full max-w-4xl mb-16 rounded-xl overflow-hidden shadow-2xl group cursor-pointer ${!isMobile ? 'animate-fade-in-delay-2' : ''}`}
        onClick={handleVideoAreaClick}
      >
        <video
          ref={videoRef}
          src="/vsl.mp4"
          poster="/poster.jpg"
          preload="metadata"
          // controls // Removed default controls
          autoPlay
          loop
          muted={videoState === 'muted_autoplay'}
          playsInline
          className="w-full h-auto"
        />

        {/* Unmute Overlay (large) */}
        {videoState === 'muted_autoplay' && (
          <div
            className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-center transition-opacity duration-300 opacity-100"
          >
            <span className="text-8xl mb-4 animate-pulse">🔇</span>
            <p className="text-lg">Click para activar el sonido y empezar</p>
          </div>
        )}

        {/* Play/Pause Overlay (smaller, only when paused) */}
        {videoState === 'paused' && (
          <div
            className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300"
          >
            <span className="text-7xl text-white">▶️</span>
          </div>
        )}

        {/* Botones de adelantar/retroceder (derecha) */}
        {videoState !== 'muted_autoplay' && (
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <button
              onClick={e => {
                e.stopPropagation();
                handleBackward10();
              }}
              className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 text-xs"
              aria-label="Retroceder 10 segundos"
              style={{ fontSize: '1.2rem' }}
            >⏪ 10s</button>
            <button
              onClick={e => {
                e.stopPropagation();
                handleForward10();
              }}
              className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 text-xs"
              aria-label="Adelantar 10 segundos"
              style={{ fontSize: '1.2rem' }}
            >10s ⏩</button>
          </div>
        )}
      </div>

      {/* Embed de Calendly */}
      <div
        ref={calendlyRef}
        className={`border border-white/10 rounded-2xl shadow-2xl p-8 sm:p-12 w-full flex flex-col items-center mb-16 transition-all duration-300 max-w-2xl sm:max-w-3xl lg:max-w-4xl ${isMobile ? 'bg-black/80' : 'backdrop-blur-md bg-black/60'} ${isCalendlyFocused || isMobile ? '' : 'floating-card'}`}
        style={{ minHeight: isMobile ? 'auto' : 900 }}
        onMouseEnter={() => setIsCalendlyFocused(true)}
        onMouseLeave={() => setIsCalendlyFocused(false)}
        onFocus={() => setIsCalendlyFocused(true)}
        onBlur={() => setIsCalendlyFocused(false)}
        tabIndex={0}
      >
        <h2 className={`text-2xl sm:text-3xl font-bold text-white mb-6 text-center ${!isMobile ? 'animate-slide-down' : ''}`}>Agenda tu cita</h2>
        <p className={`text-base sm:text-lg text-gray-200 text-center mb-6 ${!isMobile ? 'animate-fade-in' : ''}`}>
          Reserva una llamada directamente en mi calendario para que hablemos de tu agencia de IA.
        </p>
        {/* Calendly Widget */}
        {loadCalendly ? (
          <div
            className="calendly-inline-widget w-full rounded-xl overflow-hidden"
            data-url="https://calendly.com/patriciow93/reunion-con-patricio"
            style={{ minWidth: "320px", height: "820px" }}
          ></div>
        ) : (
          <div style={{ height: '820px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p className="text-gray-400">Cargando calendario...</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className={`w-full text-center py-8 text-gray-500 text-sm ${!isMobile ? 'animate-fade-in-delay-3' : ''}`}>
        <span>Copyright 2025 - LanzaderaClientes.ES - Todos los derechos reservados</span>
        <span className="mx-2">|</span>
        <span>Desarrollado por <a href="https://zanovix.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition">zanovix.com</a></span>
      </footer>
    </div>
  );
} 