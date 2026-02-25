'use client';
import { motion } from 'framer-motion';

export default function QuoteSection() {
  const premiumShadow = { filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))' };

  return (
    <section className="snap-start h-screen w-full bg-[#050505] relative flex items-center justify-center px-8 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] bg-[#a98d32]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-2xl w-full text-center z-10 space-y-12">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.4 }} transition={{ duration: 1.5 }} className="flex justify-center items-center gap-4">
          <div className="h-[0.5px] w-12 bg-[#fbf8f4]/20" />
          <span className="text-[#a98d32] text-xl">✨</span>
          <div className="h-[0.5px] w-12 bg-[#fbf8f4]/20" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.3 }} className="space-y-6">
          {/* Teks Putih -> #fbf8f4 */}
          <p className="text-[#fbf8f4]/90 text-lg md:text-xl italic font-light leading-relaxed tracking-wide" style={premiumShadow}>
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang."
          </p>
          <p className="text-[#a98d32] text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold opacity-80">
            — Surah Ar-Rum: 21 —
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2, delay: 1 }} className="pt-8 border-t border-[#fbf8f4]/5">
          {/* Teks Putih -> #fbf8f4 */}
          <p className="text-[#fbf8f4]/40 text-[11px] md:text-sm leading-loose tracking-widest uppercase">
            Semoga ikatan ini diberkati Allah SWT <br /> 
            dan kekal hingga ke Jannah.
          </p>
        </motion.div>
      </div>
    </section>
  );
}