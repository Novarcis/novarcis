"use client";
import { LogoEntity } from "@/components/LogoEntity";
import Link from "next/link";

// Fixed particle positions — avoids Math.random() hydration mismatch
const particles = [
  { x: 12, y: 8, d: 3.4, delay: 0.2 },
  { x: 55, y: 62, d: 4.1, delay: 1.1 },
  { x: 38, y: 25, d: 3.8, delay: 0.7 },
  { x: 73, y: 68, d: 4.5, delay: 1.4 },
  { x: 78, y: 5, d: 3.2, delay: 0.4 },
  { x: 25, y: 91, d: 4.8, delay: 1.8 },
  { x: 85, y: 34, d: 3.6, delay: 0.9 },
  { x: 45, y: 3, d: 4.3, delay: 1.6 },
  { x: 14, y: 47, d: 3.1, delay: 0.5 },
  { x: 63, y: 82, d: 3.9, delay: 1.2 },
];

export function HeroSection() {
  const title1 = "¿Quieres ser el último en la humanidad?";
  const title2 = "O te adaptas o te adaptamos.";

  const renderAnimated = (text: string, startDelay: number, color: string) => {
    return text.split(" ").map((word, index, array) => {
      const delay = startDelay + index * 0.15;
      return (
        <span key={index} className="inline-block whitespace-nowrap overflow-hidden">
          <span
            className="inline-block hero-word-animate"
            style={{ animationDelay: `${delay}s`, color }}
          >
            {word}
          </span>
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
      {/* Background Orbs - Pure CSS, GPU-composited */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[150vw] sm:w-[200vw] max-w-[1200px] h-[150vw] sm:h-[1200px] -top-20 sm:-top-40 -right-20 sm:-right-40 rounded-full blur-3xl will-change-transform hero-orb-1"
          style={{
            background:
              "radial-gradient(circle,rgba(0,245,255,0.4) 0%,rgba(123,47,255,0.2) 50%,transparent 70%)",
          }}
        />
        <div
          className="absolute w-[120vw] sm:w-[150vw] max-w-[1000px] h-[120vw] sm:h-[1000px] -bottom-10 sm:-bottom-20 -left-10 sm:-left-20 rounded-full blur-3xl will-change-transform hero-orb-2"
          style={{
            background:
              "radial-gradient(circle,rgba(123,47,255,0.4) 0%,rgba(255,45,120,0.2) 50%,transparent 70%)",
          }}
        />
      </div>

      {/* Particles - CSS only, reduced from 30 to 10 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#00F5FF]/40 hero-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              animationDuration: `${p.d}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="mb-6 sm:mb-8 md:mb-12 mt-12 sm:mt-0 hero-logo-entrance">
        <LogoEntity state="idle" size="md" />
      </div>

      <div className="text-center z-10 w-full max-w-7xl mx-auto px-2 sm:px-4 relative">
        <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight sm:leading-none">
          <span className="block text-balance uppercase">
            {renderAnimated(title1, 0.3, "#00F5FF")}
          </span>
          <span className="block mt-2 sm:mt-4 text-balance uppercase text-xl sm:text-2xl md:text-4xl lg:text-5xl tracking-wide">
            {renderAnimated(title2, 0.3 + title1.split(" ").length * 0.15, "#E8EDF5")}
          </span>
        </h1>

        <p
          className="text-base sm:text-lg md:text-xl text-[#6B7A99] max-w-xl mx-auto mb-8 sm:mb-10 text-pretty px-4 sm:px-0 hero-fade-in"
          style={{ animationDelay: "1.5s" }}
        >
          Novarcis: No te vendemos software, te vendemos la ventaja competitiva
          en tu sector. Soluciones de IA a medida para transformar tu negocio.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full px-4 sm:px-0 hero-slide-up"
          style={{ animationDelay: "1.8s" }}
        >
          <button
            className="w-full sm:w-auto group relative px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-[#080A0F] bg-[#00F5FF] glow-cyan transition-all hover:scale-105 flex justify-center"
            onClick={() => window.dispatchEvent(new Event("open-ai-chat"))}
          >
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

          <Link
            href="https://wa.me/5667677144"
            target="_blank"
            className="w-full sm:w-auto"
          >
            <button className="w-full group relative px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-[#E8EDF5] bg-[#0D1117]/80 backdrop-blur-md border border-[#25D366]/30 hover:border-[#25D366] hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all hover:scale-105 flex justify-center items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Ver una demo</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
