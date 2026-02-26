'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Aku tambah ikon Compass untuk vibe Google Maps yang lebih kacak
import { Navigation, Play, X, Copy, Check, Compass, MapPin } from 'lucide-react';

export default function LocationSection() {
  const [showVideo, setShowVideo] = useState(false);
  const [copied, setCopied] = useState(false);

  const address = "Rich Asians Hall, Dataran Ecohill, Semenyih, 43500 Selangor";

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="h-screen w-full relative bg-[#050505] overflow-hidden flex flex-col font-serif">
      
      {/* 1. BACKGROUND IMAGE */}
      <div className="absolute inset-0 w-full h-full opacity-40">
        <motion.img 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 12, ease: "easeOut" }}
          src="/dewan.webp" 
          className="w-full h-full object-cover"
          alt="The Venue"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 flex flex-col h-full px-10 pt-24 pb-16">
        
        {/* TOP: EDITORIAL HEADER */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="mb-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[1px] w-10 bg-[#a98d32]" />
            <p className="text-[#a98d32] text-[9px] tracking-[0.6em] uppercase font-bold">Lokasi Majlis</p>
          </div>
          <h2 className="text-[#dbc677] text-6xl md:text-8xl font-light leading-[0.85] tracking-tighter uppercase">
            Rich <br />
            <span className="italic font-extralight lowercase opacity-80 text-white">Asians</span> <br />
            Hall.
          </h2>
        </motion.div>

        {/* MIDDLE: INFO SECTION (Fixed Masa & Tarikh Alignment) */}
        <div className="space-y-12 mb-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-4"
          >
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="space-y-2">
                <p className="text-[#dbc677] text-[13px] tracking-[0.3em] uppercase font-black">Tarikh</p>
                <p className="text-white text-2xl md:text-3xl tracking-tight font-medium uppercase leading-tight">14.06.2026</p>
                <p className="text-[#a98d32] text-[10px] tracking-[0.1em] uppercase font-bold italic">Hari Ahad</p>
              </div>

              <div className="space-y-2">
                <p className="text-[#dbc677] text-[13px] tracking-[0.3em] uppercase font-black">Masa</p>
                <p className="text-white text-2xl md:text-3xl tracking-tight font-medium italic leading-tight">11:00 — 16:00</p>
                <p className="text-[#a98d32] text-[10px] tracking-[0.1em] uppercase font-bold italic">Jamuan Makan</p>
              </div>
            </div>
          </motion.div>

          {/* ADDRESS BOX */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-6"
          >
            <div className="max-w-[320px]">
              <p className="text-white/80 text-[14px] leading-relaxed tracking-wide font-light italic">
                Dataran Ecohill, Semenyih, 43500 <br />
                Selangor Darul Ehsan, Malaysia.
              </p>
            </div>
            
            <div className="flex items-center gap-8">
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 text-[#dbc677] text-[10px] tracking-[0.3em] uppercase font-bold border-b border-[#a98d32]/30 pb-1 hover:text-white transition-colors"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? 'Tersalin' : 'Salin Alamat'}
              </button>

              <button 
                onClick={() => setShowVideo(true)}
                className="flex items-center gap-2 text-[#dbc677] text-[10px] tracking-[0.3em] uppercase font-bold border-b border-[#a98d32]/30 pb-1 hover:text-white transition-colors"
              >
                <Play size={10} className="fill-[#dbc677]" />
                Lihat Dewan
              </button>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM: NAVIGATION BUTTONS (FIXED GOOGLE MAPS LOOK) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-4"
        >
          {/* WAZE - Minimalist Outline */}
          <a 
            href="https://waze.com" target="_blank"
            className="group h-14 border border-[#a98d32]/40 flex items-center justify-center transition-all hover:bg-[#a98d32]/5 active:scale-95"
          >
            <div className="flex items-center gap-3">
              <span className="text-[#dbc677] text-[10px] font-bold tracking-[0.4em] uppercase">Waze</span>
              <Navigation size={14} className="text-[#a98d32]" />
            </div>
          </a>

          {/* GOOGLE MAPS - New Premium Look */}
          <a 
            href="https://maps.google.com" target="_blank"
            className="group h-14 bg-[#dbc677] flex items-center justify-center shadow-2xl active:scale-95 transition-all hover:bg-[#ebd996]"
          >
            <div className="flex items-center gap-3">
              <span className="text-black text-[10px] font-bold tracking-[0.4em] uppercase">Maps</span>
              {/* Pakai Compass ikon untuk vibe lebih premium & clean */}
              <Compass size={14} className="text-black animate-pulse-slow" />
            </div>
          </a>
        </motion.div>
      </div>

      {/* VIDEO POPUP & TEXTURE (Maintain as before) */}
      <AnimatePresence>
        {showVideo && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <button onClick={() => setShowVideo(false)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors">
              <X size={28} />
            </button>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="w-full max-w-4xl aspect-video border border-[#a98d32]/30 bg-black shadow-2xl overflow-hidden">
              <iframe className="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameBorder="0" allowFullScreen />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]" />
    </section>
  );
}