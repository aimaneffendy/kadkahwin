'use client';
import { motion } from 'framer-motion';

export default function DetailsSection() {
  // Animasi container untuk kesan staggered (muncul satu-satu)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Jeda 0.2s antara setiap element
        delayChildren: 0.3,
      },
    },
  };

 const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] as any // TAMBAH 'as any' KAT SINI
    } 
  }
};

  return (
    <section className="snap-start h-screen w-full bg-[#050505] relative flex flex-col items-center justify-center px-6 overflow-hidden font-serif">
      
      {/* 1. BACKGROUND 2.WEBP - UPSIDE DOWN */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          transition={{ duration: 2 }}
          src="/background2.webp"
          className="w-full h-full object-cover object-center scale-y-[-1]"
          alt="background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      </div>

      {/* 2. MAIN CONTENT - WITH RE-TRIGGER ANIMATION */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }} // Akan trigger setiap kali 30% section masuk skrin
        className="z-10 w-full max-w-2xl flex flex-col items-center text-center space-y-6 md:space-y-8"
      >
        
        {/* SALAM */}
        <motion.div variants={itemVariants} className="mb-2">
          <h2 className="text-[#fbf8f4] text-4xl md:text-6xl font-normal opacity-90 leading-relaxed tracking-normal">
            السَّلاَمُ عَلَيْكُمْ
          </h2>
          <div className="h-[1px] w-12 bg-[#a98d32]/30 mx-auto mt-2" />
        </motion.div>

        {/* TUAN RUMAH */}
        <motion.div variants={itemVariants} className="space-y-2">
          <h3 className="text-[#dbc677] text-lg md:text-xl tracking-[0.15em] uppercase font-light leading-tight">
            Noor Effendy bin Mohd Nor
          </h3>
          <p className="text-white/30 text-sm italic font-serif">&</p>
          <h3 className="text-[#dbc677] text-lg md:text-xl tracking-[0.15em] uppercase font-light leading-tight">
            Raba'iah binti Kodri
          </h3>
        </motion.div>

        {/* JEMPUTAN */}
        <motion.div variants={itemVariants} className="space-y-5">
          <p className="text-white/60 text-[13px] md:text-sm tracking-[0.2em] uppercase font-light leading-relaxed">
            Kami Dengan Rasa Penuh Kesyukuran <br/> & Sukacita Menjemput
          </p>
          
          <div className="py-1">
            <span className="text-[#dbc677] text-[12px] md:text-sm tracking-[0.3em] uppercase font-semibold border-y border-[#a98d32]/20 py-3 px-8 block md:inline-block">
              Dato' / Datin / Tuan / Puan / Encik / Cik
            </span>
          </div>

          <p className="text-white/60 text-[13px] md:text-sm tracking-[0.2em] uppercase font-light">
            Ke Raikan Cinta Putera Kami
          </p>
        </motion.div>

        {/* NAMA PENGANTIN */}
        <motion.div variants={itemVariants} className="w-full space-y-5 py-2 relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 h-[0.5px] w-20 bg-gradient-to-r from-transparent via-[#a98d32]/40 to-transparent" />
          
          <div className="space-y-5">
            <h4 className="text-[#fbf8f4] text-3xl md:text-5xl lg:text-6xl font-extralight italic leading-tight tracking-tight px-4">
              Muhammad Aiman <br className="md:hidden" /> bin Noor Effendy
            </h4>

            <div className="flex flex-col items-center gap-2">
              <p className="text-[#a98d32]/50 text-[10px] tracking-[0.5em] uppercase italic font-medium">Dengan Pasangannya</p>
              <div className="h-[0.5px] w-16 bg-[#a98d32]/30" />
            </div>

            <h4 className="text-[#fbf8f4] text-3xl md:text-5xl lg:text-6xl font-extralight italic leading-tight tracking-tight px-4">
              Adinda Fazliana <br className="md:hidden" /> binti Ramlie
            </h4>
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[0.5px] w-20 bg-gradient-to-r from-transparent via-[#a98d32]/40 to-transparent" />
        </motion.div>
      </motion.div>

      {/* 3. SCROLL HINT */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 pointer-events-none z-20"
      >
        <span className="text-[#a98d32]/50 text-[9px] tracking-[0.5em] uppercase font-light">Butiran Majlis</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-[#a98d32]/50"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </motion.div>
      </motion.div>

      {/* TEXTURE OVERLAYS */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] z-1" />
    </section>
  );
}