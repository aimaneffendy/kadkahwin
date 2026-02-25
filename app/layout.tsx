import type { Metadata } from "next";
import { Montserrat, Great_Vibes } from "next/font/google";
import "./globals.css";

// Font untuk tulisan biasa (Modern & Clean)
const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "300", "400", "700"]
});

// Font untuk Nama Pengantin (Handwriting/Script)
const greatVibes = Great_Vibes({ 
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400"]
});

export const metadata = {
  title: 'Walimatulurus Aiman & Adinda',
  description: 'Undangan Rasmi',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Bagus untuk kad kahwin supaya tak zoom lari snap
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ms" className="scroll-smooth">
      <body className={`${montserrat.variable} ${greatVibes.variable} font-sans antialiased bg-[#0f0e0c]`}>
        {children}
      </body>
    </html>
  );
}