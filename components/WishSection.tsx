'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Loader2, X, Heart, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const THEMES = [
  { bg: 'bg-[#e2d1c3]', text: 'text-[#5d4d42]', tape: 'bg-white/30', border: 'border-[#5d4d42]/10' },
  { bg: 'bg-[#d4e2d4]', text: 'text-[#3e4a3e]', tape: 'bg-white/30', border: 'border-[#3e4a3e]/10' },
  { bg: 'bg-[#e1d5e2]', text: 'text-[#4a3e4a]', tape: 'bg-white/30', border: 'border-[#4a3e4a]/10' },
  { bg: 'bg-[#f7e1ad]', text: 'text-[#5d4d2e]', tape: 'bg-white/40', border: 'border-[#5d4d2e]/10' },
  { bg: 'bg-[#d1e8ed]', text: 'text-[#2e4a4d]', tape: 'bg-white/30', border: 'border-[#2e4a4d]/10' },
];

export default function WishSection() {
  const [wishes, setWishes] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState(THEMES[0]);
  const [selectedWish, setSelectedWish] = useState<any>(null);
  const [form, setForm] = useState({ nama: '', mesej: '' });
  const [loading, setLoading] = useState(false);

  const fetchWishes = async () => {
    const { data, error } = await supabase.from('ucapan').select('*').order('created_at', { ascending: false });
    if (!error && data) setWishes(data);
  };

  useEffect(() => { fetchWishes(); }, []);

  const openWriteModal = () => {
    setActiveTheme(THEMES[Math.floor(Math.random() * THEMES.length)]);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama || !form.mesej) return;
    setLoading(true);
    const { error } = await supabase.from('ucapan').insert([form]);
    if (!error) {
      setForm({ nama: '', mesej: '' });
      setIsModalOpen(false);
      fetchWishes();
    }
    setLoading(false);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ms-MY', { day: 'numeric', month: 'short' });
  };

  return (
    <section className="h-full w-full relative bg-[#050505] flex flex-col overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
      
      <div className="z-10 flex flex-col h-full pt-20">
        {/* HEADER */}
        <div className="px-10 mb-10 shrink-0 text-left">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 mb-3">
            <div className="h-[1px] w-6 bg-[#a98d32]" />
            <span className="text-[#a98d32] text-[8px] tracking-[0.6em] font-bold uppercase">The Love Wall</span>
          </motion.div>
          <h2 className="text-[#fbf8f4] text-5xl font-serif italic leading-[0.8] tracking-tighter">Wishes.</h2>
        </div>

        {/* STICKY NOTES GRID */}
        <div className="flex-1 overflow-y-auto px-6 pb-44 no-scrollbar scroll-smooth">
          <div className="grid grid-cols-2 gap-x-5 gap-y-10">
            <AnimatePresence mode="popLayout">
              {wishes.map((w, i) => {
                const mood = THEMES[i % THEMES.length];
                const baseRotate = (i % 2 === 0 ? 1 : -1) * (i % 4 + 1);

                return (
                  <motion.div 
                    key={w.id} 
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }}
                    // EFEK JIGGLE BILA TOUCH/HOVER
                    whileHover={{ 
                      rotate: [baseRotate, baseRotate - 2, baseRotate + 2, baseRotate - 2, baseRotate],
                      scale: 1.05,
                      transition: { duration: 0.4 } 
                    }}
                    whileTap={{ 
                      rotate: [baseRotate - 4, baseRotate + 4, baseRotate - 4, baseRotate],
                      scale: 0.95 
                    }}
                    onClick={() => setSelectedWish({ ...w, mood })}
                    className={`${mood.bg} p-6 pt-10 rounded-sm shadow-xl flex flex-col aspect-square relative cursor-pointer overflow-hidden`}
                    style={{ rotate: `${baseRotate}deg` }}
                  >
                    <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 ${mood.tape} backdrop-blur-md opacity-60 shadow-sm`} />
                    <div className="flex-1 overflow-hidden pointer-events-none">
                      <p className={`${mood.text} text-[10px] sm:text-[11px] leading-relaxed font-sans italic font-semibold line-clamp-5 break-words whitespace-pre-wrap`}>
                        "{w.mesej}"
                      </p>
                    </div>
                    <div className="mt-auto pt-2 border-t border-black/5">
                      <p className={`${mood.text} text-[8px] font-black uppercase tracking-widest truncate`}>— {w.nama}</p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* FAB: BUTTON + (STICKY TO SECTION) */}
      <div className="absolute bottom-28 right-8 z-50">
        <motion.button 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9, rotate: 90 }} 
          onClick={openWriteModal}
          className="bg-[#fbf8f4] text-black w-14 h-14 rounded-full shadow-2xl flex items-center justify-center border border-[#d4b054]/20"
        >
          <Plus size={24} />
        </motion.button>
      </div>

      {/* MODAL: TULIS UCAPAN */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`relative w-full max-w-sm ${activeTheme.bg} p-8 sm:p-12 rounded-lg shadow-2xl overflow-visible`}
            >
              <div className={`absolute -top-5 left-1/2 -translate-x-1/2 w-28 h-10 ${activeTheme.tape} backdrop-blur-md border border-white/10 rotate-1`} />
              <button onClick={() => setIsModalOpen(false)} className="absolute -top-4 -right-4 bg-black text-white p-2 rounded-full shadow-lg">
                <X size={18} />
              </button>
              <div className="text-center mb-10">
                <Sparkles size={16} className={`${activeTheme.text} opacity-20 mx-auto mb-2`} />
                <h3 className={`${activeTheme.text} text-3xl font-serif italic tracking-tighter`}>Warkah Doa</h3>
              </div>
              <form onSubmit={handleSubmit} className="space-y-8">
                <input type="text" placeholder="NAMA ANDA" className={`w-full bg-transparent border-b ${activeTheme.border} py-3 text-xs ${activeTheme.text} outline-none font-bold placeholder:opacity-20 uppercase tracking-[0.2em] focus:border-black/40`}
                  onChange={(e) => setForm({...form, nama: e.target.value})} required />
                <textarea placeholder="Tuliskan doa..." rows={5} className={`w-full bg-transparent border-b ${activeTheme.border} py-3 text-xs ${activeTheme.text} outline-none resize-none italic placeholder:opacity-20 focus:border-black/40 font-sans`}
                  onChange={(e) => setForm({...form, mesej: e.target.value})} required />
                <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} disabled={loading}
                  className="w-full py-4 bg-black text-white rounded-full font-bold text-[9px] tracking-[0.4em] shadow-xl flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" size={14} /> : <><span>HANTAR WARKAH</span><Heart size={10} fill="currentColor" /></>}
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: BACA UCAPAN PENUH */}
      <AnimatePresence>
        {selectedWish && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 backdrop-blur-md">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60" onClick={() => setSelectedWish(null)} />
            <motion.div layoutId={selectedWish.id} className={`${selectedWish.mood.bg} relative w-full max-w-sm p-12 rounded-lg shadow-2xl`}>
              <button onClick={() => setSelectedWish(null)} className="absolute top-6 right-6 opacity-30"><X size={24} /></button>
              <div className="text-center">
                <p className={`${selectedWish.mood.text} text-xl sm:text-2xl leading-relaxed font-serif italic mb-10 break-words whitespace-pre-wrap overflow-y-auto max-h-[40vh] no-scrollbar px-2`}>
                  "{selectedWish.mesej}"
                </p>
                <div className="h-[1px] w-12 bg-black/5 mx-auto mb-6" />
                <p className={`${selectedWish.mood.text} text-[10px] font-bold uppercase tracking-[0.4em]`}>{selectedWish.nama}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-5 { display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </section>
  );
}