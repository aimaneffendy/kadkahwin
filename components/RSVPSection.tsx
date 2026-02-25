'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, XCircle, Loader2, Users, Heart } from 'lucide-react';
import { supabase } from '@/lib/supabase'; 

export default function RSVPSection() {
  const [formData, setFormData] = useState({ nama: '', pax: 1, hadir: true });
  const [totalHadir, setTotalHadir] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fetchStats = async () => {
    const { data, error } = await supabase
      .from('rsvp')
      .select('pax')
      .eq('hadir', true);
    
    if (!error && data) {
      const total = data.reduce((acc, curr) => acc + (curr.pax || 0), 0);
      setTotalHadir(total);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  const handleSubmit = async () => {
    if (!formData.nama) return alert("Mohon titipkan nama anda.");
    setLoading(true);
    const { error } = await supabase
      .from('rsvp')
      .insert([{ 
        nama: formData.nama, 
        hadir: formData.hadir, 
        pax: formData.hadir ? formData.pax : 0 
      }]);

    if (!error) {
      setSubmitted(true);
      fetchStats();
    }
    setLoading(false);
  };

  return (
    <section className="h-screen w-full relative bg-[#050505] flex flex-col items-center justify-center px-8 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#a98d32]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#a98d32]/5 blur-[120px] rounded-full" />
      </div>

      <div className="z-10 w-full max-w-sm">
        
        {/* INTRO TEXT */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Heart size={20} className="text-[#a98d32]/40 mx-auto mb-4" />
          <h2 className="text-[#fbf8f4] text-4xl font-serif italic mb-4">RSVP</h2>
          <p className="text-[#fbf8f4]/60 text-xs leading-relaxed font-light italic px-4">
            "Kehadiran serta doa restu kalian amat bermakna bagi kami dalam meraikan lembaran baharu ini."
          </p>
          <div className="h-[0.5px] w-20 bg-gradient-to-r from-transparent via-[#a98d32]/40 to-transparent mx-auto mt-6" />
        </motion.div>

        {!submitted ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-5"
          >
            {/* LIVE COUNTER TAG */}
            <div className="flex justify-center mb-2">
              <div className="bg-white/[0.03] border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-3 shadow-xl">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a98d32] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4b054]"></span>
                </span>
                <p className="text-[#fbf8f4]/40 text-[9px] tracking-[0.2em] font-bold uppercase">
                  {totalHadir} Tetamu Telah Mengesahkan
                </p>
              </div>
            </div>

            {/* INPUT FIELD */}
            <div className="relative group">
              <input 
                type="text"
                placeholder="Nama Penuh"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-[#fbf8f4] text-sm outline-none focus:border-[#a98d32]/50 transition-all placeholder:text-white/10 shadow-inner"
                onChange={(e) => setFormData({...formData, nama: e.target.value})}
              />
            </div>

            {/* BUTTON SELECTION */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setFormData({...formData, hadir: true})}
                className={`group relative overflow-hidden py-4 rounded-2xl border transition-all duration-500 ${
                  formData.hadir 
                  ? 'border-[#a98d32] bg-[#a98d32]/10 text-[#d4b054]' 
                  : 'border-white/5 bg-white/[0.02] text-white/20'
                }`}
              >
                <div className="flex flex-col items-center gap-1 relative z-10">
                  <CheckCircle2 size={16} className={formData.hadir ? 'scale-110 transition-transform' : ''} />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Akan Hadir</span>
                </div>
              </button>

              <button 
                onClick={() => setFormData({...formData, hadir: false})}
                className={`group relative overflow-hidden py-4 rounded-2xl border transition-all duration-500 ${
                  !formData.hadir 
                  ? 'border-red-500/50 bg-red-500/5 text-red-500' 
                  : 'border-white/5 bg-white/[0.02] text-white/20'
                }`}
              >
                <div className="flex flex-col items-center gap-1 relative z-10">
                  <XCircle size={16} />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Tidak Hadir</span>
                </div>
              </button>
            </div>

            {/* PAX SELECTOR */}
            <AnimatePresence mode="wait">
              {formData.hadir && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2 bg-white/[0.02] border border-white/5 rounded-2xl p-4"
                >
                  <label className="text-[8px] text-[#a98d32]/60 uppercase tracking-widest block text-center mb-2">Bilangan Pax</label>
                  <div className="flex justify-center gap-3">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        onClick={() => setFormData({...formData, pax: num})}
                        className={`w-10 h-10 rounded-full border text-xs transition-all ${
                          formData.pax === num 
                          ? 'bg-[#d4b054] border-[#d4b054] text-black font-bold' 
                          : 'border-white/10 text-white/30 hover:border-white/30'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SUBMIT */}
            <button 
              onClick={handleSubmit}
              disabled={loading || !formData.nama}
              className="w-full py-5 bg-[#d4b054] text-black rounded-full font-bold text-[10px] tracking-[0.4em] uppercase flex items-center justify-center gap-3 disabled:opacity-30 transition-all shadow-[0_10px_30px_rgba(212,176,84,0.15)] mt-4 active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Sahkan Kehadiran"}
            </button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="text-center p-12 bg-white/[0.03] border border-white/10 rounded-[3rem] shadow-2xl backdrop-blur-sm"
          >
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} className="text-green-500" />
            </div>
            <h3 className="text-[#fbf8f4] text-2xl font-serif italic mb-3">Terima Kasih</h3>
            <p className="text-white/40 text-[11px] leading-relaxed font-light italic px-4 uppercase tracking-widest">
              Data anda telah selamat direkodkan. Jumpa anda di hari bahagia kami!
            </p>
          </motion.div>
        )}
      </div>

      {/* Decorative Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.05] pointer-events-none" />
    </section>
  );
}