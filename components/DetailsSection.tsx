'use client';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

// Komponen Dust - Untuk efek partikel emas
const GoldenDust = ({ delay, duration, x, y, size }: { delay: number; duration: number; x: number; y: number; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-[#dbc677] blur-[0.5px] z-20"
    initial={{ opacity: 0, x: `${x}vw`, y: `${y}vh` }}
    animate={{ 
      opacity: [0, 0.8, 0],
      y: [`${y}vh`, `${y - 20}vh`],
      x: [`${x}vw`, `${x + (Math.random() > 0.5 ? 3 : -3)}vw`],
    }}
    transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    style={{ width: size, height: size }}
  />
);

export default function DetailsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } }
  };

  const dustParticles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 10,
      duration: 7 + Math.random() * 8,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.2 + Math.random() * 1.8,
    }));
  }, []);

  return (
    <section className="w-full min-h-screen bg-black relative flex flex-col items-center justify-center overflow-hidden font-serif">
      
      {/* 1. BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 1.5 }}
          src="/background2.webp"
          className="w-full h-full object-cover object-center scale-y-[-1]"
          style={{ filter: 'brightness(0.9) contrast(1.2)' }} 
          alt="background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-transparent h-1/2 z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
      </div>

      {/* 2. GOLDEN DUST */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {dustParticles.map(p => <GoldenDust key={p.id} {...p} />)}
      </div>

      {/* 3. MAIN CONTENT WRAPPER */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="relative z-30 w-full max-w-2xl flex flex-col items-center text-center space-y-6 md:space-y-10 px-6 py-32"
      >
        {/* SECTION: NAMA IBU BAPA */}
        <motion.div variants={itemVariants} className="space-y-4">
          
          {/* Pihak Lelaki */}
          <div className="space-y-1">
            <h3 className="text-[#dbc677] text-lg md:text-2xl tracking-[0.1em] uppercase font-medium">
              NOOR EFFENDY BIN MOHD NOR & RABA'IAH BINTI KODRI
            </h3>
            <p className="text-white/60 text-[10px] md:text-xs tracking-[0.2em] uppercase font-light">
              (IBU BAPA PENGANTIN LELAKI)
            </p>
          </div>

          {/* Simbol Pemisah */}
          <div className="text-[#dbc677] opacity-40 italic font-serif text-xl md:text-2xl">&</div>

          {/* Pihak Perempuan */}
          <div className="space-y-1">
            <h3 className="text-[#dbc677] text-lg md:text-2xl tracking-[0.1em] uppercase font-medium">
              AYU YULIANA
            </h3>
            <p className="text-white/60 text-[10px] md:text-xs tracking-[0.2em] uppercase font-light">
              (IBU PENGANTIN PEREMPUAN)
            </p>
          </div>
        </motion.div>

        {/* SECTION: JEMPUTAN */}
        <motion.div variants={itemVariants} className="space-y-5">
          <p className="text-white/70 text-[13px] md:text-sm tracking-[0.2em] uppercase font-light leading-relaxed">
            Kami Dengan Rasa Penuh Kesyukuran <br/> & Sukacita Menjemput
          </p>
          
          <div className="py-1">
            <span className="text-[#dbc677] text-[12px] md:text-sm tracking-[0.3em] uppercase font-semibold border-y border-[#a98d32]/20 py-3 px-8 block md:inline-block bg-white/[0.02] backdrop-blur-[2px]">
              Dato&apos; / Datin / Tuan / Puan / Encik / Cik
            </span>
          </div>

          <p className="text-white/70 text-[13px] md:text-sm tracking-[0.2em] uppercase font-light">
            Ke Majlis Memeteraikan Janji Putera Kami
          </p>
        </motion.div>

        {/* SECTION: NAMA PENGANTIN */}
        <motion.div variants={itemVariants} className="w-full space-y-5 py-6 relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 h-[0.5px] w-32 bg-gradient-to-r from-transparent via-[#a98d32]/40 to-transparent" />
          
          <div className="space-y-5">
            <h4 className="text-[#fbf8f4] text-4xl md:text-5xl lg:text-6xl font-extralight italic leading-tight tracking-tight px-4 drop-shadow-lg">
              Muhammad Aiman <br className="md:hidden" /> bin Noor Effendy
            </h4>

            <div className="flex flex-col items-center gap-2">
              <p className="text-[#a98d32]/60 text-[10px] tracking-[0.6em] uppercase italic font-medium">Bersama Suri Pilihannya</p>
              <div className="h-[0.5px] w-16 bg-[#a98d32]/30" />
            </div>

            <h4 className="text-[#fbf8f4] text-4xl md:text-5xl lg:text-6xl font-extralight italic leading-tight tracking-tight px-4 drop-shadow-lg">
              Adinda Fazliana <br className="md:hidden" /> binti Ramlie
            </h4>
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[0.5px] w-32 bg-gradient-to-r from-transparent via-[#a98d32]/40 to-transparent" />
        </motion.div>

        {/* SCROLL HINT */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="pt-10 flex flex-col items-center gap-2 pointer-events-none z-20"
        >
          <span className="text-[#a98d32]/60 text-[9px] tracking-[0.5em] uppercase font-light">Butiran Majlis</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-[#a98d32]/60"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 4. TEXTURE OVERLAY */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] z-50" />
    </section>
  );
}