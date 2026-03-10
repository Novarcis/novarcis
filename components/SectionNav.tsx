"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "hero", label: "Inicio" },
  { id: "problem", label: "El Problema" },
  { id: "services", label: "Servicios" },
  { id: "why-us", label: "Por Qué Nosotros" },
  { id: "process", label: "Proceso" },
];


export function SectionNav() {
  const [activeSection, setActiveSection] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | "ai" | null>(null);

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = sections.findIndex((s) => s.id === entry.target.id);
          if (index !== -1) setActiveSection(index);
        });
      },
      { threshold: 0.55 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const scrollToSection = (index: number) => {
    const element = document.getElementById(sections[index].id);
    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const isVisible = activeSection !== 0;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.35 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4"
          aria-label="Navegación de secciones"
        >
          {sections.map((section, i) => (
            <div
              key={section.id}
              className="relative flex items-center justify-end"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >

              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-8 px-3 py-1.5 bg-[#0D1117]/90 backdrop-blur-sm border border-[#00F5FF]/20 rounded text-sm text-[#E8EDF5] whitespace-nowrap font-mono"
                  >
                    {section.label}
                  </motion.span>
                )}
              </AnimatePresence>

              <button
                onClick={() => scrollToSection(i)}
                className="relative group p-2"
                aria-label={`Ir a ${section.label}`}
                aria-current={activeSection === i ? "true" : undefined}
              >
                <motion.div
                  className="rounded-full mx-auto"
                  animate={{
                    width: activeSection === i ? 12 : 8,
                    height: activeSection === i ? 12 : 8,
                    backgroundColor:
                      activeSection === i
                        ? "#00F5FF"
                        : "rgba(107,122,153,0.5)",
                    boxShadow:
                      activeSection === i
                        ? "0 0 12px rgba(0,245,255,0.6), 0 0 24px rgba(0,245,255,0.3)"
                        : "none",
                  }}
                  whileHover={{
                    scale: 1.3,
                    backgroundColor: "#00F5FF",
                  }}
                  transition={{ duration: 0.2 }}
                />
              </button>
            </div>
          ))}

          <div
            className="relative flex items-center justify-end mt-3"
            onMouseEnter={() => setHoveredIndex("ai")}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === "ai" && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-8 px-3 py-1.5 bg-[#0D1117]/90 backdrop-blur-sm border border-[#7B2FFF]/30 rounded text-sm text-[#E8EDF5] whitespace-nowrap font-mono"
                >
                  Chat IA
                </motion.span>
              )}
            </AnimatePresence>

            <button onClick={() => window.dispatchEvent(new Event("open-ai-chat"))} className="p-2">
              <motion.div
                className="w-3 h-3 rounded-full bg-linear-to-r from-[#7B2FFF] to-[#00F5FF]"
                whileHover={{
                  scale: 1.4,
                  boxShadow:
                    "0 0 12px rgba(123,47,255,0.6), 0 0 24px rgba(0,245,255,0.4)",
                }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = sections.findIndex((s) => s.id === entry.target.id);
          if (index !== -1) setActiveSection(index);
        });
      },
      { threshold: 0.25 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const scrollToSection = (index: number) => {
    setIsOpen(false);

    setTimeout(() => {
      const element = document.getElementById(sections[index].id);
      element?.scrollIntoView({ behavior: "smooth" });
    }, 250);
  };

  const isVisible = activeSection !== 0 || isOpen;

  return (
    <div className="md:hidden">
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(!isOpen)}
            className="fixed top-6 right-6 z-60 w-12 h-12 flex flex-col items-center justify-center bg-[#0D1117]/80 backdrop-blur-md border border-[#00F5FF]/20 rounded-full shadow-[0_0_15px_rgba(0,245,255,0.1)]"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-[#00F5FF] block mb-1.5"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-5 h-0.5 bg-[#00F5FF] block mb-1.5"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-[#00F5FF] block"
            />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 bg-[#080A0F]/95 flex flex-col items-center justify-center"
          >
            <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[#7B2FFF]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-[#00F5FF]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col items-center gap-8 w-full px-6 z-10">
              {sections.map((section, i) => (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                  onClick={() => scrollToSection(i)}
                  className={`font-display text-2xl tracking-wide transition-colors ${activeSection === i
                    ? "text-[#00F5FF] text-glow-cyan font-bold"
                    : "text-[#E8EDF5] hover:text-[#00F5FF]"
                    }`}
                >
                  {section.label}
                </motion.button>
              ))}

              <button
                onClick={() => {
                  setIsOpen(false);
                  window.dispatchEvent(new Event("open-ai-chat"));
                }}
                className="font-display text-2xl text-[#7B2FFF] hover:text-[#00F5FF] transition-colors"
              >
                Chat IA
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-12 font-mono text-xs text-[#6B7A99] tracking-widest uppercase"
            >
              Novarcis
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}