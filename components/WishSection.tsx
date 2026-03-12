'use client';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, X, Send, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase'; 

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
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 20, // Tambah delay supaya tak keluar serentak
      duration: 15 + Math.random() * 10, // Slowkan: antara 15s hingga 25s
      x: Math.random() * 95,
      y: 110,
      scale: 0.3 + Math.random() * 0.4 // Kecilkan sikit scale untuk nampak lebih halus
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
    <section className="min-h-screen w-full relative bg-black overflow-hidden flex flex-col font-serif">
      
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <img src="/backgroundmain3.webp" className="w-full h-full object-cover object-right opacity-90" alt="Wish Background" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black" />
      </div>

      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
        {floatingHeartsData.map(heart => (
          <FloatingHeart key={heart.id} {...heart} />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col h-full py-32 overflow-hidden">
        
        {/* HEADER */}
        <div className="px-10 mb-14">
          <div className="flex items-center gap-3 mb-4">
            <motion.span initial={{ width: 0 }} whileInView={{ width: 40 }} transition={{ duration: 0.8 }} className="h-[1px] bg-[#a98d32]" />
            <p className="text-[#a98d32] text-[9px] tracking-[0.6em] uppercase font-bold">Tinta Kasih</p>
          </div>
          <h2 className="text-[#dbc677] text-6xl md:text-8xl font-light leading-[0.85] tracking-tighter uppercase">
            Bingkisan <br />
            <span className="italic font-extralight lowercase text-white">ucapan.</span>
          </h2>
        </div>

        {/* STACKED CAROUSEL - SPREAD STYLE */}
        <div className="relative flex-1 flex items-center justify-center">
          <div className="relative w-full h-[400px] flex items-center justify-center">
            {wishes.map((wish, i) => {
              // Logik kedudukan: -1 (kiri), 0 (tengah), 1 (kanan)
              const offset = i - index;
              
              // Hanya render kad yang berdekatan untuk performance
              if (Math.abs(offset) > 2) return null;

              return (
                <motion.div
                  key={wish.id}
                  drag={offset === 0 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={onDragEnd}
                  initial={false}
                  animate={{
                    x: offset * 280, // Jarak antara kad
                    scale: offset === 0 ? 1 : 0.8,
                    opacity: offset === 0 ? 1 : 0.4,
                    zIndex: 10 - Math.abs(offset),
                    rotateY: offset * 15, // Efek 3D sikit
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 25 }}
                  className="absolute w-full max-w-[300px] h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 p-10 rounded-sm shadow-2xl flex flex-col justify-between cursor-grab active:cursor-grabbing touch-none"
                  style={{ perspective: "1000px" }}
                >
                  <div className="space-y-4 text-left">
                    <Heart size={14} className="text-[#a98d32]/60" />
                    <p className="text-white/90 text-[15px] leading-[1.6] italic font-serif line-clamp-[8] break-words">
                      "{wish.mesej}" 
                    </p>
                    {wish.mesej.length > 100 && offset === 0 && (
                      <button onClick={() => setSelectedWish(wish)} className="text-[#dbc677] text-[10px] tracking-[0.2em] uppercase font-bold border-b border-[#dbc677]/30 pb-0.5">
                        Baca Penuh
                      </button>
                    )}
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <p className="text-[#dbc677] text-[13px] font-black tracking-[0.4em] uppercase leading-tight break-words">
                      {wish.nama}
                    </p>
                    <p className="text-white/30 text-[9px] tracking-[0.3em] uppercase mt-1">Tetamu Undangan</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* NAVIGATION & BUTTON */}
        <div className="flex flex-col items-center mt-12 px-10">
          <div className="flex items-center gap-8 mb-8">
            <button onClick={prevStep} disabled={index === 0} className="p-2 text-[#a98d32]/40 hover:text-[#a98d32] disabled:opacity-5 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <div className="text-[#a98d32] font-sans text-[10px] tracking-[0.5em] font-bold">
              {index + 1} / {wishes.length}
            </div>
            <button onClick={nextStep} disabled={index === wishes.length - 1} className="p-2 text-[#a98d32]/40 hover:text-[#a98d32] disabled:opacity-5 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>

          <button 
            onClick={() => setIsFormOpen(true)} 
            className="flex items-center gap-4 px-12 py-4 bg-[#dbc677] hover:bg-[#a98d32] transition-all shadow-2xl active:scale-[0.98]"
          >
            <Edit3 size={14} className="text-black" />
            <span className="text-black text-[11px] font-black tracking-[0.3em] uppercase">Titipkan Ucapan</span>
          </button>
        </div>
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
                <p className="text-[#dbc677] text-[15px] font-black tracking-[0.5em] uppercase leading-snug break-words">{selectedWish.nama}</p>
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
                <input value={nama} onChange={(e) => setNama(e.target.value)} type="text" className="w-full bg-transparent border-b border-white/10 py-4 text-sm text-white focus:outline-none focus:border-[#ffffff] transition-all uppercase tracking-widest placeholder:text-white/60" placeholder="NAMA ANDA" />
                <textarea value={mesej} onChange={(e) => setMesej(e.target.value)} rows={4} className="w-full bg-transparent border-b border-white/10 py-4 text-sm text-white focus:outline-none focus:border-[#ffffff] resize-none transition-all placeholder:text-white/60" placeholder="TITIPKAN UCAPAN..." />
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