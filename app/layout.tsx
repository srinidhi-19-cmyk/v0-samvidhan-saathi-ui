import type { Metadata, Viewport } from 'next'
import { DM_Sans, Cormorant_Garamond, Syne, Lora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from '../components/providers'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans'
});

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant'
});

const syne = Syne({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-syne'
});

const lora = Lora({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lora'
});

export const metadata: Metadata = {
  title: 'Samvidhan Saathi - Know Your Rights',
  description: 'AI-powered constitutional assistant for real-life situations. Understand your rights, explore the constitution, and learn through interactive case studies.',
  generator: 'v0.app',
  keywords: ['constitution', 'rights', 'India', 'legal', 'law', 'fundamental rights', 'samvidhan'],
  authors: [{ name: 'Samvidhan Saathi' }],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#5C7A5F',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable} ${syne.variable} ${lora.variable}`}>
      <body className="font-sans antialiased min-h-screen">
        <Providers>
          {children}
        </Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
