"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", message: "" });

    // Reset success state after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="snap-section relative flex items-center justify-center px-6 py-20 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/4 w-200 h-200 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(ellipse, rgba(0, 245, 255, 0.15) 0%, transparent 60%)",
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/4 w-150 h-150 rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(ellipse, rgba(123, 47, 255, 0.2) 0%, transparent 60%)",
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-100 h-100 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255, 45, 120, 0.15) 0%, transparent 60%)",
          }}
          animate={{
            x: [0, 60, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-2xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-[#E8EDF5] mb-4 text-balance">
            ¿Listo para operar en el{" "}
            <span className="text-[#00F5FF] text-glow-cyan">futuro</span>?
          </h2>
          <p className="text-[#6B7A99] text-lg text-pretty">
            Cuéntanos tu proyecto y exploremos las posibilidades juntos
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-mono text-[#6B7A99] mb-2"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              required
              value={formState.name}
              onChange={(e) =>
                setFormState((s) => ({ ...s, name: e.target.value }))
              }
              className="w-full px-4 py-3 bg-[#0D1117] border border-[#1a1f2e] rounded-lg text-[#E8EDF5] placeholder:text-[#6B7A99]/50 focus:outline-none focus:border-[#00F5FF]/50 transition-colors"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-mono text-[#6B7A99] mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={formState.email}
              onChange={(e) =>
                setFormState((s) => ({ ...s, email: e.target.value }))
              }
              className="w-full px-4 py-3 bg-[#0D1117] border border-[#1a1f2e] rounded-lg text-[#E8EDF5] placeholder:text-[#6B7A99]/50 focus:outline-none focus:border-[#00F5FF]/50 transition-colors"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-mono text-[#6B7A99] mb-2"
            >
              Mensaje
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={formState.message}
              onChange={(e) =>
                setFormState((s) => ({ ...s, message: e.target.value }))
              }
              className="w-full px-4 py-3 bg-[#0D1117] border border-[#1a1f2e] rounded-lg text-[#E8EDF5] placeholder:text-[#6B7A99]/50 focus:outline-none focus:border-[#00F5FF]/50 transition-colors resize-none"
              placeholder="Cuéntanos sobre tu proyecto..."
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            className="w-full py-4 px-8 rounded-lg font-medium text-[#080A0F] bg-[#00F5FF] glow-cyan transition-all hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  className="w-5 h-5 border-2 border-[#080A0F]/30 border-t-[#080A0F] rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Enviando...
              </span>
            ) : isSubmitted ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Mensaje enviado
              </span>
            ) : (
              "Iniciar proyecto"
            )}
          </motion.button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-[#6B7A99] mt-8"
        >
          Respuesta al instante, ventaja de automatizarlo todo ;)
        </motion.p>
      </div>
    </section>
  );
}
