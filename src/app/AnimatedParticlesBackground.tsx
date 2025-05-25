"use client";
import { useEffect, useRef } from "react";

export default function AnimatedParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;
    // Partículas
    const PARTICLE_COUNT = 60;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      size: number;
      life: number;
      maxLife: number;
    }[] = [];

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (!canvas || !ctx) return;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(1,0,0,1,0,0);
      ctx.scale(dpr, dpr);
    }

    function spawnParticle() {
      // Emerge desde la base, dentro del haz de luz
      const angle = (Math.random() - 0.5) * Math.PI / 2.5; // -36º a 36º
      const speed = 1.1 + Math.random() * 0.7;
      const x = width / 2 + (Math.random() - 0.5) * width * 0.18;
      const y = height - 10;
      return {
        x,
        y,
        vx: Math.sin(angle) * speed,
        vy: -Math.cos(angle) * speed - Math.random() * 0.5,
        alpha: 0.5 + Math.random() * 0.2,
        size: 1.1 + Math.random() * 1.2,
        life: 0,
        maxLife: 90 + Math.random() * 40,
      };
    }

    function drawLight() {
      if (!ctx) return;
      // Haz de luz blanco desde abajo (más suave)
      const grad = ctx.createRadialGradient(
        width / 2,
        height,
        0,
        width / 2,
        height,
        width * 0.38
      );
      grad.addColorStop(0, "rgba(255,255,255,0.18)");
      grad.addColorStop(0.18, "rgba(255,255,255,0.09)");
      grad.addColorStop(0.4, "rgba(255,255,255,0.03)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.beginPath();
      ctx.ellipse(width/2, height, width*0.38, height*0.28, 0, 0, 2*Math.PI);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    }

    function drawParticles() {
      if (!ctx) return;
      for (const p of particles) {
        ctx.save();
        ctx.globalAlpha = p.alpha * (1 - p.life / p.maxLife);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }
    }

    function updateParticles() {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        if (p.life > p.maxLife || p.y < 0 || p.x < 0 || p.x > width) {
          particles.splice(i, 1);
        }
      }
      // Añadir nuevas partículas si faltan
      while (particles.length < PARTICLE_COUNT) {
        particles.push(spawnParticle());
      }
    }

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      drawLight();
      updateParticles();
      drawParticles();
      animationId = requestAnimationFrame(loop);
    }

    window.addEventListener("resize", resize);
    resize();
    let animationId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -10,
        pointerEvents: "none"
      }}
    />
  );
} 