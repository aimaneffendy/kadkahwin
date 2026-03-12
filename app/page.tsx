'use client';
import { useState, useRef, useEffect, useMemo } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
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

  // --- LOGIK PROGRESS BAR ---
  const { scrollY, scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const barOpacity = useTransform(scrollY, [0, 400], [0, 1]);

  useEffect(() => { setMounted(true); }, []);

  // --- LOGIK MUZIK ---
  useEffect(() => {
    const handleMusicToggle = (e: any) => {
      const shouldPlay = e.detail.play;
      if (audioRef.current) {
        if (shouldPlay) {
          audioRef.current.play().catch(() => {});
          setIsPlay(true);
        } else {
          audioRef.current.pause();
          setIsPlay(false);
        }
      }
    };
    window.addEventListener('toggleMusic', handleMusicToggle);
    return () => window.removeEventListener('toggleMusic', handleMusicToggle);
  }, []);

  // --- LOGIK SCROLL TOP ---
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
        audioRef.current.play().catch(() => {});
      }
    }, 500);
  };

  if (!mounted) return null;

  return (
    <div className="bg-black text-[#fbf8f4] font-serif relative min-h-screen">
      <audio ref={audioRef} loop src="/rindulukisan.mp3" />

      <AnimatePresence mode="wait">
        {!isOpen && (
          <div className="fixed inset-0 z-[100]">
            <EntranceSection key="entrance" onOpen={handleOpen} />
          </div>
        )}
      </AnimatePresence>

      {isOpen && (
        <>
          {/* PROGRESS BAR */}
          <motion.div 
            style={{ opacity: barOpacity }} 
            className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-[9999] flex flex-col items-center pointer-events-none"
          >
            <div className="h-[150px] w-[1px] bg-white/10 relative overflow-hidden rounded-full">
              <motion.div 
                className="absolute top-0 left-0 w-full bg-[#dbc677] origin-top shadow-[0_0_8px_rgba(219,198,119,0.5)]"
                style={{ scaleY, height: '100%' }}
              />
            </div>
          </motion.div>

          <main className="relative w-full overflow-x-hidden bg-black">
            <div id="hero" className="relative">
              <HeroSection isOpen={isOpen} />
              
              {/* MUSIC VISUALIZER HINT */}
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

            <QuoteSection />
            <DetailsSection />
            <LocationSection />
            <RSVPSection />
            <WishSection />

            {/* FLOATING MUSIC CONTROL */}
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

            {/* --- UPDATED FOOTER WITH FLOWER ANIMATION --- */}
            <footer className="py-32 flex flex-col items-center justify-center bg-black relative overflow-hidden">

              {/* Thank You Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center px-10 space-y-4"
              >
                <h3 className="text-[#dbc677] text-2xl md:text-3xl font-light italic tracking-wide">
                  Terima Kasih
                </h3>
                <p className="max-w-xs mx-auto text-white/90 text-[10px] md:text-xs leading-relaxed tracking-[0.2em] uppercase font-light">
                  Kehadiran serta doa restu kalian amatlah kami hargai dalam meraikan hari bahagia ini.
                </p>
              </motion.div>

              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 40, opacity: 0.2 }}
                transition={{ duration: 1 }}
                className="h-[1px] bg-[#a98d32] my-10"
              />

              {/* Hashtag & Credits */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.5 }}
                transition={{ duration: 1.5 }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-[#dbc677] text-[10px] font-bold tracking-[0.6em] uppercase">
                  #Aiman&Adinda
                </span>
                <span className="text-white/40 text-[10px] tracking-[0.1em] uppercase">
                  14.06.26
                </span>
              </motion.div>

              {/* Subtle Dust Rising at Footer */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-[#dbc677] rounded-full blur-[1px]"
                    animate={{ 
                      y: [0, -80], 
                      opacity: [0, 0.5, 0] 
                    }}
                    transition={{ 
                      duration: 3 + Math.random() * 2, 
                      repeat: Infinity, 
                      delay: i * 0.5 
                    }}
                    style={{ 
                      left: `${15 + (i * 15)}%`, 
                      bottom: '5%' 
                    }}
                  />
                ))}
              </div>
            </footer>
          </main>
        </>
      )}

      {/* SCROLL TO TOP BUTTON */}
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

      {/* GLOBAL STYLES */}
      <style dangerouslySetInnerHTML={{ __html: `
        html, body { 
          background: black; 
          margin: 0; 
          padding: 0; 
          overflow-x: hidden; 
          height: auto;
          scroll-behavior: smooth;
          -ms-overflow-style: none;
          scrollbar-width: none;
        } 
        html::-webkit-scrollbar, body::-webkit-scrollbar {
          display: none;
        }
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