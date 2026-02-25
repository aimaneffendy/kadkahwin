'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface EntranceSectionProps {
  onOpen: () => void;
}

export default function EntranceSection({ onOpen }: EntranceSectionProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-06-14T11:00:00');

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
      
      {/* 1. BACKGROUND DENGAN SLOW ZOOM */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="/background1.webp" 
          alt="Wedding Background" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />
      </motion.div>

      {/* 2. CONTENT AREA */}
      <div className="z-10 w-full text-center flex flex-col items-center justify-center px-6 mt-6">
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-[#a98d32]/60 text-[10px] tracking-[0.7em] uppercase mb-10 w-full"
        >
          Walimatulurus
        </motion.p>
        
        {/* 3. HERO IMAGE (Floating) */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: -5 }}
          transition={{ 
            opacity: { duration: 1.5 },
            y: { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
          }}
          className="relative flex justify-center items-center w-full mb-10" 
        >
          <img 
            src="/savethedate.webp" 
            alt="Save The Date" 
            className="w-[200px] md:w-[260px] h-auto opacity-95 mx-auto block drop-shadow-lg" 
          />
        </motion.div>

        {/* NAMA PENGANTIN - Huruf Kecil untuk are getting married */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="space-y-2 mb-10 w-full"
        >
          <h1 className="text-[#d4b054] text-3xl md:text-4xl font-serif tracking-[0.05em] italic leading-tight">
            Aiman & Adinda
          </h1>
          <p className="text-[#a98d32]/50 text-[11px] font-light lowercase italic tracking-[0.1em]">
            are getting married
          </p>
        </motion.div>

        {/* 4. COUNTDOWN TIMER (Ganti Tarikh Statik) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex items-center justify-center gap-4 mb-16 text-[#d4b054]"
        >
          {[
            { label: 'days', value: timeLeft.days },
            { label: 'hours', value: timeLeft.hours },
            { label: 'mins', value: timeLeft.mins },
            { label: 'secs', value: timeLeft.secs }
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-xl md:text-2xl font-light tracking-widest">{String(item.value).padStart(2, '0')}</span>
              <span className="text-[7px] uppercase tracking-[0.3em] opacity-40 mt-1">{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* 5. BUTTON WITH BLINK & SHINE */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
          <motion.button
            onClick={onOpen}
            animate={{ boxShadow: ["0 0 0px 0px rgba(197,160,68,0)", "0 0 15px 2px rgba(197,160,68,0.4)", "0 0 0px 0px rgba(197,160,68,0)"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden px-10 py-3 bg-[#c5a044] text-black text-[11px] font-bold tracking-[0.3em] uppercase rounded-full transition-all"
          >
            <motion.div 
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, ease: "linear" }}
              className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 pointer-events-none"
            />
            <span className="relative z-10">Buka Jemputan</span>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}