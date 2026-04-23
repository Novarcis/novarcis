"use client";

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

const particleColors = [
  "#a78bfa", "#fbbf24", "#00F5FF",
  "#a78bfa", "#fbbf24", "#00F5FF",
  "#a78bfa", "#fbbf24",
];

const particleShadows = [
  "0 0 8px rgba(167, 139, 250, 0.8)",
  "0 0 8px rgba(251, 191, 36, 0.8)",
  "0 0 8px rgba(0, 245, 255, 0.8)",
  "0 0 8px rgba(167, 139, 250, 0.8)",
  "0 0 8px rgba(251, 191, 36, 0.8)",
  "0 0 8px rgba(0, 245, 255, 0.8)",
  "0 0 8px rgba(167, 139, 250, 0.8)",
  "0 0 8px rgba(251, 191, 36, 0.8)",
];

export function LogoEntity({
  state = "idle",
  size = "lg",
  className = "",
}: LogoEntityProps) {
  const dimension = sizeMap[size];

  return (
    <div
      className={`relative logo-entity logo-entity-${state} ${className}`}
      style={{ width: dimension, height: dimension }}
    >
      {/* Outer glow layer - purple/violet */}
      <div
        className="logo-glow-outer absolute inset-0 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(167, 139, 250, 0.5) 0%, rgba(139, 92, 246, 0.3) 40%, transparent 70%)",
        }}
      />

      {/* Inner glow layer - golden/amber accent */}
      <div
        className="logo-glow-inner absolute inset-0 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(245, 158, 11, 0.2) 30%, transparent 60%)",
        }}
      />

      {/* Core glow - white/cyan center */}
      <div
        className="logo-glow-core absolute inset-0 rounded-full blur-xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(0, 245, 255, 0.3) 30%, transparent 50%)",
        }}
      />

      {/* Orbiting particles - CSS only, no JS per-frame trig */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="logo-orbit-wrapper absolute inset-0"
          style={{ animationDelay: `${-i * 0.5}s` }}
        >
          <div
            className="logo-orbit-dot absolute rounded-full"
            style={{
              width: 3,
              height: 3,
              background: particleColors[i],
              boxShadow: particleShadows[i],
              top: "5%",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </div>
      ))}

      {/* Main logo image with rotation */}
      <div
        className="logo-core relative w-full h-full will-change-transform"
        style={{ transformOrigin: "center center" }}
      >
        <Image
          src="/images/Logo-novarcis.webp"
          alt="Novarcis Logo"
          fill
          className="object-contain"
          style={{
            filter: "drop-shadow(0 0 15px rgba(167, 139, 250, 0.4))",
          }}
          priority
        />
      </div>

      {/* Energy pulse rings */}
      {state !== "dormant" && (
        <>
          <div className="logo-energy-ring-1 absolute inset-0 rounded-full border border-violet-400/30" />
          <div className="logo-energy-ring-2 absolute inset-0 rounded-full border border-amber-400/20" />
        </>
      )}
    </div>
  );
}
