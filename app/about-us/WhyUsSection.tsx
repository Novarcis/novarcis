"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const differentiators = [
  {
    number: "01",
    title: "Código real, no plantillas",
    description:
      "Cada solución es desarrollada desde cero para tu caso específico. Sin soluciones genéricas que no escalan.",
  },
  {
    number: "02",
    title: "IA nativa en todo",
    description:
      "No añadimos IA como una capa. La integramos desde el diseño de la arquitectura para máximo rendimiento.",
  },
  {
    number: "03",
    title: "Mentalidad de producto",
    description:
      "Pensamos como founders, no como consultores. Tu éxito es nuestro éxito. Alineamos incentivos.",
  },
  {
    number: "04",
    title: "Transparencia total",
    description:
      "Acceso completo al código, documentación exhaustiva y transferencia de conocimiento real.",
  },
];

export function WhyUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="why-us"
      ref={ref}
      className="snap-section relative w-full flex items-center justify-center px-4 sm:px-6 py-16 md:py-24 overflow-hidden"
    >
      <div className="absolute top-1/4 md:top-1/3 -left-20 md:left-0 w-72 md:w-150 h-72 md:h-150 bg-[#00F5FF]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-10 md:mb-12"
            >
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#E8EDF5] mb-3 md:mb-4 leading-tight">
                Por qué{" "}
                <span className="text-[#00F5FF] text-glow-cyan">nosotros</span>
              </h2>
              <p className="text-[#6B7A99] text-base md:text-lg text-pretty">
                No somos otra agencia. Somos ingenieros construyendo el futuro.
              </p>
            </motion.div>

            <div className="space-y-6 md:space-y-8">
              {differentiators.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="group flex gap-4 md:gap-6 items-start"
                >
                  <span className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#00F5FF]/20 group-hover:text-[#00F5FF]/40 transition-colors shrink-0 mt-1 md:mt-0">
                    {item.number}
                  </span>

                  <div>
                    <h3 className="font-display text-lg md:text-xl font-semibold text-[#E8EDF5] mb-1 md:mb-2 group-hover:text-[#00F5FF] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[#6B7A99] text-sm md:text-base leading-relaxed text-pretty">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div
            className={`relative hidden lg:flex items-center justify-center ${isInView ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transform: isInView ? 'scale(1)' : 'scale(0.9)',
              transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
            }}
          >
            <div className="relative w-80 h-80">
              <div
                className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full bg-linear-to-br from-[#00F5FF] to-[#7B2FFF] whyus-center-sphere"
              />

              {[
                { size: 120, borderColor: "rgba(0, 245, 255, 0.3)", dotColor: "#00F5FF", dotShadow: "rgba(0, 245, 255, 0.8)", duration: 15 },
                { size: 160, borderColor: "rgba(123, 47, 255, 0.3)", dotColor: "#7B2FFF", dotShadow: "rgba(123, 47, 255, 0.8)", duration: 20 },
                { size: 200, borderColor: "rgba(255, 45, 120, 0.2)", dotColor: "#FF2D78", dotShadow: "rgba(255, 45, 120, 0.8)", duration: 25 },
              ].map((ring, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 rounded-full border whyus-orbit-ring"
                  style={{
                    width: ring.size,
                    height: ring.size,
                    borderColor: ring.borderColor,
                    animationDuration: `${ring.duration}s`,
                  }}
                >
                  <div
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: ring.dotColor,
                      boxShadow: `0 0 10px ${ring.dotShadow}`,
                      top: -6,
                      left: "50%",
                      marginLeft: -6,
                    }}
                  />
                </div>
              ))}

              <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-[#00F5FF]/30" />
              <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-[#7B2FFF]/30" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-[#7B2FFF]/30" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-[#FF2D78]/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}