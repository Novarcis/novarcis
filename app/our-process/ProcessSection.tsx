"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Analizamos tu stack actual, identificamos tus problemas y oportunidades de integración.",
    icon: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <circle
          cx="20"
          cy="20"
          r="15"
          fill="none"
          stroke="#00F5FF"
          strokeWidth="2"
        />
        <circle cx="20" cy="20" r="5" fill="#00F5FF" opacity="0.5" />
        <line
          x1="20"
          y1="20"
          x2="30"
          y2="10"
          stroke="#00F5FF"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Diseño",
    description:
      "Arquitectura personalizada, selección de tecnologías y planificación detallada para tu solución.",
    icon: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <rect
          x="8"
          y="8"
          width="24"
          height="24"
          fill="none"
          stroke="#7B2FFF"
          strokeWidth="2"
          rx="2"
        />
        <line x1="8" y1="16" x2="32" y2="16" stroke="#7B2FFF" strokeWidth="1" />
        <line x1="20" y1="16" x2="20" y2="32" stroke="#7B2FFF" strokeWidth="1" />
        <circle cx="14" cy="12" r="2" fill="#7B2FFF" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Implementación",
    description:
      "Desarrollo iterativo con sprints cortos, demos frecuentes y ajustes en tiempo real.",
    icon: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <path
          d="M12 12 L20 20 L12 28"
          fill="none"
          stroke="#FF2D78"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="22"
          y1="28"
          x2="30"
          y2="28"
          stroke="#FF2D78"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Escalado",
    description:
      "Monitoreo, optimización y soporte continuo. Tu sistema crece contigo sin fricción.",
    icon: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <path
          d="M10 30 L18 22 L24 26 L32 14"
          fill="none"
          stroke="#00F5FF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polygon points="32,14 28,14 32,18" fill="#00F5FF" />
      </svg>
    ),
  },
];

export function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const stepColors = ["#00F5FF", "#7B2FFF", "#FF2D78", "#00F5FF"];

  return (
    <section
      id="process"
      ref={ref}
      className="snap-full relative w-full flex items-center justify-center px-4 sm:px-6 py-16 md:py-24 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] md:w-200 h-[150vw] md:h-200 bg-[#7B2FFF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 px-4"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#E8EDF5] mb-3 md:mb-4 leading-tight text-balance">
            Nuestro proceso
          </h2>
          <p className="text-[#6B7A99] text-base md:text-lg max-w-xl mx-auto text-pretty">
            De la idea al sistema en producción, con metodología probada
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-linear-to-r from-[#00F5FF]/20 via-[#7B2FFF]/40 to-[#FF2D78]/20" />

          <motion.div
            className="hidden md:block absolute top-20 left-0 h-0.5 bg-linear-to-r from-[#00F5FF] via-[#7B2FFF] to-[#FF2D78]"
            initial={{ width: "0%" }}
            animate={isInView ? { width: "100%" } : {}}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.2 }}
                className="relative group flex flex-col items-center md:block"
              >
                <motion.div
                  className="hidden md:flex absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0D1117] border-2 items-center justify-center z-10"
                  style={{ borderColor: stepColors[i] }}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.2 }}
                >
                  <div className="w-6 h-6">{step.icon}</div>
                </motion.div>

                <div className="md:pt-28 text-center md:text-left flex flex-col items-center md:items-start w-full max-w-70 md:max-w-none">
                  <div
                    className="md:hidden w-14 h-14 mx-auto mb-4 rounded-full bg-[#0D1117] border-2 flex items-center justify-center transition-colors"
                    style={{ borderColor: `${stepColors[i]}40` }}
                  >
                    <div className="w-7 h-7">{step.icon}</div>
                  </div>

                  <span className="font-mono text-xs text-[#6B7A99] mb-2 block text-center md:text-left w-full">
                    {step.number}
                  </span>

                  <h3 className="font-display text-xl font-semibold text-[#E8EDF5] mb-2 md:mb-3 group-hover:text-[#00F5FF] transition-colors text-center md:text-left w-full">
                    {step.title}
                  </h3>

                  <p className="text-[#6B7A99] text-sm md:text-base leading-relaxed text-pretty text-center md:text-left">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}