'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface EntranceSectionProps {
  onOpen: () => void;
}

export default function EntranceSection({ onOpen }: EntranceSectionProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 1. Logik Countdown ke tarikh majlis
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

  // 2. Logik peralihan ke Hero Section
  const handleOpen = () => {
    setIsTransitioning(true);
    // Tempoh loading dot melompat sebelum jemputan terbuka sepenuhnya
    setTimeout(() => {
      onOpen();
    }, 2800); 
  };

  return (
    <section className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
      
      {/* OVERLAY LOADING: STAGGERED DOTS BOUNCE */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[110] bg-black flex flex-col items-center justify-center"
          >
            {/* Animasi 3 Dot Emas */}
            <div className="flex gap-4 mb-10">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3.5 h-3.5 bg-[#d4b054] rounded-full shadow-[0_0_20px_rgba(212,176,84,0.5)]"
                  animate={{ 
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2 // Memberikan efek 'wave' atau selang-seli
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <p className="text-[#d4b054] text-[10px] tracking-[0.8em] uppercase font-light">
                Menyusun Warkah
              </p>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-[1px] bg-[#d4b054]/30 mx-auto mt-4"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BACKGROUND IMAGE - FULL COVER */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="/background1.webp" 
          alt="Wedding Background" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </motion.div>

      {/* MAIN CONTENT AREA */}
      <div className="z-10 w-full text-center flex flex-col items-center justify-center px-8">
        
        {/* Title Top */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-[#a98d32] text-[14px] md:text-[16px] tracking-[0.7em] uppercase mb-12"
        >
          Walimatul Urus
        </motion.p>
        
        {/* Save The Date Logo/Image */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex justify-center items-center mb-12" 
        >
          <img 
            src="/savethedate.webp" 
            alt="Save The Date" 
            className="w-[180px] md:w-[240px] h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" 
          />
        </motion.div>

        {/* Names Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.5 }}
          className="space-y-3 mb-12"
        >
          <h1 className="text-[#d4b054] text-4xl md:text-5xl font-serif tracking-tight italic leading-tight">
            Aiman & Adinda
          </h1>
          <p className="text-[#a98d32]/60 text-[15px] font-light lowercase italic tracking-widest">
            are getting married!
          </p>
        </motion.div>

        {/* COUNTDOWN TILES */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex items-center justify-center gap-6 mb-16 text-[#d4b054]"
        >
          {[
            { label: 'days', value: timeLeft.days },
            { label: 'hours', value: timeLeft.hours },
            { label: 'mins', value: timeLeft.mins },
            { label: 'secs', value: timeLeft.secs }
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-extralight tracking-widest leading-none">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[8px] uppercase tracking-[0.4em] opacity-40 mt-2 font-bold">{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* OPEN BUTTON */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1.4 }}
        >
          <motion.button
            onClick={handleOpen}
            whileHover={{ scale: 1.05, letterSpacing: "0.5em" }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden px-12 py-4 bg-[#c5a044] text-black text-[11px] font-black tracking-[0.4em] uppercase rounded-full transition-all shadow-2xl active:shadow-none"
          >
            <span className="relative z-10">Buka Jemputan</span>
            {/* Efek kilat pada butan */}
            <motion.div 
              animate={{ x: ['-150%', '250%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-20 pointer-events-none"
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}