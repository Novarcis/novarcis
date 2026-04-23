"use client";

import dynamic from "next/dynamic";

const FloatingChatWidget = dynamic(
  () => import("@/components/FloatingChatWidget").then((mod) => mod.FloatingChatWidget),
  { ssr: false }
);

export function LazyChat() {
  return <FloatingChatWidget />;
}
