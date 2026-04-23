import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono, Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { LazyChat } from "@/components/LazyChat";
import { JsonLd } from "@/components/JsonLd";

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
  metadataBase: new URL("https://novarcis.dev"),
  title: {
    default: "Novarcis | Desarrollo de Software Inteligente con IA",
    template: "%s | Novarcis",
  },
  description:
    "Startup en Morelia especializada en automatización de agentes, chatbots y bots empresariales con IA. Soluciones a medida para negocios locales de Morelia, Michoacán y todo México.",
  keywords: [
    "automatización de agentes Morelia",
    "bot para empresa Morelia",
    "chatbot empresarial Morelia",
    "inteligencia artificial Morelia",
    "automatización empresarial México",
    "agentes autónomos IA",
    "desarrollo software IA Morelia",
    "automatización negocios Morelia",
    "chatbots inteligentes México",
    "soluciones IA a medida",
    "RAG pipelines",
    "N8N automatización",
    "desarrollo con IA México",
    "consultoría IA Morelia Michoacán",
  ],
  authors: [{ name: "Novarcis" }],
  creator: "Novarcis",
  publisher: "Novarcis",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "Novarcis",
    title: "Novarcis | Desarrollo de Software Inteligente con IA",
    description:
      "Startup en Morelia. Automatización de agentes, chatbots y bots empresariales con IA para negocios de Morelia y todo México.",
    images: [
      {
        url: "/images/Logo-novarcis.webp",
        width: 1200,
        height: 630,
        alt: "Novarcis — Desarrollo de Software Inteligente con IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Novarcis | Desarrollo de Software Inteligente con IA",
    description:
      "Automatización de agentes, chatbots y bots empresariales en Morelia. IA a medida para tu negocio.",
    images: ["/images/Logo-novarcis.webp"],
  },
  icons: {
    icon: "/images/Logo-novarcis.webp",
    shortcut: "/images/Logo-novarcis.webp",
    apple: "/images/Logo-novarcis.webp",
  },
  manifest: "/manifest.json",
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
        <JsonLd />
        {children}
        <LazyChat />
        <Analytics />
      </body>
    </html>
  );
}