'use client';
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Pause, Play } from 'lucide-react';

import EntranceSection from '../components/EntranceSection';
import HeroSection from '../components/HeroSection';
import QuoteSection from '../components/QuoteSection';
import DetailsSection from '../components/DetailsSection';
import LocationSection from '../components/LocationSection';
import RSVPSection from '../components/RSVPSection'; // 1. IMPORT RSVP
import WishSection from '../components/WishSection';

export default function KadKahwin() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setIsPlay(true);
    setTimeout(() => { audioRef.current?.play().catch(() => {}); }, 200);
  };

  if (!mounted) return null;

  return (
    <div className={`bg-black text-[#fbf8f4] font-serif relative ${isOpen ? 'h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth' : 'h-screen overflow-hidden'}`} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <audio ref={audioRef} loop src="/lagu.mp3" />

      <AnimatePresence mode="wait">
        {!isOpen && <EntranceSection key="entrance" onOpen={handleOpen} />}
      </AnimatePresence>

      <main className="relative">
        {/* Page 1 */}
        <div className="snap-start h-screen w-full shrink-0">
          <HeroSection isOpen={isOpen} />
        </div>
        
        {/* Page 2 */}
        <div className="snap-start h-screen w-full shrink-0">
          <QuoteSection />
        </div>

        {/* Page 3 */}
        <div className="snap-start h-screen w-full shrink-0">
          <DetailsSection />
        </div>

        {/* Page 4 */}
        <div className="snap-start h-screen w-full shrink-0">
          <LocationSection />
        </div>

        {/* Page 5: RSVP (GANTIKAN PLACEHOLDER TADI) */}
        <div className="snap-start h-screen w-full shrink-0">
          <RSVPSection />
        </div>
    

      {/* Page 6: WISH SECTION (BARU TAMBAH) */}
        <div className="snap-start h-screen w-full shrink-0">
          <WishSection />
        </div>
      </main>

      {/* Floating Audio Button */}
      {isOpen && (
        <button 
          onClick={() => { isPlay ? audioRef.current?.pause() : audioRef.current?.play(); setIsPlay(!isPlay); }} 
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full border border-[#fbf8f4]/10 flex items-center justify-center bg-black/40 backdrop-blur-xl text-[#dbc677] shadow-xl"
        >
          {isPlay ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
        </button>
      )}

      <style dangerouslySetInnerHTML={{ __html: `::-webkit-scrollbar { display: none; } html, body { background: black; margin: 0; padding: 0; } @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap'); .font-script { font-family: 'Great Vibes', cursive; } `}} />
    </div>
  );
}