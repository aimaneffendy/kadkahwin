"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Rocket, ChevronRight } from 'lucide-react';

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle System Logic for Moving Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number; y: number; size: number; speedX: number; speedY: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas!.width) this.x = 0;
        if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        if (this.y < 0) this.y = canvas!.height;
      }
      draw() {
        ctx!.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 150; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-[#030303] flex items-center justify-center overflow-hidden">
      {/* Interactive Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Radial Glow Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,3,3,0.8)_80%)] z-1" />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        
        {/* The "Gempak" 404 Animation */}
        <div className="relative group">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="text-[10rem] md:text-[18rem] font-black leading-none tracking-tighter"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-t from-blue-600 via-cyan-400 to-white animate-pulse">
              404
            </span>
          </motion.h1>
          
          {/* Glitch Effect Layers */}
          <motion.span 
            animate={{ x: [-2, 2, -2], opacity: [0, 0.5, 0] }}
            transition={{ repeat: Infinity, duration: 0.1 }}
            className="absolute inset-0 text-[10rem] md:text-[18rem] font-black text-red-500/30 -z-10 translate-x-1"
          >
            404
          </motion.span>
          <motion.span 
            animate={{ x: [2, -2, 2], opacity: [0, 0.5, 0] }}
            transition={{ repeat: Infinity, duration: 0.1, delay: 0.05 }}
            className="absolute inset-0 text-[10rem] md:text-[18rem] font-black text-blue-500/30 -z-10 -translate-x-1"
          >
            404
          </motion.span>
        </div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="-mt-4 md:-mt-10"
        >
          <h2 className="text-2xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            SYSTEM FAILURE: PAGE NOT FOUND
          </h2>
          <p className="text-cyan-400/70 font-mono text-sm md:text-base max-w-xl mx-auto mb-12 uppercase tracking-[0.2em]">
            The requested coordinates do not exist in this sector.
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          
        </motion.div>

        {/* Decorative Scanner Line */}
        <motion.div 
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[1px] bg-cyan-500/20 shadow-[0_0_15px_cyan] z-0"
        />
      </div>
    </main>
  );
}