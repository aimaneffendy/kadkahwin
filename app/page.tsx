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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // Logic Scroll untuk Arrow Up
  useEffect(() => {
    const handleScroll = (e: any) => {
      const scrollY = e.target.scrollTop;
      setShowScrollTop(scrollY > 400);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsPlay(true);
    setTimeout(() => { audioRef.current?.play().catch(() => {}); }, 200);
  };

  if (!mounted) return null;

  return (
    <div 
      ref={containerRef}
      className={`bg-black text-[#fbf8f4] font-serif relative ${isOpen ? 'h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth' : 'h-screen overflow-hidden'}`} 
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <audio ref={audioRef} loop src="/rindulukisan.mp3" />

      <AnimatePresence mode="wait">
        {!isOpen && <EntranceSection key="entrance" onOpen={handleOpen} />}
      </AnimatePresence>

      <main className="relative">
        {/* Page 1: HERO */}
        <div className="snap-start h-screen w-full shrink-0 relative flex flex-col items-center justify-center">
          <HeroSection isOpen={isOpen} />
          
          {/* Soundwave (Text dah tak ada kat sini sebab dah masuk HeroSection) */}
          <div className="absolute bottom-20 flex flex-col items-center gap-2 opacity-40 z-20 pointer-events-none">
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

          {/* Player: Hero Only */}
          {isOpen && (
            <div className="absolute bottom-8 right-8 z-50">
              <button 
                onClick={() => { isPlay ? audioRef.current?.pause() : audioRef.current?.play(); setIsPlay(!isPlay); }} 
                className="w-10 h-10 rounded-full border border-[#fbf8f4]/10 flex items-center justify-center bg-black/40 backdrop-blur-xl text-[#dbc677] shadow-xl"
              >
                {isPlay ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
              </button>
            </div>
          )}
        </div>
        
        {/* Section Lain */}
        <div className="snap-start h-screen w-full shrink-0 overflow-hidden"><QuoteSection /></div>
        <div className="snap-start h-screen w-full shrink-0 overflow-hidden"><DetailsSection /></div>
        <div className="snap-start h-screen w-full shrink-0 overflow-hidden"><LocationSection /></div>
        <div className="snap-start h-screen w-full shrink-0 overflow-hidden"><RSVPSection /></div>
        
        {/* Page Wishes: Tambah ID & Ensure Visibility */}
        <div id="wishes" className="snap-start min-h-screen w-full shrink-0 relative">
          <WishSection />
        </div>
      </main>

      {/* Floating Arrow Up */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.4, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1 }}
            onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-10 right-10 z-[60] p-2"
          >
            <ChevronUp size={24} strokeWidth={1.5} className="text-[#a98d32]" />
          </motion.button>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar { display: none; } 
        html, body { background: black; margin: 0; padding: 0; overflow: hidden; } 
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap'); 
        .font-script { font-family: 'Great Vibes', cursive; }
        .snap-start { scroll-snap-align: start; scroll-snap-stop: always; }
      `}} />
    </div>
  );
}