'use client';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

const GoldenDust = ({ delay, duration, x, y, size }: { delay: number; duration: number; x: number; y: number; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-[#dbc677] blur-[0.5px]"
    initial={{ opacity: 0, x: `${x}vw`, y: `${y}vh` }}
    animate={{ 
      opacity: [0, 0.6, 0], 
      y: [`${y}vh`, `${y - 12}vh`],
      x: [`${x}vw`, `${x + (Math.random() > 0.5 ? 1 : -1)}vw`],
    }}
    transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    style={{ width: size, height: size }}
  />
);

export default function QuoteSection() {
  const dustParticles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 10,
      duration: 6 + Math.random() * 8,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 1.5,
    }));
  }, []);

  return (
    /* FIX: Buang padding vertical dari section supaya background bermula dari titik 0 */
    <section className="w-full min-h-[70vh] bg-black relative flex items-center justify-center overflow-hidden font-serif">
      
      {/* 1. BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
          src="/backgroundmain3.webp" 
          className="w-full h-full object-cover object-left"
          alt="background"
        />
        {/* Gradient Atas dipastikan 'from-black' untuk sambung HeroSection */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      {/* 2. GOLDEN SHIMMER DUST */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {dustParticles.map(p => <GoldenDust key={p.id} {...p} />)}
      </div>

      {/* 3. CONTENT - Letak padding di sini (py-32) */}
      <div className="relative z-10 max-w-5xl w-full px-10 md:px-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-32">
        
        {/* Left Side Accent Line */}
        <div className="md:col-span-1 hidden md:flex flex-col items-center">
          <div className="h-40 w-[0.5px] bg-gradient-to-b from-transparent via-[#a98d32]/40 to-transparent" />
        </div>

        {/* Main Content Side */}
        <div className="md:col-span-11 space-y-12 text-left">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="space-y-6"
          >
            <span className="text-[#a98d32] text-[10px] tracking-[0.8em] uppercase font-bold block mb-4 border-l-2 border-[#a98d32] pl-4">
              Surah Ar-Rum : 21
            </span>
            
            <h2 className="text-[#fbf8f4] text-3xl md:text-5xl lg:text-6xl font-extralight italic leading-[1.3] tracking-tight">
              "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu <span className="text-[#dbc677] not-italic font-normal">isteri-isteri dari jenismu sendiri</span>, supaya kamu merasa tenteram kepadanya."
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="pt-10 border-t border-white/10"
          >
            <p className="text-white/50 text-[13px] md:text-xs tracking-[0.3em] uppercase leading-loose font-light">
              Semoga Penyatuan Ini Diberkati Dengan Sakinah, Mawaddah dan Rahmah <br className="hidden md:block" /> 
              hingga ke Syurga.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]" />
    </section>
  );
}