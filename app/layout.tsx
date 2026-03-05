import type { Metadata, Viewport } from "next";
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

// Metadata untuk SEO & Social Media Sharing (WhatsApp, FB, etc.)
export const metadata: Metadata = {
  title: 'Walimatulurus Aiman & Adinda',
  description: 'Undangan Rasmi ke Majlis Perkahwinan Aiman & Adinda',
  metadataBase: new URL('https://aimandinda.my'), // TUKAR ke domain sebenar kau nanti
  openGraph: {
    title: 'Walimatulurus Aiman & Adinda',
    description: 'Undangan Rasmi ke Majlis Perkahwinan kami.',
    url: 'https://aimandinda.my',
    siteName: 'Walimatulurus',
    images: [
      {
        url: '/opengraph-image.png', // Pastikan fail ini ada dalam folder /public atau /app
        width: 1080,
        height: 1080,
        alt: 'Wedding Invitation Aiman & Adinda',
      },
    ],
    locale: 'ms_MY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Walimatulurus Aiman & Adinda',
    description: 'Undangan Rasmi ke Majlis Perkahwinan kami.',
    images: ['/opengraph-image.png'],
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
};

// Viewport settings (Next.js 14+ galakkan asingkan dari Metadata)
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
      <body className={`${montserrat.variable} ${greatVibes.variable} font-sans antialiased bg-[#0f0e0c]`}>
        {children}
      </body>
    </html>
  );
}