"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const painPoints = [
  {
    icon: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F5FF" />
            <stop offset="100%" stopColor="#7B2FFF" />
          </linearGradient>
        </defs>
        <rect
          x="18"
          y="18"
          width="30"
          height="38"
          rx="4"
          fill="none"
          stroke="url(#grad1)"
          strokeWidth="2"
        />
        <line x1="24" y1="28" x2="42" y2="28" stroke="#00F5FF" strokeWidth="2" />
        <line x1="24" y1="36" x2="38" y2="36" stroke="#7B2FFF" strokeWidth="2" />
        <line x1="24" y1="44" x2="36" y2="44" stroke="#7B2FFF" strokeWidth="2" />
        <circle cx="50" cy="48" r="12" fill="none" stroke="#FF2D78" strokeWidth="2" />
        <line x1="50" y1="48" x2="50" y2="42" stroke="#FF2D78" strokeWidth="2" strokeLinecap="round" />
        <line x1="50" y1="48" x2="56" y2="52" stroke="#FF2D78" strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="48" r="2" fill="#FF2D78" />
      </svg>
    ),
    title: "Tu equipo pierde horas cada día",
    description:
      "Mientras repites tareas que una máquina hace en segundos, alguien en tu sector ya lo automatizó.",
  },
  {
    icon: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7B2FFF" />
            <stop offset="100%" stopColor="#FF2D78" />
          </linearGradient>
        </defs>
        <rect
          x="15"
          y="20"
          width="50"
          height="40"
          rx="4"
          fill="none"
          stroke="url(#grad2)"
          strokeWidth="2"
        />
        <line x1="15" y1="35" x2="65" y2="35" stroke="url(#grad2)" strokeWidth="2" />
        <circle cx="25" cy="27" r="3" fill="#FF2D78" />
        <circle cx="35" cy="27" r="3" fill="#7B2FFF" />
        <circle cx="45" cy="27" r="3" fill="#00F5FF" />
        <text
          x="40"
          y="52"
          textAnchor="middle"
          fill="#6B7A99"
          fontSize="12"
          fontFamily="monospace"
        >
          ERROR
        </text>
      </svg>
    ),
    title: "Tus herramientas no se hablan entre sí",
    description:
      "Datos dispersos en 10 plataformas. Sin visión clara. Los sistemas desconectados son el ancla que no te deja crecer.",
  },
  {
    icon: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <defs>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F5FF" />
            <stop offset="100%" stopColor="#FF2D78" />
          </linearGradient>
        </defs>
        <circle cx="40" cy="40" r="25" fill="none" stroke="url(#grad3)" strokeWidth="2" />
        <line x1="40" y1="25" x2="40" y2="40" stroke="#00F5FF" strokeWidth="2" strokeLinecap="round" />
        <line x1="40" y1="40" x2="52" y2="45" stroke="#FF2D78" strokeWidth="2" strokeLinecap="round" />
        <circle cx="40" cy="40" r="3" fill="#00F5FF" />
        <path
          d="M40 12 L43 18 L40 16 L37 18 Z"
          fill="#7B2FFF"
          transform="rotate(45 40 40)"
        />
      </svg>
    ),
    title: "Crecer se vuelve imposible",
    description:
      "Más clientes = más caos. Tu infraestructura no acompaña tu ambición y el mercado no espera.",
  },
];

export function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="problem"
      ref={ref}
      className="snap-section relative w-full flex items-center justify-center px-5 sm:px-6 py-12 md:py-24 overflow-hidden"
    >
      <div className="absolute top-1/4 right-0 w-64 md:w-96 h-64 md:h-96 bg-[#FF2D78]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-20"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl leading-[1.2] md:leading-tight">
            <span className="text-[#E8EDF5]">Tu competencia ya está </span>
            <span className="text-[#00F5FF] text-glow-cyan">automatizando.</span>
            <br className="hidden md:block" />
            <span className="text-[#6B7A99]"> ¿Tú también?</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {painPoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="group flex flex-row md:flex-col items-start gap-4 md:gap-0"
            >
              <motion.div
                className="w-12 h-12 md:w-16 md:h-16 shrink-0 md:mb-6 opacity-80 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {point.icon}
              </motion.div>

              <div className="flex-1">
                <h3 className="font-display text-lg md:text-2xl font-semibold text-[#E8EDF5] mb-1 md:mb-3">
                  {point.title}
                </h3>
                <p className="text-[#6B7A99] leading-relaxed text-pretty text-sm md:text-lg">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
