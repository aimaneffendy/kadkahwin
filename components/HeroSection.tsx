'use client';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function HeroSection({ isOpen }: { isOpen: boolean }) {
  const premiumShadow = { filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))' };
  
  const fadeInUp = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 1.2, delay, ease: [0.33, 1, 0.68, 1] }
  });

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-black">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundImage: "url('/backgroundmain2.png')",
            backgroundSize: 'cover', 
            backgroundPosition: 'left center', 
            filter: 'brightness(0.55)', 
            transform: 'scale(1.1)', 
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Sparkles Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {isOpen && [...Array(25)].map((_, i) => {
          const startX = 45 + Math.random() * 10; 
          const drift = (Math.random() - 0.5) * 30; 
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: startX + "vw", y: "110vh" }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                y: ["110vh", "-10vh"],
                x: [`${startX}vw`, `${startX + drift}vw`, `${startX - drift}vw`, `${startX}vw`],
              }}
              transition={{ 
                duration: 12 + Math.random() * 8, 
                repeat: Infinity, 
                delay: Math.random() * 5, 
                ease: "linear",
                x: { duration: 5 + Math.random() * 5, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute w-[1.5px] h-[1.5px] bg-[#dbc677] rounded-full"
              style={{ filter: 'drop-shadow(0 0 5px rgba(219, 198, 119, 0.8))' }}
            />
          );
        })}
      </div>

      {/* Content Typography */}
      <div className="z-20 flex flex-col items-center justify-center h-full pt-10 pb-20 space-y-8 md:space-y-12">
        
        {/* 1. THE WEDDING OF - REVERT GOLD */}
        <motion.p 
          {...fadeInUp(0.5)} 
          className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#a98d32] font-bold" 
          style={premiumShadow}
        >
          The Wedding of
        </motion.p>

        {/* 2. NAMA PENGANTIN */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isOpen ? { 
            opacity: 1, 
            scale: [1, 1.03, 1] 
          } : {}}
          transition={{ 
            opacity: { delay: 0.8, duration: 1.5 },
            scale: { 
              delay: 0.8, 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }
          }}
          className="px-4"
        >
          <img 
            src="/nama-pengantin.png" 
            alt="Aiman & Adinda" 
            className="w-[85vw] md:w-[550px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,1)]" 
          />
        </motion.div>

        {/* 3. TARIKH - REVERT GOLD */}
        <motion.div 
          {...fadeInUp(1.2)}
          className="flex items-center justify-center gap-6 md:gap-10 text-3xl md:text-5xl font-light tracking-[0.25em] text-[#dbc677]" 
          style={premiumShadow}
        >
          <span>14</span>
          <div className="w-[1px] h-6 md:h-10 bg-[#dbc677]/40" />
          <span>06</span>
          <div className="w-[1px] h-6 md:h-10 bg-[#dbc677]/40" />
          <span>26</span>
        </motion.div>

        {/* 4. LOKASI - REVERT GOLD */}
        <motion.div 
          {...fadeInUp(1.5)}
          className="space-y-2 tracking-[0.3em] uppercase" 
          style={premiumShadow}
        >
          <p className="text-[12px] md:text-sm font-bold text-[#a98d32]">Rich Asians Hall,</p>
          <p className="text-[10px] md:text-xs opacity-95 italic text-[#dbc677]">Dataran Ecohill, Setia Ecohill</p>
        </motion.div>

        {/* 5. RSVP TEXT - REVERT GOLD */}
        <motion.p 
          {...fadeInUp(1.8)}
          className="text-[11px] italic max-w-[250px] mx-auto leading-relaxed text-[#dbc677] font-medium" 
          style={premiumShadow}
        >
          We kindly request the honor of your <span className="uppercase tracking-[0.2em] text-[10px] border-b border-[#dbc677]/60">Rsvp</span>.
        </motion.p>
      </div>

      {/* 6. SCROLL ICON */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isOpen ? { opacity: 0.4, y: [0, 8, 0] } : {}}
        transition={{ delay: 2.2, duration: 2.5, repeat: Infinity }}
        className="absolute bottom-8 text-[#dbc677]"
      >
        <ChevronDown size={22} strokeWidth={1} />
      </motion.div>
    </section>
  );
}