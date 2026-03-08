import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono, Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Novarcis | Desarrollo de Software Inteligente",
  description:
    "No te vendemos software, te vendemos la ventaja competitiva en tu sector. Soluciones de IA a medida para transformar tu negocio.",
  icons: {
    icon: "/images/Logo-novarcis.png",
    shortcut: "/images/Logo-novarcis.png",
    apple: "/images/Logo-novarcis.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#080A0F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${dmSans.variable} ${jetbrainsMono.variable} ${syne.variable}`}
    >
      <body className="font-sans antialiased bg-[#080A0F] text-[#E8EDF5]">
        <div className="grain-overlay" aria-hidden="true" />
        <div className="scanlines" aria-hidden="true" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}