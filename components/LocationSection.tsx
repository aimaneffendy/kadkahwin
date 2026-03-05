'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, Play, X, Copy, Check, Compass } from 'lucide-react';

export default function LocationSection() {
  const [showVideo, setShowVideo] = useState(false);
  const [copied, setCopied] = useState(false);

  // Alamat penuh yang baru
  const address = "G-04-L3, Level 3, Block G, Pusat Komersial Dataran Ecohill, Jln Ecohill 1/2, Setia Ecohill, 43500 Semenyih, Selangor";

  // Fungsi untuk hantar isyarat ke page.tsx (untuk pause/play lagu)
  const toggleBackgroundMusic = (play: boolean) => {
    const event = new CustomEvent('toggleMusic', { detail: { play } });
    window.dispatchEvent(event);
  };

  const handleOpenVideo = () => {
    setShowVideo(true);
    toggleBackgroundMusic(false); // Berhenti lagu latar
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
    toggleBackgroundMusic(true); // Sambung lagu latar
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="min-h-screen w-full relative bg-black overflow-hidden flex flex-col font-serif">
      
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black">
        <motion.img 
          src="/dewan.webp" 
          className="w-full h-full object-cover"
          alt="The Venue"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
      </div>

      <div className="relative z-20 flex flex-col px-10 h-full max-w-4xl mx-auto w-full py-32 flex-1 justify-center">
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.span initial={{ width: 0 }} whileInView={{ width: 40 }} className="h-[1px] bg-[#a98d32]" />
            <p className="text-[#a98d32] text-[9px] tracking-[0.6em] uppercase font-bold">Lokasi Majlis</p>
          </div>
          <h2 className="text-[#dbc677] text-6xl md:text-8xl font-light leading-[0.85] tracking-tighter uppercase">
            Rich <br />
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 0.8 }} className="italic font-extralight lowercase text-white">Asians</motion.span> <br />
            Hall.
          </h2>
        </motion.div>

        {/* INFO SECTION (TARIKH & MASA KEMASKINI) */}
        <div className="space-y-12 mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="pt-4">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="space-y-2">
                <p className="text-[#dbc677] text-[13px] tracking-[0.3em] uppercase font-black">Tarikh</p>
                <p className="text-white text-2xl md:text-3xl tracking-tight font-medium uppercase leading-tight">14.06.2026</p>
                <p className="text-[#a98d32] text-[13px] tracking-[0.1em] uppercase font-bold italic">Ahad</p>
              </div>

              <div className="space-y-2">
                <p className="text-[#dbc677] text-[13px] tracking-[0.3em] uppercase font-black">Masa</p>
                <p className="text-white text-2xl md:text-3xl tracking-tight font-medium italic leading-tight">10.00 Pagi—4.00 Petang</p>
              </div>
            </div>
          </motion.div>

          {/* ADDRESS BOX (ALAMAT KEMASKINI) */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
            <div className="max-w-[320px] md:max-w-[450px]">
              <p className="text-white/80 text-[14px] leading-relaxed tracking-wide font-light italic">
                G-04-L3, Level 3, Block G, <br />
                Pusat Komersial Dataran Ecohill, <br />
                Jln Ecohill 1/2, Setia Ecohill, <br />
                43500 Semenyih, Selangor.
              </p>
            </div>
            
            <div className="flex items-center gap-8">
              <button onClick={handleCopy} className="flex items-center gap-2 text-[#dbc677] text-[10px] tracking-[0.3em] uppercase font-bold border-b border-[#a98d32]/30 pb-1 hover:text-white transition-colors">
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? 'Tersalin' : 'Salin Alamat'}
              </button>

              <button onClick={handleOpenVideo} className="flex items-center gap-2 text-[#dbc677] text-[10px] tracking-[0.3em] uppercase font-bold border-b border-[#a98d32]/30 pb-1 hover:text-white transition-colors">
                <Play size={10} className="fill-[#dbc677]" />
                Lihat Dewan
              </button>
            </div>
          </motion.div>
        </div>

        {/* NAVIGATION BUTTONS */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-4">
          <a href="https://www.waze.com/en/live-map/directions/my/selangor/semenyih/rich-hall-by-kamalinda?place=ChIJxQESGrvPzTER23uhpxuCoV0" target="_blank" className="group h-14 border border-[#a98d32]/40 flex items-center justify-center transition-all hover:bg-[#a98d32]/5">
            <div className="flex items-center gap-3">
              <span className="text-[#dbc677] text-[10px] font-bold tracking-[0.4em] uppercase">Waze</span>
              <Navigation size={14} className="text-[#a98d32]" />
            </div>
          </a>
          <a href="https://goo.gl/maps/5WqcRMt5xT5VMUSSA" target="_blank" className="group h-14 bg-[#dbc677] flex items-center justify-center shadow-2xl transition-all hover:bg-[#ebd996]">
            <div className="flex items-center gap-3">
              <span className="text-black text-[10px] font-bold tracking-[0.4em] uppercase">Maps</span>
              <Compass size={14} className="text-black" />
            </div>
          </a>
        </motion.div>
      </div>

      {/* VIDEO POPUP (9:16 Portrait) */}
      <AnimatePresence>
        {showVideo && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button onClick={handleCloseVideo} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors z-[210]">
              <X size={28} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }} 
              className="w-full max-w-md aspect-[9/16] bg-black border border-[#a98d32]/30 shadow-2xl relative overflow-hidden"
            >
              <video 
                src="/kamalinda.mp4" 
                className="w-full h-full object-cover"
                controls
                autoPlay
                playsInline
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]" />
    </section>
  );
}