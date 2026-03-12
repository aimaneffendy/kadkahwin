'use client';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase'; 

// 1. KOMPONEN DUST (DIBETULKAN)
const GoldenDust = ({ delay, duration, x, y, size }: { delay: number; duration: number; x: number; y: number; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-[#dbc677] blur-[0.5px]"
    initial={{ opacity: 0, x: `${x}vw`, y: `${y}vh` }}
    animate={{ 
      opacity: [0, 0.7, 0], // Opacity lebih tinggi
      y: [`${y}vh`, `${y - 20}vh`],
      x: [`${x}vw`, `${x + (Math.random() > 0.5 ? 5 : -5)}vw`],
    }}
    transition={{ 
      duration, 
      delay, 
      repeat: Infinity, 
      ease: "linear" 
    }}
    style={{ 
      width: size, 
      height: size, 
      zIndex: 40, // Paksa duduk atas sekali sebelum content
      boxShadow: '0 0 8px rgba(219, 198, 119, 0.8)' // Tambah glow
    }}
  />
);

export default function RSVPSection() {
  const [formData, setFormData] = useState({ nama: '', pax: 1, hadir: true });
  const [totalHadir, setTotalHadir] = useState(0);
  const [guestList, setGuestList] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // 2. JANA PARTICLES (DIBESARKAN)
  const dustParticles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 6,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.5 + Math.random() * 2, // Saiz besar sikit
    }));
  }, []);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data, error } = await supabase
      .from('rsvp')
      .select('nama, pax')
      .eq('hadir', true);
    
    if (!error && data) {
      const total = data.reduce((acc, curr) => acc + (curr.pax || 0), 0);
      setTotalHadir(total);
      const names = data.map(item => item.nama).filter(Boolean);
      setGuestList(names.length > 0 ? names : ["Sertai senarai tetamu..."]);
    }
  };

  useEffect(() => {
    if (guestList.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % guestList.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [guestList]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama) return alert("Mohon masukkan nama anda.");
    setLoading(true);
    
    const { error } = await supabase
      .from('rsvp')
      .insert([{ nama: formData.nama, hadir: formData.hadir, pax: formData.hadir ? formData.pax : 0 }]);

    if (!error) {
      setShowSuccess(true);
      setFormData({ nama: '', pax: 1, hadir: true });
      fetchStats();
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } else {
      alert("Ralat berlaku. Sila cuba lagi.");
    }
    setLoading(false);
  };

  return (
    <section className="min-h-screen w-full relative bg-black overflow-hidden flex flex-col font-serif">
      
      {/* 3. BACKGROUND & GRADIENT LAYER (Z-0 hingga Z-10) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <motion.img 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 2 }} 
          transition={{ duration: 2 }}
          src="/background2.webp" 
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(1.5) contrast(1.2)' }}
          alt="RSVP Background"
        />
        {/* Gradient Transition dari Section Atas */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-black z-10" />
      </div>

      {/* 4. GOLDEN DUST LAYER (Z-40) */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        {dustParticles.map(p => <GoldenDust key={p.id} {...p} />)}
      </div>

      {/* 5. CONTENT WRAPPER (Z-50) */}
      <div className="relative z-50 max-w-4xl mx-auto w-full flex flex-col h-full py-32 px-10">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[1px] w-10 bg-[#a98d32]" />
            <p className="text-[#a98d32] text-[9px] tracking-[0.6em] uppercase font-bold">Pengesahan Kehadiran</p>
          </div>
          <h2 className="text-[#dbc677] text-6xl md:text-8xl font-light leading-[0.85] tracking-tighter uppercase">
            Daftar <br />
            <span className="italic font-extralight lowercase opacity-80 text-white">Kehadiran.</span>
          </h2>
          
          <div className="mt-8 overflow-hidden bg-black/60 border border-[#a98d32]/30 w-fit min-w-[240px] rounded-xl backdrop-blur-md shadow-2xl">
            <div className="px-4 py-3 border-b border-[#a98d32]/10 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dbc677] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#dbc677]"></span>
              </span>
              <p className="text-[#a98d32] text-[10px] tracking-[0.2em] font-bold uppercase font-sans">
                <span className="text-[#dbc677] text-sm mr-1 font-sans">{totalHadir}</span> Telah Mengesahkan Kehadiran
              </p>
            </div>

            <div className="px-4 py-2 bg-white/[0.02] h-10 flex items-center">
                <div className="flex items-center gap-2 w-full">
                    <span className="text-white/20 text-[8px] uppercase tracking-widest font-sans font-bold">Live:</span>
                    <div className="relative h-5 flex-1 overflow-hidden">
                        <AnimatePresence mode="wait">
                        <motion.p
                            key={currentIndex}
                            initial={{ y: 15, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -15, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute text-white/80 text-[10px] uppercase tracking-[0.15em] font-sans truncate pr-4"
                        >
                            {guestList[currentIndex]}
                        </motion.p>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
          </div>
        </motion.div>

        {/* FORM CONTAINER */}
        <div className="relative">
          <AnimatePresence>
            {showSuccess && (
              <motion.div 
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }} 
                animate={{ opacity: 1, backdropFilter: "blur(10px)" }} 
                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                className="absolute inset-0 z-[100] bg-black/80 flex flex-col items-center justify-center text-center p-6 rounded-lg border border-[#dbc677]/20"
              >
                <div className="mb-4 w-12 h-12 rounded-full border border-[#dbc677]/30 flex items-center justify-center bg-black/40">
                  <Check size={24} className="text-[#dbc677]" />
                </div>
                <h3 className="text-[#dbc677] text-3xl font-light italic mb-2">Terima Kasih!</h3>
                <p className="text-white/60 text-[10px] tracking-[0.2em] uppercase font-sans">Respon anda telah direkodkan.</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-50">
            <div className="relative">
              <label className="text-[#dbc677] text-[9px] tracking-[0.3em] uppercase font-black mb-1 block">Nama Penuh</label>
              <input 
                required
                type="text"
                placeholder="NAMA ANDA"
                value={formData.nama}
                className="w-full bg-transparent border-b border-[#a98d32]/40 py-3 text-white text-lg focus:outline-none focus:border-[#dbc677] transition-colors placeholder:text-white/30 uppercase tracking-widest"
                onChange={(e) => setFormData({...formData, nama: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[#dbc677] text-[9px] tracking-[0.3em] uppercase font-black block">Status</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, hadir: true})}
                    className={`flex-1 py-4 border transition-all text-[9px] tracking-[0.2em] uppercase font-bold backdrop-blur-md ${
                      formData.hadir ? 'bg-[#dbc677] text-black border-[#dbc677]' : 'border-[#a98d32]/40 text-white/40 bg-black/40'
                    }`}
                  > Akan Hadir </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, hadir: false})}
                    className={`flex-1 py-4 border transition-all text-[9px] tracking-[0.2em] uppercase font-bold backdrop-blur-md ${
                      !formData.hadir ? 'bg-white text-black border-white' : 'border-[#a98d32]/40 text-white/40 bg-black/40'
                    }`}
                  > Maaf </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {formData.hadir && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-3">
                    <label className="text-[#dbc677] text-[9px] tracking-[0.3em] uppercase font-black block">Bilangan Pax</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setFormData({...formData, pax: num})}
                          className={`w-11 h-11 border transition-all text-[13px] font-bold font-sans backdrop-blur-md ${
                            formData.pax === num ? 'border-[#dbc677] text-[#dbc677] bg-[#dbc677]/20' : 'border-[#a98d32]/30 text-white/20 bg-black/40'
                          }`}
                        > {num} </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="pt-4">
              <button
                disabled={loading || !formData.nama}
                type="submit"
                className="w-full md:w-max md:px-12 h-16 bg-[#dbc677] flex items-center justify-center gap-4 transition-all shadow-xl disabled:opacity-20 active:scale-[0.98] relative z-[60]"
              >
                {loading ? <Loader2 className="animate-spin text-black" size={18} /> : (
                  <>
                    <span className="text-black text-[11px] font-black tracking-[0.4em] uppercase">Sahkan Respon</span>
                    <Check size={14} className="text-black" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* 6. TEXTURE OVERLAY (Z-100) */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] z-[100]" />
    </section>
  );
}