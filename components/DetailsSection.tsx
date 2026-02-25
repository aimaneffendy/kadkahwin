'use client';
import { motion } from 'framer-motion';

export default function DetailsSection() {
  const fadeInUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { 
    duration: 0.8, 
    delay, 
    // Tambah 'as any' di hujung array ease
    ease: [0.33, 1, 0.68, 1] as any 
  }
});

  return (
    <section className="snap-start h-screen w-full bg-[#050505] relative flex flex-col items-center justify-center px-8 text-center overflow-hidden">
      
      {/* 1. DYNAMIC BACKGROUND (Elemen yang bagi "hidup") */}
      {/* Cahaya Emas Utama */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#a98d32]/10 blur-[120px] rounded-full pointer-events-none" 
      />

      {/* Floating Bokeh 1 */}
      <motion.div 
        animate={{ 
          y: [0, -40, 0],
          x: [0, 20, 0],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[10%] w-32 h-32 bg-[#a98d32]/20 blur-[60px] rounded-full"
      />

      {/* Floating Bokeh 2 */}
      <motion.div 
        animate={{ 
          y: [0, 40, 0],
          x: [0, -20, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[20%] left-[10%] w-48 h-48 bg-[#a98d32]/15 blur-[80px] rounded-full"
      />

      {/* 2. MAIN CONTENT */}
      <div className="z-10 w-full max-w-sm flex flex-col items-center">
        
        {/* BISMILLAH & SALAM */}
        <motion.div {...fadeInUp(0.1)} className="mb-6 space-y-3">
          <h2 className="text-[#fbf8f4] text-lg font-serif opacity-70 tracking-[0.3em] italic">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </h2>
          <p className="text-[#a98d32]/60 text-[9px] tracking-[0.5em] uppercase font-light">Assalammualaikum W.B.T</p>
        </motion.div>

        {/* TUAN RUMAH (MAK AYAH) */}
        <motion.div {...fadeInUp(0.3)} className="mb-8">
          <div className="space-y-1">
            <h3 className="text-[#d4b054] text-[15px] tracking-[0.15em] uppercase font-medium">Noor Effendy Bin Mohd Nor</h3>
            <p className="text-[#a98d32]/40 text-xs font-serif italic">&</p>
            <h3 className="text-[#d4b054] text-[15px] tracking-[0.15em] uppercase font-medium">Raba'iah Binti Kodri</h3>
          </div>
          <p className="text-[#fbf8f4]/50 text-[11px] font-light leading-relaxed max-w-[260px] mx-auto mt-6 italic font-serif">
            Dengan penuh kesyukuran ke hadrat Ilahi, kami menjemput Tuan/Puan ke majlis walimatulurus putera kami:
          </p>
        </motion.div>

        {/* NAMA PENGANTIN (Hero Elements) */}
        <motion.div {...fadeInUp(0.5)} className="w-full space-y-4 py-2">
          <div className="space-y-1 group">
            <h4 className="text-[#fbf8f4] text-3xl font-serif italic tracking-wide group-hover:text-[#d4b054] transition-colors duration-700">
              Muhammad Aiman
            </h4>
            <p className="text-[#a98d32]/40 text-[11px] font-serif italic">Bin Noor Effendy</p>
          </div>

          <div className="flex items-center justify-center gap-5">
            <div className="h-[0.5px] w-12 bg-gradient-to-r from-transparent to-[#a98d32]/40" />
            <span className="text-[#a98d32]/50 text-[10px] tracking-[0.4em] uppercase italic font-light">dengan</span>
            <div className="h-[0.5px] w-12 bg-gradient-to-l from-transparent to-[#a98d32]/40" />
          </div>

          <div className="space-y-1 group">
            <h4 className="text-[#fbf8f4] text-3xl font-serif italic tracking-wide group-hover:text-[#d4b054] transition-colors duration-700">
              Adinda Fazliana
            </h4>
            <p className="text-[#a98d32]/40 text-[11px] font-serif italic">Binti Ramlie</p>
          </div>
        </motion.div>

        {/* PENUTUP */}
        <motion.div {...fadeInUp(0.7)} className="mt-12 pt-8 w-3/4 relative">
          {/* Divider Line yang halus */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[0.5px] w-16 bg-gradient-to-r from-transparent via-[#a98d32]/40 to-transparent" />
          
          <p className="text-[#a98d32]/40 text-[9px] tracking-[0.4em] uppercase italic leading-loose">
            Semoga kehadiran kalian <br /> menambah seri majlis kami
          </p>
        </motion.div>

      </div>

      {/* 3. FINAL TOUCH: VIGNETTE & GRAIN */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.8)]" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] pointer-events-none" />
      
    </section>
  );
}