'use client';
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Sembunyikan player bila skrol lebih 500px (dah keluar Hero)
      setShowPlayer(window.scrollY < 500);
      // Tunjuk arrow Go Up bila dah skrol bawah
      setShowScrollTop(window.scrollY > 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <audio ref={audioRef} loop src="/music/lagu-kahwin.mp3" />

      {/* 1. FLOATING PLAYER (Hanya di Hero) */}
      <AnimatePresence>
        {showPlayer && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed top-6 right-6 z-[60]"
          >
            <button 
              onClick={togglePlay}
              className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white shadow-xl"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. GO UP ARROW (Hanya muncul kat bawah) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-10 right-6 z-[60] w-10 h-10 bg-[#a98d32] text-white rounded-full flex items-center justify-center shadow-2xl"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 3. SOUNDWAVE (Letak kat Footer/Bawah Sekali) */}
      <div className="w-full flex justify-center items-center gap-1 py-10 opacity-30">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={isPlaying ? { 
              height: [10, 30, 15, 25, 10],
            } : { height: 4 }}
            transition={{ 
              repeat: Infinity, 
              duration: 0.5 + Math.random(),
              ease: "easeInOut"
            } as any}
            className="w-1 bg-[#a98d32] rounded-full"
          />
        ))}
      </div>
    </>
  );
}