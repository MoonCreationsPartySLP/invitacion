import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display, Cormorant_Garamond } from "next/font/google"
import "./globals.css"
import localFont from 'next/font/local';


const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _playfair = Playfair_Display({ subsets: ["latin"] })
const _cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})


export const coldiac = localFont({
  src: [
    { path: '/fonts/Coldiac.ttf', weight: '400', style: 'normal' },
    { path: '/fonts/ColdiacItalic.ttf', weight: '400', style: 'italic' },
  ],
  variable: '--font-coldiac',
  display: 'swap',
});

export const cormorant = localFont({
  src: [
    { path: '/fonts/CormorantGaramondRegular.ttf', weight: '400', style: 'normal' },
    
  ],
  variable: '--font-cormorant',
  display: 'swap',
});

export const parisienne = localFont({
  src: '/fonts/ParisienneRegular.ttf',
  variable: '--font-parisienne',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Wedding Invitation - Sarah & Michael",
  description: "You are invited to celebrate the wedding of Sarah and Michael",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>{children}</body>
    </html>
  )
}
