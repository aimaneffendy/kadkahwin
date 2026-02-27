'use client';
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Pause, Play, ChevronUp } from 'lucide-react';

import EntranceSection from '../components/EntranceSection';
import HeroSection from '../components/HeroSection';
import QuoteSection from '../components/QuoteSection';
import DetailsSection from '../components/DetailsSection';
import LocationSection from '../components/LocationSection';
import RSVPSection from '../components/RSVPSection';
import WishSection from '../components/WishSection';

export default function KadKahwin() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // Logic Scroll untuk Arrow Up
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setIsPlay(true);
    setTimeout(() => { 
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          console.log("Autoplay dicegah oleh browser");
        });
      }
    }, 500);
  };

  if (!mounted) return null;

  return (
    <div className="bg-black text-[#fbf8f4] font-serif relative min-h-screen">
      <audio ref={audioRef} loop src="/rindulukisan.mp3" />

      {/* 1. Entrance Section */}
      <AnimatePresence mode="wait">
        {!isOpen && (
          <div className="fixed inset-0 z-[100]">
            <EntranceSection key="entrance" onOpen={handleOpen} />
          </div>
        )}
      </AnimatePresence>

      {/* 2. Main Content */}
      {isOpen && (
        <main className="relative w-full overflow-x-hidden bg-black">
          
          {/* Hero Section (Full Screen) */}
          <div id="hero" className="relative">
            <HeroSection isOpen={isOpen} />
            
            {/* Soundwave Animasi - Kekal di Hero */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 z-20 pointer-events-none">
              <div className="flex items-end gap-[2px] h-3">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={isPlay ? { height: [2, 10, 2] } : { height: 1 }}
                    transition={{ repeat: Infinity, duration: 0.5 + Math.random() * 0.5 }}
                    className="w-[1.5px] bg-[#a98d32] rounded-full"
                  />
                ))}
              </div>
              <span className="text-[6px] tracking-[0.6em] uppercase text-[#a98d32]">Rindu Lukisan</span>
            </div>
          </div>

          {/* Continuous Sections */}
          <QuoteSection />
          <DetailsSection />
          <LocationSection />
          <RSVPSection />
          <WishSection />

          {/* Floating Player Control - PINDAH KE KANAN */}
          <div className="fixed bottom-8 right-8 z-50">
            <button 
              onClick={() => { 
                if (isPlay) audioRef.current?.pause(); 
                else audioRef.current?.play(); 
                setIsPlay(!isPlay); 
              }} 
              className="w-10 h-10 rounded-full border border-[#fbf8f4]/10 flex items-center justify-center bg-black/40 backdrop-blur-xl text-[#dbc677] shadow-xl"
            >
              {isPlay ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
            </button>
          </div>

          {/* UPDATED FOOTER - #AIMANXADINDA */}
          <footer className="py-24 flex flex-col items-center justify-center bg-black relative overflow-hidden">
            {/* Aesthetic Vertical Line */}
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: 40, opacity: 0.3 }}
              viewport={{ once: false }}
              transition={{ duration: 1 }}
              className="w-[1px] bg-[#a98d32] mb-8"
            />

            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.2em", y: 10 }}
              whileInView={{ opacity: 0.4, letterSpacing: "0.6em", y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-[#dbc677] text-[11px] font-bold text-center"
            >
              #Aiman&Adinda
            </motion.div>
            
            <p className="mt-4 text-[8px] tracking-[0.2em] uppercase text-white/20">
              Terima Kasih
            </p>
          </footer>
        </main>
      )}

      {/* 3. Floating Arrow Up */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.4, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-20 right-8 z-[60] p-2 bg-black/20 rounded-full backdrop-blur-sm"
          >
            <ChevronUp size={24} strokeWidth={1.5} className="text-[#a98d32]" />
          </motion.button>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        html, body { 
          background: black; 
          margin: 0; 
          padding: 0; 
          overflow-x: hidden; 
          height: auto;
          scroll-behavior: smooth;
        } 
        /* Reset any potential margin/padding from sections */
        section { 
          margin: 0 !important;
          padding-top: 5rem;
          padding-bottom: 5rem;
        }
        #hero { padding: 0 !important; }
      `}} />
    </div>
  );
}