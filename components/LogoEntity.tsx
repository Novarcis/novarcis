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

const imageSizes: Record<string, string> = {
  sm: "80px",
  md: "150px",
  lg: "280px",
  xl: "400px",
};

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

      {/* Main logo image */}
      <div
        className={`logo-core relative w-full h-full${state !== "idle" && state !== "dormant" ? " will-change-transform" : ""}`}
        style={{ transformOrigin: "center center" }}
      >
        <Image
          src="/images/Logo-novarcis.webp"
          alt="Novarcis Logo"
          fill
          sizes={imageSizes[size]}
          className="object-contain"
          style={{
            filter: "drop-shadow(0 0 15px rgba(167, 139, 250, 0.4))",
          }}
          priority={size === "md" || size === "lg"}
        />
      </div>
    </div>
  );
}
