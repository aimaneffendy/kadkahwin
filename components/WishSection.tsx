'use client';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, X, Send, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase'; 

// 1. KOMPONEN HATI TERAPUNG
const FloatingHeart = ({ delay, duration, x, y, scale }: { delay: number; duration: number; x: number; y: number; scale: number }) => (
  <motion.div
    className="absolute text-[#dbc677] pointer-events-none"
    style={{ left: `${x}vw`, zIndex: 5 }}
    initial={{ opacity: 0, y: `${y}vh`, scale: 0 }}
    animate={{ 
      opacity: [0, 0.4, 0.4, 0], 
      y: [`${y}vh`, `${y - 80}vh`], 
      scale: [0, scale, scale, 0] 
    }}
    transition={{ 
      duration: duration, 
      delay: delay, 
      repeat: Infinity, 
      ease: "linear",
      times: [0, 0.05, 0.8, 1]
    }}
  >
    <Heart size={20} fill="#dbc677" />
  </motion.div>
);

export default function WishSection() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedWish, setSelectedWish] = useState<any>(null);
  const [index, setIndex] = useState(0);
  const [wishes, setWishes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [nama, setNama] = useState('');
  const [mesej, setMesej] = useState(''); 
  const [isSending, setIsSending] = useState(false);

  const floatingHeartsData = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 10,
      duration: 6 + Math.random() * 6,
      x: Math.random() * 95,
      y: 110,
      scale: 0.4 + Math.random() * 0.4 
    }));
  }, []);

  const fetchWishes = async () => {
    const { data, error } = await supabase
      .from('ucapan') 
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setWishes(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const nextStep = () => { if (index < wishes.length - 1) setIndex(index + 1); };
  const prevStep = () => { if (index > 0) setIndex(index - 1); };

  const onDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) nextStep();
    else if (info.offset.x > swipeThreshold) prevStep();
  };

  const handleSubmit = async () => {
    if (!nama || !mesej) return;
    setIsSending(true);
    const { error } = await supabase.from('ucapan').insert([{ nama, mesej }]); 

    if (!error) {
      setNama(''); setMesej(''); setIsFormOpen(false);
      fetchWishes(); 
      setIndex(0);
    }
    setIsSending(false);
  };

  if (isLoading) return <div className="h-screen w-full bg-black flex items-center justify-center text-[#dbc677] tracking-[0.5em] uppercase text-[10px]">Loading Registry...</div>;

  return (
    /* FIX: Buang py-24 px-6 dari sini untuk tutup gap */
    <section className="min-h-screen w-full relative bg-black overflow-hidden flex flex-col font-serif">
      
      {/* BACKGROUND IMAGE - FULL BLEED */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <img 
          src="/backgroundmain3.webp" 
          className="w-full h-full object-cover object-right opacity-40"
          alt="Wish Background"
        />
        {/* FIX: Gradient diperkemas untuk blend dengan section RSVP (atas) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black" />
      </div>

      {/* LOVE TERAPUNG */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
        {floatingHeartsData.map(heart => (
          <FloatingHeart key={heart.id} {...heart} />
        ))}
      </div>

      {/* CONTENT WRAPPER - Letak padding kat sini (py-32 px-10) */}
      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col h-full py-32 px-10">
        
        {/* HEADER TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.span 
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-[1px] bg-[#a98d32]" 
            />
            <p className="text-[#a98d32] text-[9px] tracking-[0.6em] uppercase font-bold">Tinta Kasih</p>
          </div>
          <h2 className="text-[#dbc677] text-6xl md:text-8xl font-light leading-[0.85] tracking-tighter uppercase">
            Bingkisan <br />
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.8 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.5 }}
              className="italic font-extralight lowercase text-white"
            >
              ucapan.
            </motion.span>
          </h2>
        </motion.div>

        {/* CAROUSEL CONTENT */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center justify-center flex-1"
        >
          <div className="relative w-full max-w-sm flex items-center justify-center h-[400px]">
            {wishes.length > 0 ? (
              <AnimatePresence initial={false} mode="wait">
                {wishes.map((wish, i) => {
                  if (i !== index) return null;
                  return (
                    <motion.div
                      key={wish.id}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={onDragEnd}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="absolute w-full max-w-[320px] h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 p-10 rounded-sm shadow-2xl flex flex-col justify-between cursor-grab active:cursor-grabbing touch-none"
                    >
                      <div className="space-y-4 text-left">
                        <Heart size={14} className="text-[#a98d32]/60" />
                        <p className="text-white/90 text-[16px] md:text-[18px] leading-[1.5] italic font-serif line-clamp-[7] break-words">
                          "{wish.mesej}" 
                        </p>
                        
                        {wish.mesej.length > 120 && (
                          <button onClick={() => setSelectedWish(wish)} className="text-[#dbc677] text-[10px] tracking-[0.2em] uppercase font-bold border-b border-[#dbc677]/30 pb-0.5 inline-block">
                            Baca Penuh
                          </button>
                        )}
                      </div>

                      <div className="border-t border-white/10 pt-6">
                        <p className="text-[#dbc677] text-[13px] md:text-[14px] font-black tracking-[0.5em] uppercase leading-tight line-clamp-1">{wish.nama}</p>
                        <p className="text-white/30 text-[9px] tracking-[0.3em] uppercase mt-2 font-medium">Tetamu Undangan</p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            ) : (
              <p className="text-white/20 text-[10px] tracking-widest uppercase italic text-center">Belum ada ucapan...</p>
            )}
          </div>

          <div className="flex flex-col items-center gap-4 mt-8">
            <div className="flex items-center gap-8">
              <button onClick={prevStep} className="p-2 text-[#a98d32]/40 hover:text-[#a98d32] transition-colors">
                <ChevronLeft size={18} />
              </button>
              <div className="text-[#a98d32] font-sans text-[10px] tracking-[0.5em] font-bold">
                {index + 1} / {wishes.length}
              </div>
              <button onClick={nextStep} className="p-2 text-[#a98d32]/40 hover:text-[#a98d32] transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* BUTTON TITIP UCAPAN */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex justify-center pb-12"
        >
          <button 
            onClick={() => setIsFormOpen(true)} 
            className="flex items-center gap-4 px-12 py-4 bg-[#dbc677] hover:bg-[#a98d32] transition-all shadow-2xl active:scale-[0.98]"
          >
            <Edit3 size={14} className="text-black" />
            <span className="text-black text-[11px] font-black tracking-[0.3em] uppercase">Titipkan Ucapan</span>
          </button>
        </motion.div>
      </div>

      {/* MODAL POPUP & FORM */}
      <AnimatePresence>
        {selectedWish && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-md flex items-center justify-center px-8">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="w-full max-w-lg bg-[#0f0f0f] border border-[#a98d32]/30 p-10 rounded-sm relative">
              <button onClick={() => setSelectedWish(null)} className="absolute top-6 right-6 text-white/30 hover:text-white"><X size={24} /></button>
              <Heart size={20} className="text-[#a98d32]/40 mb-6" />
              <div className="max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar">
                <p className="text-white/90 font-serif text-xl md:text-2xl leading-relaxed italic break-words">"{selectedWish.mesej}"</p>
              </div>
              <div className="border-t border-[#a98d32]/10 mt-8 pt-6">
                <p className="text-[#dbc677] text-[15px] font-black tracking-[0.5em] uppercase">{selectedWish.nama}</p>
                <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mt-2 font-medium">Tetamu Undangan</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] bg-black/98 backdrop-blur-xl flex items-center justify-center px-8">
            <motion.div initial={{ scale: 0.95, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 30 }} className="w-full max-w-md bg-[#0f0f0f] border border-[#a98d32]/20 p-8 md:p-12 rounded-sm relative">
              <button onClick={() => setIsFormOpen(false)} className="absolute top-8 right-8 text-white/30 hover:text-white"><X size={24} /></button>
              <div className="mb-12">
                <p className="text-[#a98d32] text-[9px] tracking-[0.4em] uppercase font-bold mb-2">Message</p>
                <h3 className="text-[#dbc677] font-serif text-5xl leading-none uppercase tracking-tighter">Bingkisan <br/><span className="italic font-light lowercase text-white/90">ucapan.</span></h3>
              </div>
              <div className="space-y-10">
                <input value={nama} onChange={(e) => setNama(e.target.value)} type="text" className="w-full bg-transparent border-b border-white/10 py-4 text-sm text-white focus:outline-none focus:border-[#dbc677] transition-all uppercase tracking-widest placeholder:text-white/5" placeholder="NAMA ANDA" />
                <textarea value={mesej} onChange={(e) => setMesej(e.target.value)} rows={4} className="w-full bg-transparent border-b border-white/10 py-4 text-sm text-white focus:outline-none focus:border-[#dbc677] resize-none transition-all placeholder:text-white/5" placeholder="TITIPKAN UCAPAN..." />
                <button onClick={handleSubmit} disabled={isSending || !nama || !mesej} className="w-full h-14 bg-[#dbc677] flex items-center justify-center gap-4 group disabled:opacity-20 transition-all shadow-xl">
                  <span className="text-black text-[11px] font-black tracking-[0.4em] uppercase">{isSending ? 'Sedang Menghantar...' : 'Hantar Ucapan'}</span>
                  <Send size={14} className="text-black group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #a98d3240; border-radius: 10px; }
      `}</style>
    </section>
  );
}