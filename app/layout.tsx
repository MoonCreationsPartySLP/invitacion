import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display, Cormorant_Garamond, Antic_Didone, Bona_Nova_SC, Unna, Cardo, Great_Vibes} from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _playfair = Playfair_Display({ subsets: ["latin"] })
const _cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})
const anticDidone = Antic_Didone({
  weight: "400",        
  subsets: ["latin"],
})
const bonaNova = Bona_Nova_SC({
  subsets: ["latin"],
  weight: ["400", "700"], 
  style: ["normal", "italic"],
});
const unna = Unna({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-unna",
});
const cardo = Cardo({
  subsets: ["latin"],
  weight: ["400", "700"],   
  style: ["normal", "italic"], 
  variable: "--font-cardo",
});
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-greatv",
});

export const metadata: Metadata = {
  title: "Wedding Invitation - Angeles & Eduardo",
  description: "You are invited to celebrate the wedding of Angeles and Eduardo",
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

