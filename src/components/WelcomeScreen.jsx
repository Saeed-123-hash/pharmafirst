import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Activity } from 'lucide-react';

export default function WelcomeScreen({ onComplete }) {
  const [stage, setStage] = useState(0); // 0: Logo & Welcome, 1: Subtitle, 2: How can we help you
  const [exiting, setExiting] = useState(false);
  const canvasRef = useRef(null);

  // Animate stages
  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 1200);
    const t2 = setTimeout(() => setStage(2), 2600);
    const t3 = setTimeout(() => handleEnter(), 7000); // Auto enter after 7s

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleEnter = () => {
    setExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 600);
  };

  // 3D Canvas Molecular and Particle Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particleCount = Math.min(65, Math.floor(width / 20));
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 3 + 1.5,
        color: Math.random() > 0.4 ? 'rgba(56, 189, 248, ' : 'rgba(52, 211, 153, '
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Background subtle gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2 + (mouseX - width / 2) * 0.05,
        height / 2 + (mouseY - height / 2) * 0.05,
        50,
        width / 2,
        height / 2,
        width * 0.8
      );
      bgGrad.addColorStop(0, '#0c2747');
      bgGrad.addColorStop(0.5, '#07162c');
      bgGrad.addColorStop(1, '#030a14');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Connect molecular lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.22;
            ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particle nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `${p.color} ${0.4 * p.z})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.z, 0, Math.PI * 2);
        ctx.fill();

        // Glow ring around prominent nodes
        if (i % 5 === 0) {
          ctx.strokeStyle = `rgba(56, 189, 248, 0.15)`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * p.z * 3, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center select-none transition-all duration-700 ${
        exiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* 3D Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Decorative ambient radial glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-3xl pointer-events-none animate-pulse-subtle" />

      {/* Content Container */}
      <div className="relative z-10 max-w-2xl px-6 text-center text-white flex flex-col items-center">
        {/* Animated Brand Logo Symbol */}
        <div className="relative mb-6 group">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-brand-600 via-sky-500 to-emerald-400 p-[2px] shadow-glow transform hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950/80 rounded-2xl backdrop-blur-md flex items-center justify-center">
              <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
                {/* Modern Cross & Capsule Symbol */}
                <path d="M20 8v24M8 20h24" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
                <circle cx="20" cy="20" r="5" fill="#34d399" />
              </svg>
            </div>
          </div>
          {/* Subtle orbiting ring */}
          <div className="absolute -inset-2 border border-sky-400/20 rounded-3xl animate-spin" style={{ animationDuration: '18s' }} />
        </div>

        {/* Company Title */}
        <div className="overflow-hidden mb-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-400/30">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              Online Pharmaceutical Logistics
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-sky-200 bg-clip-text text-transparent">
            Welcome to Pharma First Enterprises
          </h1>
        </div>

        {/* Subtitle Transition */}
        <p
          className={`text-lg sm:text-xl text-slate-300 font-light max-w-xl transition-all duration-700 transform ${
            stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Your trusted pharmaceutical distribution partner.
        </p>

        {/* "How can we help you?" Transition */}
        <div
          className={`mt-6 mb-8 transition-all duration-700 transform ${
            stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-xl sm:text-2xl font-medium text-sky-300 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            How can we help you today?
          </p>
        </div>

        {/* Action Button & Timer Indicator */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={handleEnter}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-600 to-sky-500 hover:from-brand-500 hover:to-sky-400 shadow-lg shadow-sky-950/50 hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Continue to Website</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Skip note & security hint */}
        <div className="mt-8 flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Authorized Healthcare Supply
          </span>
          <span className="text-slate-600">•</span>
          <span>Automatic redirecting in few seconds</span>
        </div>
      </div>
    </div>
  );
}
