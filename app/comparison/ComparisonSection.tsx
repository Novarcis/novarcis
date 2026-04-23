"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ClipboardList, Eye, GitBranch, Bell, Zap, ShieldCheck, BotMessageSquare, Send } from "lucide-react";

const manualSteps = [
  { icon: ClipboardList, label: "Ingreso manual de datos", time: "45 min" },
  { icon: Eye, label: "Revisión humana", time: "30 min" },
  { icon: GitBranch, label: "Aprobación en cadena", time: "2 h" },
  { icon: Bell, label: "Notificación manual", time: "20 min" },
];

const autoSteps = [
  { icon: BotMessageSquare, label: "Captura automática IA", time: "0.3 s" },
  { icon: ShieldCheck, label: "Validación LLM", time: "1.2 s" },
  { icon: Zap, label: "Auto-aprobación reglas", time: "0.8 s" },
  { icon: Send, label: "Notificación push", time: "0.1 s" },
];

export function ComparisonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="comparison"
      ref={ref}
      className="relative w-full flex items-center justify-center px-4 sm:px-6 py-12 md:py-16 overflow-hidden min-h-dvh"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] md:w-200 h-[150vw] md:h-200 bg-[#7B2FFF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <span className="font-mono text-xs text-[#00F5FF] tracking-[0.2em] uppercase mb-3 block">
            // The Automation Lab
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#E8EDF5] leading-tight">
            Manual vs.{" "}
            <span className="text-[#00F5FF] text-glow-cyan">Automatizado</span>
          </h2>
          <p className="text-[#6B7A99] text-sm md:text-base mt-3 max-w-lg text-pretty">
            Observa cómo Novarcis transforma un proceso de horas en segundos.
          </p>
        </motion.div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Manual Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-xl border border-[#1a1f2e] bg-[#0D1117]/80 backdrop-blur-sm p-5 md:p-6"
          >
            <div className="inline-block font-mono text-[10px] tracking-[0.15em] uppercase text-[#6B7A99] border border-[#1a1f2e] rounded-full px-3 py-1 mb-5">
              // Proceso Manual
            </div>

            <div className="space-y-4">
              {manualSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-[#6B7A99] shrink-0" strokeWidth={1.5} />
                      <span className="text-sm text-[#E8EDF5]/80">{step.label}</span>
                    </div>
                    <span className="font-mono text-sm text-[#FF2D78] font-medium">{step.time}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Efficiency bar */}
            <div className="mt-6 pt-4 border-t border-[#1a1f2e]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#6B7A99] font-mono">Eficiencia</span>
                <span className="text-xs text-[#FF2D78] font-mono font-medium">23%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#1a1f2e]">
                <motion.div
                  className="h-full rounded-full bg-[#FF2D78]"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "23%" } : {}}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </div>
              <p className="font-mono text-xs text-[#6B7A99] mt-3">
                Total: ~3h 35min · Costo: $180/proceso
              </p>
            </div>
          </motion.div>

          {/* Automated Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-xl border border-[#00F5FF]/30 bg-[#0D1117]/80 backdrop-blur-sm p-5 md:p-6 shadow-[0_0_30px_rgba(0,245,255,0.08)]"
          >
            <div className="inline-block font-mono text-[10px] tracking-[0.15em] uppercase text-[#00F5FF] border border-[#00F5FF]/30 rounded-full px-3 py-1 mb-5 bg-[#00F5FF]/5">
              // Novarcis AI
            </div>

            <div className="space-y-4">
              {autoSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-[#00F5FF] shrink-0" strokeWidth={1.5} />
                      <span className="text-sm text-[#E8EDF5]/80">{step.label}</span>
                    </div>
                    <span className="font-mono text-sm text-[#00F5FF] font-medium">{step.time}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Efficiency bar */}
            <div className="mt-6 pt-4 border-t border-[#00F5FF]/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#6B7A99] font-mono">Eficiencia</span>
                <span className="text-xs text-[#00F5FF] font-mono font-medium">99.7%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#1a1f2e]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#00F5FF] to-[#7B2FFF]"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "99.7%" } : {}}
                  transition={{ duration: 1.2, delay: 0.9 }}
                />
              </div>
              <p className="font-mono text-xs text-[#00F5FF] mt-3">
                Total: 2.4 seg · Costo: $0.004/proceso
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
