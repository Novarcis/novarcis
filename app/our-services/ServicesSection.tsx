"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const services = [
  {
    tier: "Tier 1",
    name: "Automatización No-Code",
    description:
      "Flujos de trabajo automatizados con N8N, Make y Zapier. Ideal para empezar rápido sin desarrollo complejo.",
    complexity: "Accesible",
    color: "#00F5FF",
    icon: (
      <svg viewBox="0 0 60 60" className="w-full h-full">
        <defs>
          <linearGradient id="nocode" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F5FF" />
            <stop offset="100%" stopColor="#00F5FF" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <rect
          x="10"
          y="15"
          width="40"
          height="30"
          rx="4"
          fill="none"
          stroke="url(#nocode)"
          strokeWidth="2"
        />
        <rect x="15" y="22" width="12" height="6" rx="2" fill="#00F5FF" opacity="0.6" />
        <rect x="15" y="32" width="8" height="6" rx="2" fill="#00F5FF" opacity="0.4" />
        <rect x="33" y="22" width="12" height="16" rx="2" fill="#00F5FF" opacity="0.3" />
        <circle cx="30" cy="10" r="3" fill="#00F5FF" />
        <line x1="30" y1="13" x2="30" y2="15" stroke="#00F5FF" strokeWidth="1" />
      </svg>
    ),
    features: [
      "Integraciones entre apps",
      "Automatización de emails",
      "Workflows visuales",
      "Sin código necesario",
    ],
  },
  {
    tier: "Tier 2",
    name: "Desarrollo con IA",
    description:
      "LLMs personalizados, agentes autónomos y pipelines de RAG. Inteligencia artificial que trabaja por ti.",
    complexity: "Avanzado",
    color: "#7B2FFF",
    icon: (
      <svg viewBox="0 0 60 60" className="w-full h-full">
        <defs>
          <linearGradient id="ai" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7B2FFF" />
            <stop offset="100%" stopColor="#00F5FF" />
          </linearGradient>
        </defs>
        <circle cx="30" cy="30" r="18" fill="none" stroke="url(#ai)" strokeWidth="2" />
        <circle cx="30" cy="30" r="8" fill="none" stroke="#7B2FFF" strokeWidth="2" />
        <circle cx="30" cy="30" r="3" fill="#7B2FFF" />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <circle
            key={i}
            cx={30 + Math.cos((angle * Math.PI) / 180) * 18}
            cy={30 + Math.sin((angle * Math.PI) / 180) * 18}
            r="2"
            fill="#00F5FF"
          />
        ))}
      </svg>
    ),
    features: [
      "Chatbots inteligentes",
      "Agentes autónomos",
      "RAG pipelines",
      "Fine-tuning de modelos",
    ],
  },
  {
    tier: "Tier 3",
    name: "Ingeniería Compleja",
    description:
      "Microservicios, APIs robustas y arquitecturas escalables. Código puro para soluciones de misión crítica.",
    complexity: "Experto",
    color: "#FF2D78",
    icon: (
      <svg viewBox="0 0 60 60" className="w-full h-full">
        <defs>
          <linearGradient id="eng" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF2D78" />
            <stop offset="100%" stopColor="#7B2FFF" />
          </linearGradient>
        </defs>
        <polygon
          points="30,8 52,22 52,38 30,52 8,38 8,22"
          fill="none"
          stroke="url(#eng)"
          strokeWidth="2"
        />
        <polygon
          points="30,18 42,26 42,34 30,42 18,34 18,26"
          fill="none"
          stroke="#FF2D78"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <circle cx="30" cy="30" r="4" fill="#FF2D78" />
      </svg>
    ),
    features: [
      "Microservicios",
      "APIs de alto rendimiento",
      "Arquitectura distribuida",
      "DevOps avanzado",
    ],
  },
];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="services"
      ref={ref}
      className="snap-full relative w-full flex flex-col justify-start px-4 sm:px-6 pt-24 pb-32 md:py-24 overflow-hidden"
    >
      <div className="absolute top-0 left-0 md:left-1/4 w-72 md:w-125 h-72 md:h-125 bg-[#7B2FFF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 md:right-1/4 w-64 md:w-100 h-64 md:h-100 bg-[#00F5FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 px-4"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#E8EDF5] mb-4 leading-tight text-balance">
            Soluciones a tu medida
          </h2>
          <p className="text-[#6B7A99] text-base md:text-lg max-w-2xl mx-auto text-pretty">
            Desde automatizaciones simples hasta arquitecturas empresariales complejas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group w-full"
            >
              <div
                className={`absolute -inset-px rounded-xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-500`}
                style={{
                  background: `linear-gradient(135deg, ${service.color}, #7B2FFF, #FF2D78, ${service.color})`,
                  backgroundSize: "300% 300%",
                  animation:
                    hoveredIndex === i ? "gradient-rotate 3s linear infinite" : "none",
                }}
              />

              <div className="relative glass-card rounded-xl p-6 md:p-8 h-full flex flex-col transition-transform duration-300 md:group-hover:-translate-y-2">
                <span
                  className="absolute top-4 right-4 text-xs font-mono px-2 py-1 rounded"
                  style={{
                    backgroundColor: `${service.color}20`,
                    color: service.color,
                  }}
                >
                  {service.tier}
                </span>

                <motion.div
                  className="w-14 h-14 md:w-16 md:h-16 mb-5 md:mb-6"
                  animate={
                    hoveredIndex === i
                      ? { rotate: [0, 10, -10, 0], scale: 1.1 }
                      : {}
                  }
                  transition={{ duration: 0.4 }}
                >
                  {service.icon}
                </motion.div>

                <h3
                  className="font-display text-xl lg:text-2xl font-semibold mb-2 md:mb-3"
                  style={{ color: service.color }}
                >
                  {service.name}
                </h3>
                <p className="text-[#6B7A99] text-sm md:text-base leading-relaxed mb-6 grow text-pretty">
                  {service.description}
                </p>

                <ul className="space-y-2.5 mb-6 md:mb-8">
                  {service.features.map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-sm text-[#E8EDF5]/80"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: service.color }}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-[#6B7A99] font-mono">
                    Complejidad:
                  </span>
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full transition-shadow duration-300"
                    style={{
                      backgroundColor: `${service.color}15`,
                      color: service.color,
                      boxShadow:
                        hoveredIndex === i
                          ? `0 0 15px ${service.color}30`
                          : "none",
                    }}
                  >
                    {service.complexity}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}