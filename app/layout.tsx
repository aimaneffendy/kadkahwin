import type { Metadata, Viewport } from "next";
import { Montserrat, Great_Vibes, Playfair_Display } from "next/font/google";
import "./globals.css";

// Font Serif untuk tajuk/teks klasik (Luxury feel)
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

// Font Sans untuk teks kecil/penerangan (Clean feel)
const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "300", "400", "700"]
});

// Font Script untuk Nama Pengantin (Handwriting)
const greatVibes = Great_Vibes({ 
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400"]
});

export const metadata: Metadata = {
  title: 'Walimatulurus Aiman & Adinda',
  description: 'Undangan Rasmi ke Majlis Walimatulurus Aiman & Adinda',
  // Tambah theme color supaya bar atas phone jadi hitam
  themeColor: '#000000',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ms" className="scroll-smooth">
      <body className={`
        ${playfair.variable} 
        ${montserrat.variable} 
        ${greatVibes.variable} 
        font-serif antialiased bg-black text-[#d4af37]
      `}>
        {children}
      </body>
    </html>
  );
}