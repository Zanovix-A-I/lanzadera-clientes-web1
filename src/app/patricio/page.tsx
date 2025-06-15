"use client";
import { useEffect, useRef, useState } from "react";
// import Cal, { getCalApi } from "@calcom/embed-react"; // Remove Cal.com import

export default function PatricioPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // 'muted_autoplay': initial state, video plays muted with overlay
  // 'playing': video is unmuted and playing
  // 'paused': video is unmuted and paused
  const [videoState, setVideoState] = useState<'muted_autoplay' | 'playing' | 'paused'>('muted_autoplay');

  useEffect(() => {
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

    // Add Calendly script dynamically
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script on unmount if necessary, though Calendly script is often left.
      // document.body.removeChild(script);
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

  const handleRewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (videoRef.current.paused) {
        videoRef.current.play();
        setVideoState('playing');
      }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center py-16 px-4 bg-black text-white overflow-x-hidden">
      {/* Título de la VSL */}
      <h1 className="text-3xl sm:text-5xl font-bold text-center mb-12 animate-slide-down max-w-4xl">
        ¿Te gustaría poder estar viviendo de tu Agencia de IA de aquí a unos meses?
      </h1>

      {/* Video VSL */}
      <div
        className="relative w-full max-w-4xl mb-16 rounded-xl overflow-hidden shadow-2xl animate-fade-in-delay-2 group cursor-pointer"
        onClick={handleVideoAreaClick}
      >
        <video
          ref={videoRef}
          src="/VSL.mov"
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

        {/* Rewind Button (visible after unmute) */}
        {videoState !== 'muted_autoplay' && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent play/pause toggle
              handleRewind();
            }}
            className="absolute bottom-4 left-4 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Reiniciar video"
          >
            🔄
          </button>
        )}
      </div>

      {/* Embed de Calendly */}
      <div className="backdrop-blur-md bg-black/60 border border-white/10 rounded-2xl shadow-2xl p-8 sm:p-12 max-w-2xl w-full flex flex-col items-center floating-card mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 animate-slide-down text-center">Agenda tu cita</h2>
        <p className="text-base sm:text-lg text-gray-200 animate-fade-in text-center mb-6">
          Reserva una llamada directamente en mi calendario para que hablemos de tu agencia de IA.
        </p>
        {/* Calendly Widget */} 
        <div 
          className="calendly-inline-widget w-full rounded-xl overflow-hidden" 
          data-url="https://calendly.com/patriciow93/reunion-con-patricio" 
          style={{ minWidth: "320px", height: "700px" }}
        ></div>
      </div>

      {/* Footer (opcional, si quieres que se repita el de la landing) */}
      <footer className="w-full text-center py-6 text-gray-400 text-sm animate-fade-in-delay-3">
        Powered by <a href="https://zanovix.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition">Zanovix</a>
      </footer>
    </div>
  );
} 