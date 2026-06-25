import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Ana Holística',
  description: 'Tienda holística — yoga, meditación y bienestar',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} ${cormorant.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
