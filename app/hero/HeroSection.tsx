"use client";
import { motion } from "framer-motion";
import { LogoEntity } from "@/components/LogoEntity";
import { useMemo } from "react";
import Link from "next/link";

export function HeroSection() {
  const title1 = "¿Quieres ser el último en la humanidad?";
  const title2 = "O te adaptas o te adaptamos.";

  const particles = useMemo(
    () =>
      Array.from({ length: 30 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        d: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      })),
    []
  );

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const renderAnimated = (text: string, startDelay: number, color: string) => {
    return text.split(" ").map((word, index, array) => {
      const delay = startDelay + index * 0.15;

      return (
        <span key={index} className="inline-block whitespace-nowrap overflow-hidden">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay,
              ease: [0.2, 0.65, 0.3, 0.9]
            }}
            className="inline-block"
            style={{ color }}
          >
            {word}
          </motion.span>
          {index !== array.length - 1 && <span>&nbsp;</span>}
        </span>
      );
    });
  };

  return (
    <section
      id="hero"
      className="snap-section relative w-full min-h-dvh flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden"
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[150vw] sm:w-200 h-[150vw] sm:h-200 -top-20 sm:-top-40 -right-20 sm:-right-40 rounded-full blur-3xl opacity-20"
          style={{
            background:
              "radial-gradient(circle,rgba(0,245,255,0.4) 0%,rgba(123,47,255,0.2) 50%,transparent 70%)",
          }}
          animate={{ x: [0, 40, 0], y: [0, 25, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute w-[120vw] sm:w-150 h-[120vw] sm:h-150 -bottom-10 sm:-bottom-20 -left-10 sm:-left-20 rounded-full blur-3xl opacity-15"
          style={{
            background:
              "radial-gradient(circle,rgba(123,47,255,0.4) 0%,rgba(255,45,120,0.2) 50%,transparent 70%)",
          }}
          animate={{ x: [0, -25, 0], y: [0, 40, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#00F5FF]/40"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: p.d, repeat: Infinity, delay: p.delay }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="mb-6 sm:mb-8 md:mb-12 mt-12 sm:mt-0"
      >
        <LogoEntity state="idle" size="md" />
      </motion.div>

      <div className="text-center z-10 w-full max-w-7xl mx-auto px-2 sm:px-4 relative">
        <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight sm:leading-none">
          <span className="block text-balance uppercase">
            {renderAnimated(title1, 0.3, "#00F5FF")}
          </span>
          <span className="block mt-2 sm:mt-4 text-balance uppercase text-xl sm:text-2xl md:text-4xl lg:text-5xl tracking-wide">
            {renderAnimated(title2, 0.3 + (title1.split(" ").length * 0.15), "#E8EDF5")}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-base sm:text-lg md:text-xl text-[#6B7A99] max-w-xl mx-auto mb-8 sm:mb-10 text-pretty px-4 sm:px-0"
        >
          Novarcis: No te vendemos software, te vendemos la ventaja competitiva
          en tu sector. Soluciones de IA a medida para transformar tu negocio.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full px-4 sm:px-0"
        >
          <Link href="/chat" className="w-full sm:w-auto">
            <button className="w-full group relative px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-[#080A0F] bg-[#00F5FF] glow-cyan transition-all hover:scale-105 flex justify-center">
              <span className="relative z-10 flex items-center gap-2">
                Habla con nuestra IA
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </Link>

          <button
            onClick={() => scrollTo("services")}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-[#E8EDF5] border border-[#6B7A99]/30 hover:border-[#00F5FF]/50 hover:text-[#00F5FF] transition-all hover:scale-105"
          >
            Ver servicios
          </button>
        </motion.div>
      </div>
    </section>
  );
}