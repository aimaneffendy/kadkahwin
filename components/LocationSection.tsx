'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Car, Play, X, Calendar, Clock } from 'lucide-react';

export default function LocationSection() {
  const [showVideo, setShowVideo] = useState(false);

  const containerVars = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVars = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="h-screen w-full relative bg-[#050505] overflow-hidden flex flex-col">
      
      {/* 1. TOP SECTION: IMAGE (40%) */}
      <div className="relative h-[40%] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 15, ease: "easeOut" }}
          src="/dewan.webp" 
          className="w-full h-full object-cover"
          alt="The Venue"
        />
        {/* Overlay gelap dari bawah ke atas */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        
        {/* Floating Label - Enhanced Visibility */}
        <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-white/10 w-fit mb-2">
              <p className="text-[#d4b054] text-[8px] tracking-[0.4em] uppercase font-extrabold">
                The Venue
              </p>
            </div>
            <h3 className="text-[#fbf8f4] text-3xl font-serif italic tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Rich Asians Hall
            </h3>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-[#d4b054] p-3 rounded-full shadow-2xl shadow-black border border-white/20"
          >
             <MapPin size={18} className="text-black" />
          </motion.div>
        </div>
      </div>

      {/* 2. BOTTOM SECTION: DETAILS (60%) */}
      <motion.div 
        variants={containerVars}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="flex-1 bg-[#050505] px-8 pt-8 pb-32 flex flex-col" 
      >
        
        {/* TARIKH & MASA CARD */}
        <motion.div 
          variants={itemVars}
          className="grid grid-cols-2 gap-0.5 bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden mb-8 shadow-inner"
        >
          <div className="p-5 flex flex-col gap-2 border-r border-white/5">
            <div className="flex items-center gap-2 text-[#a98d32]">
              <Calendar size={12} />
              <span className="text-[8px] tracking-[0.2em] uppercase font-bold">Tarikh</span>
            </div>
            <p className="text-[#fbf8f4] text-[13px] font-medium tracking-wider">14 JUN 2026</p>
          </div>
          <div className="p-5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#a98d32]">
              <Clock size={12} />
              <span className="text-[8px] tracking-[0.2em] uppercase font-bold">Masa</span>
            </div>
            <p className="text-[#fbf8f4] text-[13px] font-medium tracking-wider">11AM - 4PM</p>
          </div>
        </motion.div>

        {/* ALAMAT */}
        <motion.div variants={itemVars} className="mb-8">
          <p className="text-[#fbf8f4]/30 text-[9px] tracking-[0.3em] uppercase mb-2">Detailed Address</p>
          <p className="text-[#fbf8f4]/80 text-[13px] font-light leading-relaxed">
            Dataran Ecohill, Semenyih, <br />
            43500 Selangor Darul Ehsan
          </p>
        </motion.div>

        {/* INFO GRID */}
        <div className="grid grid-cols-2 gap-6 mb-auto">
          <motion.div variants={itemVars} className="space-y-2">
            <div className="flex items-center gap-2 text-[#d4b054]">
              <Car size={13} />
              <span className="text-[9px] tracking-[0.2em] uppercase font-bold">Parking</span>
            </div>
            <p className="text-[#fbf8f4]/50 text-[11px] leading-snug font-serif italic">
              Aras B1 & B2. Akses terus ke Lobi Utama.
            </p>
          </motion.div>

          <motion.div variants={itemVars} className="space-y-2">
            <button 
              onClick={() => setShowVideo(true)}
              className="flex items-center gap-2 group"
            >
              <div className="w-6 h-6 bg-[#d4b054]/10 rounded-full flex items-center justify-center group-hover:bg-[#d4b054]/20 transition-colors">
                <Play size={10} className="text-[#d4b054] fill-current" />
              </div>
              <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-[#d4b054] border-b border-[#d4b054]/30">Watch Tour</span>
            </button>
            <p className="text-[#fbf8f4]/50 text-[11px] leading-snug font-serif italic">
              Lihat panduan visual laluan ke dewan.
            </p>
          </motion.div>
        </div>

        {/* 3. NAVIGATION BUTTONS (Safe Zone dari Music Player) */}
        <motion.div 
          variants={itemVars}
          className="flex gap-3 mt-8"
        >
          <a 
            href="https://waze.com" 
            target="_blank"
            className="flex-[2.5] py-4 bg-white/[0.04] border border-white/10 rounded-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            <Navigation size={14} className="text-[#d4b054]" />
            <span className="text-[#fbf8f4] text-[10px] font-bold tracking-[0.2em] uppercase font-sans">Open Waze</span>
          </a>
          <a 
            href="https://maps.google.com" 
            target="_blank"
            className="flex-1 py-4 bg-[#d4b054] rounded-xl flex items-center justify-center active:scale-95 transition-all shadow-lg shadow-[#d4b054]/20"
          >
            <MapPin size={16} className="text-black" />
          </a>
        </motion.div>
      </motion.div>

      {/* VIDEO POPUP */}
      <AnimatePresence>
        {showVideo && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <button 
              onClick={() => setShowVideo(false)} 
              className="absolute top-8 right-8 text-white/50 hover:text-white"
            >
              <X size={32} />
            </button>
            <motion.div 
              initial={{ scale: 0.9 }} animate={{ scale: 1 }}
              className="w-full max-w-2xl aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            >
              {/* Tukar link YouTube di bawah kepada video tutorial sebenar */}
              <iframe 
                className="w-full h-full" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                frameBorder="0" 
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] pointer-events-none" />
      
    </section>
  );
}