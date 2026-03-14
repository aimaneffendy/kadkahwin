'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';

// Inisialisasi Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminRSVPFinal() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRSVP();
  }, []);

  async function fetchRSVP() {
    setLoading(true);
    const { data: rsvpData, error } = await supabase
      .from('rsvp')
      .select('*')
      .order('nama', { ascending: true });

    if (!error) setData(rsvpData);
    setLoading(false);
  }

  // Pengiraan Data
  const filteredData = data.filter(item => 
    item.nama?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPax = data.reduce((acc, curr) => acc + (curr.pax || 0), 0);
  const hadirCount = data.filter(item => item.hadir).length;

  const handlePrint = () => {
    window.print();
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-sans">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <p className="text-slate-500 font-medium animate-pulse">Menyusun senarai tetamu...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fbfcfd] text-slate-900 font-sans p-4 md:p-12 print:p-0 print:bg-white">
      
      {/* --- UI HEADER (Hilang masa print) --- */}
      <div className="max-w-6xl mx-auto print:hidden">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Senarai RSVP.</h1>
            <p className="text-slate-500 font-medium uppercase tracking-widest text-xs mt-1">Aiman & Adinda</p>
          </motion.div>

          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={handlePrint}
              className="flex-1 md:flex-none px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
              Cetak PDF
            </button>
            <button 
              onClick={fetchRSVP}
              className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
            </button>
          </div>
        </header>

        {/* STATS SECTION */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Jumlah Nama', value: data.length, bg: 'bg-white' },
            { label: 'Jumlah Pax', value: totalPax, bg: 'bg-blue-50 text-blue-600' },
            { label: 'Status Hadir', value: hadirCount, bg: 'bg-green-50 text-green-600' },
            { label: 'Status Tidak', value: data.length - hadirCount, bg: 'bg-red-50 text-red-600' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${stat.bg} p-6 rounded-3xl border border-slate-100 shadow-sm`}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">{stat.label}</p>
              <p className="text-3xl font-black tracking-tighter">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* SEARCH BAR */}
        <div className="relative mb-8">
          <input 
            type="text"
            placeholder="Cari nama tetamu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          <svg className="absolute left-4 top-4.5 text-slate-300" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
      </div>

      {/* --- DATA TABLE (UTAMA) --- */}
      <div className="max-w-6xl mx-auto bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden print:shadow-none print:border-none print:rounded-none">
        
        {/* Tajuk Masa Print */}
        <div className="hidden print:block text-center mb-8 pt-4">
          <h1 className="text-2xl font-black uppercase tracking-tighter">Senarai Kehadiran Tetamu</h1>
          <p className="text-slate-500 text-sm italic">Majlis Walimatul Urus Aiman & Adinda</p>
          <div className="mt-2 h-1 w-20 bg-slate-900 mx-auto" />
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 print:bg-slate-100 border-b border-slate-100">
              <th className="p-5 font-bold text-[11px] uppercase tracking-widest text-slate-400 w-16">No.</th>
              <th className="p-5 font-bold text-[11px] uppercase tracking-widest text-slate-400">Nama Tetamu</th>
              <th className="p-5 font-bold text-[11px] uppercase tracking-widest text-slate-400 text-center w-24">Pax</th>
              <th className="p-5 font-bold text-[11px] uppercase tracking-widest text-slate-400">Status</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredData.map((item, index) => (
                <motion.tr 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={item.id} 
                  className="border-b border-slate-50 last:border-none hover:bg-slate-50 transition-colors"
                >
                  <td className="p-5 text-sm text-slate-300 font-medium">{index + 1}</td>
                  <td className="p-5">
                    <p className="text-sm font-bold text-slate-800 uppercase tracking-tight">{item.nama}</p>
                    <p className="text-[10px] text-slate-400 font-medium print:hidden">
                      {new Date(item.created_at).toLocaleDateString('ms-MY')}
                    </p>
                  </td>
                  <td className="p-5 text-center">
                    <span className="inline-block bg-slate-100 px-3 py-1 rounded-lg font-black text-slate-700">
                      {item.pax}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className={`text-[10px] font-black tracking-widest uppercase ${item.hadir ? 'text-emerald-600' : 'text-red-500'}`}>
                      {item.hadir ? '● Hadir' : '○ Tidak'}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
          <tfoot>
            <tr className="bg-slate-900 text-white print:bg-slate-100 print:text-black">
              <td colSpan={2} className="p-6 text-right font-bold text-xs uppercase tracking-[0.3em]">Jumlah Keseluruhan Pax :</td>
              <td className="p-6 text-center text-2xl font-black">{totalPax}</td>
              <td className="p-6 print:hidden"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* FOOTER MASA PRINT */}
      <div className="hidden print:block mt-10 text-[10px] text-slate-400 text-center italic">
        Dokumen ini dijana secara automatik melalui Portal RSVP aimandinda.my pada {new Date().toLocaleString('ms-MY')}
      </div>

      {/* CSS PRINT CUSTOM */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 15mm; }
          body { -webkit-print-color-adjust: exact; background-color: white !important; }
          .print\:hidden { display: none !important; }
          table { page-break-inside: auto; }
          tr { page-break-inside: avoid; page-break-after: auto; }
        }
      `}</style>
    </div>
  );
}