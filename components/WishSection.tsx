'use client';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, X, Send, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase'; 

// Komponen untuk satu hati terapung
const FloatingHeart = ({ delay, duration, x, y, scale }: { delay: number; duration: number; x: number; y: number; scale: number }) => (
  <motion.div
    className="absolute text-[#dbc677] opacity-0"
    initial={{ opacity: 0, x: `${x}vw`, y: `${y}vh`, scale: 0 }}
    animate={{ 
      opacity: [0, 0.4, 0], // Muncul perlahan dan hilang
      y: [`${y}vh`, `${y - 20}vh`], // Terapung ke atas
      scale: [0, scale, scale * 0.8] 
    }}
    transition={{ 
      duration: duration, 
      delay: delay, 
      repeat: Infinity, // Ulang selama-lamanya
      ease: "easeInOut" 
    }}
  >
    <Heart size={20} fill="#dbc677" /> {/* Hati dengan warna gold fill */}
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

  // Generate data rawak untuk hati terapung (gunakan useMemo supaya tak generate setiap kali render)
  const floatingHeartsData = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 10, // Delay rawak 0-10s
      duration: 10 + Math.random() * 10, // Durasi 10-20s
      x: Math.random() * 100, // Posisi x rawak (0-100vw)
      y: 100 + Math.random() * 20, // Posisi y permulaan rawak (bawah skrin)
      scale: 0.5 + Math.random() * 0.5 // Skala rawak
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

  if (isLoading) return <div className="h-screen w-full bg-[#050505] flex items-center justify-center text-[#a98d32] tracking-[0.5em] uppercase text-[10px]">Loading Registry...</div>;

  return (
    <section className="min-h-screen w-full relative bg-[#050505] overflow-hidden flex flex-col font-serif py-20 px-10">
      
      {/* 1. BACKGROUND IMAGE - Focus Right to show Gold Design */}
      <div className="absolute inset-0 w-full h-full z-0">
        <motion.img 
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          src="/backgroundmain3.webp" 
          className="w-full h-full object-cover object-right grayscale-0"
          alt="Wish Background"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      </div>

      {/* 2. FLOATING GOLD HEARTS - Layered behind content */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {floatingHeartsData.map(heart => (
          <FloatingHeart key={heart.id} {...heart} />
        ))}
      </div>

      {/* 3. MAIN CONTAINER */}
      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col h-full">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[1px] w-10 bg-[#a98d32]" />
            <p className="text-[#a98d32] text-[9px] tracking-[0.6em] uppercase font-bold">Tinta Kasih</p>
          </div>
          <h2 className="text-[#dbc677] text-6xl md:text-8xl font-light leading-[0.85] tracking-tighter uppercase">
            Bingkisan <br />
            <span className="italic font-extralight lowercase opacity-80 text-white">Ucapan.</span>
          </h2>
        </motion.div>

        {/* CAROUSEL CONTENT */}
        <div className="flex flex-col items-center justify-center flex-1">
          {/* Card Height Adjusted to 380px */}
          <div className="relative w-full max-w-sm flex items-center justify-center h-[380px]">
            {wishes.length > 0 ? (
              <AnimatePresence initial={false}>
                {wishes.map((wish, i) => {
                  const isCenter = i === index;
                  const isLeft = i === index - 1;
                  const isRight = i === index + 1;

                  if (!isCenter && !isLeft && !isRight) return null;

                  return (
                    <motion.div
                      key={wish.id}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={onDragEnd}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: isCenter ? 1 : 0,
                        scale: isCenter ? 1 : 0.8,
                        x: isCenter ? 0 : isLeft ? -300 : 300,
                        rotate: isCenter ? 0 : isLeft ? -10 : 10,
                        zIndex: isCenter ? 30 : 10,
                      }}
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                      className="absolute w-full max-w-[320px] h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 p-10 rounded-sm shadow-2xl flex flex-col justify-between cursor-grab active:cursor-grabbing touch-none"
                    >
                      <div className="space-y-4 text-left relative overflow-hidden">
                        <Heart size={14} className="text-[#a98d32]/60" />
                        <p className="text-white/90 text-[16px] md:text-[18px] leading-[1.5] italic font-serif line-clamp-[6] break-words">
                          "{wish.mesej}" 
                        </p>
                        
                        {wish.mesej.length > 80 && (
                          <button 
                            onClick={() => setSelectedWish(wish)}
                            className="text-[#dbc677] text-[10px] tracking-[0.2em] uppercase font-bold border-b border-[#dbc677]/30 pb-0.5 inline-block"
                          >
                            Baca Penuh
                          </button>
                        )}
                      </div>

                      <div className="border-t border-white/10 pt-6">
                        <p className="text-[#dbc677] text-[13px] md:text-[14px] font-black tracking-[0.5em] uppercase leading-tight">
                          {wish.nama}
                        </p>
                        <p className="text-white/30 text-[9px] tracking-[0.3em] uppercase mt-2 font-medium">
                          Tetamu Undangan
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            ) : (
              <p className="text-white/20 text-[10px] tracking-widest uppercase italic">Empty Registry...</p>
            )}
          </div>

          {/* Navigation Controls - Margin Reduced to mt-2 for closer proximity */}
          <div className="flex flex-col items-center gap-4 mt-2">
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
        </div>

        {/* Floating Action Button */}
        <div className="mt-8 flex justify-center">
          <button 
            onClick={() => setIsFormOpen(true)} 
            className="flex items-center gap-4 px-12 py-4 bg-[#dbc677] hover:bg-[#a98d32] transition-all shadow-2xl active:scale-[0.98]"
          >
            <Edit3 size={14} className="text-black" />
            <span className="text-black text-[11px] font-black tracking-[0.3em] uppercase">Titipkan Ucapan</span>
          </button>
        </div>
      </div>

      {/* MODAL POPUP: BACA FULL UCAPAN */}
      <AnimatePresence>
        {selectedWish && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-md flex items-center justify-center px-8"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-[#0f0f0f] border border-[#a98d32]/30 p-10 rounded-sm relative"
            >
              <button onClick={() => setSelectedWish(null)} className="absolute top-6 right-6 text-white/30 hover:text-white">
                <X size={24} />
              </button>
              <Heart size={20} className="text-[#a98d32]/40 mb-6" />
              <div className="max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar">
                <p className="text-white/90 font-serif text-xl md:text-2xl leading-relaxed italic break-words italic">
                  "{selectedWish.mesej}"
                </p>
              </div>
              <div className="border-t border-[#a98d32]/10 mt-8 pt-6">
                <p className="text-[#dbc677] text-[15px] font-black tracking-[0.5em] uppercase">{selectedWish.nama}</p>
                <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mt-2 font-medium">Tetamu Undangan</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL: TULIS UCAPAN */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/98 backdrop-blur-xl flex items-center justify-center px-8"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 30 }}
              className="w-full max-w-md bg-[#0f0f0f] border border-[#a98d32]/20 p-12 rounded-sm relative"
            >
              <button onClick={() => setIsFormOpen(false)} className="absolute top-8 right-8 text-white/30 hover:text-white">
                <X size={24} />
              </button>
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