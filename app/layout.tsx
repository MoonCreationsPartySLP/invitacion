import type { Metadata } from "next";
import "/globals.css";
import { coldiac, cormorant, parisienne } from "/lib/fonts";

export const metadata: Metadata = {
  title: "Wedding Invitation - Sarah & Michael",
  description: "You are invited to celebrate the wedding of Sarah and Michael",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

import type { Metadata } from "next";
import "./globals.css";
import { coldiac, cormorant, parisienne } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Wedding Invitation - Sarah & Michael",
  description: "You are invited to celebrate the wedding of Sarah and Michael",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${coldiac.variable} ${cormorant.variable} ${parisienne.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}

