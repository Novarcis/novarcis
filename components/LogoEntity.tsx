"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

export type LogoState = "idle" | "speaking" | "thinking" | "dormant";

interface LogoEntityProps {
  state?: LogoState;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: 80,
  md: 150,
  lg: 280,
  xl: 400,
};

export function LogoEntity({
  state = "idle",
  size = "lg",
  className = "",
}: LogoEntityProps) {
  const controls = useAnimation();
  const glowControls = useAnimation();
  const innerGlowControls = useAnimation();
  const dimension = sizeMap[size];

  useEffect(() => {
    switch (state) {
      case "idle":
        controls.start({
          rotate: 360,
          scale: 1,
          transition: { duration: 20, repeat: Infinity, ease: "linear" },
        });
        glowControls.start({
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.05, 1],
          transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        });
        innerGlowControls.start({
          opacity: [0.3, 0.6, 0.3],
          scale: [0.8, 1, 0.8],
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        });
        break;
      case "speaking":
        controls.start({
          rotate: [0, 5, -5, 3, -3, 0],
          scale: [1, 1.08, 0.95, 1.05, 0.98, 1],
          transition: { duration: 0.4, repeat: Infinity, ease: "easeInOut" },
        });
        glowControls.start({
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.3, 1],
          transition: { duration: 0.25, repeat: Infinity, ease: "easeInOut" },
        });
        innerGlowControls.start({
          opacity: [0.5, 1, 0.5],
          scale: [0.9, 1.2, 0.9],
          transition: { duration: 0.2, repeat: Infinity, ease: "easeInOut" },
        });
        break;
      case "thinking":
        controls.start({
          rotate: 360,
          scale: [1, 0.92, 1],
          transition: {
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          },
        });
        glowControls.start({
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.15, 1],
          transition: { duration: 1, repeat: Infinity, ease: "easeInOut" },
        });
        innerGlowControls.start({
          opacity: [0.2, 0.7, 0.2],
          scale: [0.7, 1.1, 0.7],
          transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
        });
        break;
      case "dormant":
        controls.start({
          rotate: 360,
          scale: 1,
          transition: { duration: 40, repeat: Infinity, ease: "linear" },
        });
        glowControls.start({
          opacity: 0.2,
          scale: 1,
          transition: { duration: 2 },
        });
        innerGlowControls.start({
          opacity: 0.1,
          scale: 0.8,
          transition: { duration: 2 },
        });
        break;
    }
  }, [state, controls, glowControls, innerGlowControls]);

  return (
    <div
      className={`relative ${className}`}
      style={{ width: dimension, height: dimension }}
    >
      {/* Outer glow layer - purple/violet */}
      <motion.div
        className="absolute inset-0 rounded-full blur-3xl"
        animate={glowControls}
        style={{
          background:
            "radial-gradient(circle, rgba(167, 139, 250, 0.5) 0%, rgba(139, 92, 246, 0.3) 40%, transparent 70%)",
          transform: "scale(1.5)",
        }}
      />

      {/* Inner glow layer - golden/amber accent */}
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl"
        animate={innerGlowControls}
        style={{
          background:
            "radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(245, 158, 11, 0.2) 30%, transparent 60%)",
          transform: "scale(1.2)",
        }}
      />

      {/* Core glow - white/cyan center */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl"
        animate={{
          opacity: state === "speaking" ? [0.4, 0.8, 0.4] : [0.2, 0.4, 0.2],
          scale: state === "speaking" ? [0.6, 0.9, 0.6] : [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: state === "speaking" ? 0.3 : 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(0, 245, 255, 0.3) 30%, transparent 50%)",
        }}
      />

      {/* Orbiting particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: state === "speaking" ? 4 : 3,
            height: state === "speaking" ? 4 : 3,
            background:
              i % 3 === 0
                ? "#a78bfa"
                : i % 3 === 1
                  ? "#fbbf24"
                  : "#00F5FF",
            boxShadow:
              i % 3 === 0
                ? "0 0 8px rgba(167, 139, 250, 0.8)"
                : i % 3 === 1
                  ? "0 0 8px rgba(251, 191, 36, 0.8)"
                  : "0 0 8px rgba(0, 245, 255, 0.8)",
            left: "50%",
            top: "50%",
          }}
          animate={{
            x: [
              Math.cos((i * Math.PI * 2) / 8) * (dimension * 0.45) - 2,
              Math.cos((i * Math.PI * 2) / 8 + Math.PI / 4) * (dimension * 0.5) - 2,
              Math.cos((i * Math.PI * 2) / 8) * (dimension * 0.45) - 2,
            ],
            y: [
              Math.sin((i * Math.PI * 2) / 8) * (dimension * 0.45) - 2,
              Math.sin((i * Math.PI * 2) / 8 + Math.PI / 4) * (dimension * 0.5) - 2,
              Math.sin((i * Math.PI * 2) / 8) * (dimension * 0.45) - 2,
            ],
            opacity: state === "dormant" ? 0.3 : [0.5, 1, 0.5],
            scale: state === "speaking" ? [1, 1.5, 1] : 1,
          }}
          transition={{
            duration: state === "speaking" ? 0.5 : 4,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Main logo image with rotation */}
      <motion.div
        className="relative w-full h-full"
        animate={controls}
        style={{ transformOrigin: "center center" }}
      >
        <Image
          src="/images/Logo-novarcis.png"
          alt="NexusAI Logo - Geometric sacred entity"
          fill
          className="object-contain drop-shadow-2xl"
          style={{
            filter:
              state === "speaking"
                ? "drop-shadow(0 0 30px rgba(167, 139, 250, 0.8)) drop-shadow(0 0 60px rgba(139, 92, 246, 0.5))"
                : state === "thinking"
                  ? "drop-shadow(0 0 20px rgba(167, 139, 250, 0.6)) drop-shadow(0 0 40px rgba(139, 92, 246, 0.4))"
                  : state === "dormant"
                    ? "drop-shadow(0 0 10px rgba(167, 139, 250, 0.3))"
                    : "drop-shadow(0 0 15px rgba(167, 139, 250, 0.5)) drop-shadow(0 0 30px rgba(139, 92, 246, 0.3))",
          }}
          priority
        />
      </motion.div>

      {/* Energy pulse rings */}
      {state !== "dormant" && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full border border-violet-400/30"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: state === "speaking" ? 0.8 : 3,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-amber-400/20"
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.2, 0, 0.2],
            }}
            transition={{
              duration: state === "speaking" ? 1 : 4,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.5,
            }}
          />
        </>
      )}
    </div>
  );
}
