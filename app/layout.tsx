import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/outfit';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import './globals.css';
import { Providers } from './providers';


export const metadata: Metadata = {
  title: {
    default: 'PropChain – Premium Fractional Real Estate in Dubai',
    template: '%s | PropChain',
  },
  description:
    'Invest in Dubai\'s most prestigious real estate from AED 500. Blockchain-powered fractional ownership with VARA compliance.',
  keywords: [
    'real estate tokenization',
    'Dubai property investment',
    'fractional ownership UAE',
    'VARA licensed',
    'blockchain real estate',
    'property tokens',
    'UAE real estate investment',
    'PropChain',
    'Dubai fractional property',
  ],
  authors: [{ name: 'PropChain' }],
  creator: 'PropChain',
  publisher: 'PropChain',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: 'https://propchain.ae',
    siteName: 'PropChain',
    title: 'PropChain – Premium Fractional Real Estate in Dubai',
    description:
      'Invest in Dubai\'s most prestigious real estate from AED 500. Blockchain-powered fractional ownership with VARA compliance.',
  },
};

export const viewport: Viewport = {
  themeColor: '#020617',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className=""
      suppressHydrationWarning
    >
      <body className="font-outfit antialiased bg-[#020617] text-white selection:bg-gold-500/30 selection:text-white noise-overlay">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
