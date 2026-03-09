"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoEntity, type LogoState } from "@/components/LogoEntity";
import Link from "next/link";
import { Send, ArrowLeft } from 'lucide-react'

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const MessageBubble = memo(({ message }: { message: Message }) => {
  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
        }`}
    >
      <div
        className={`max-w-[85%] md:max-w-[75%] ${message.role === "user"
          ? "order-1"
          : "flex items-start gap-3"
          }`}
      >
        {message.role === "assistant" && (
          <div className="shrink-0 w-8 h-8 rounded-full bg-linear-to-br from-[#00F5FF]/20 to-[#7B2FFF]/20 flex items-center justify-center">
            <div className="w-4 h-4">
              <svg viewBox="0 0 20 20" fill="none">
                <polygon
                  points="10,2 18,7 18,13 10,18 2,13 2,7"
                  stroke="#00F5FF"
                  strokeWidth="1.5"
                />
                <circle cx="10" cy="10" r="3" fill="#00F5FF" />
              </svg>
            </div>
          </div>
        )}

        <div
          className={`rounded-lg px-4 py-3 ${message.role === "user"
            ? "bg-[#00F5FF]/10 border border-[#00F5FF]/30 text-[#00F5FF] font-mono text-sm"
            : "bg-[#0D1117] border border-[#1a1f2e] text-[#E8EDF5]"
            }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>

          <span className="text-[10px] text-[#6B7A99] mt-2 block">
            {message.timestamp.toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </motion.div>
  );
});

MessageBubble.displayName = "MessageBubble";

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [logoState, setLogoState] = useState<LogoState>("idle");
  const [isInitialized, setIsInitialized] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const generateId = useCallback(
    () => Math.random().toString(36).substring(2, 9),
    []
  );

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end" });
  }, []);

  // Cargar mensajes iniciales y generar ID de sesión si no existe
  useEffect(() => {
    if (!sessionStorage.getItem("chatSessionId")) {
      sessionStorage.setItem("chatSessionId", "session-" + Date.now());
    }

    const savedMessages = localStorage.getItem("novarcis-chat-history");
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        // Recuperar fechas como objetos Date
        const restoredMessages = parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }));
        setMessages(restoredMessages);
      } catch (e) {
        console.error("Error parsing chat history:", e);
        setInitialGreeting();
      }
    } else {
      setInitialGreeting();
    }
    setIsInitialized(true);
  }, []);

  const setInitialGreeting = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hola. Soy novarcis. ¿En qué puedo ayudarte? Puedo responder preguntas sobre automatización, desarrollo con IA, o nuestros servicios.",
        timestamp: new Date(),
      },
    ]);
  };

  // Guardar mensajes temporales localmente cuando cambien
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("novarcis-chat-history", JSON.stringify(messages));
    }
  }, [messages, isInitialized]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setLogoState("thinking");

    try {
      // Map all previous messages except the current one being typed
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory,
          name: "visitante", // Default name according to the spec, this can be changed in the future
          sessionId: sessionStorage.getItem("chatSessionId") || "session-" + Date.now(),
        }),
      });

      const data = await response.json();

      setLogoState("speaking");

      const assistantMessage: Message = {
        id: generateId(),
        role: "assistant",
        content:
          data.reply ||
          "Lo siento, no pude procesar tu mensaje.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: "assistant",
          content:
            "Hubo un error de conexión con el webhook.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => setLogoState("idle"), 1500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row relative">
      <Link
        href="/"
        className="absolute top-4 left-4 z-50 flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-full bg-[#0D1117]/60 backdrop-blur-md border border-[#1a1f2e] text-[#6B7A99] hover:text-[#00F5FF] hover:border-[#00F5FF]/40 transition-all group"
      >
        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:-translate-x-1" />
        <span className="hidden sm:inline text-xs md:text-sm font-medium">Volver</span>
      </Link>

      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-linear-to-br from-[#080A0F] to-[#0D1117] relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00F5FF]/5 rounded-full blur-xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#7B2FFF]/5 rounded-full blur-xl" />
        </div>

        <div className="relative z-10 text-center">
          <LogoEntity state={logoState} size="xl" />

          <div className="mt-8">
            <h3 className="font-display text-2xl font-bold text-[#E8EDF5] mb-2 tracking-widest">
              NovarcisIA
            </h3>

            <div className="flex items-center justify-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${isLoading ? "bg-[#7B2FFF] animate-pulse" : "bg-[#00F5FF]"
                  }`}
              />

              <span className="text-sm text-[#6B7A99] font-mono">
                {isLoading ? "Procesando..." : "Online"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 lg:w-1/2 flex flex-col bg-[#060810] border-l border-[#1a1f2e]">

        <div className="flex items-center gap-3 px-6 py-4 border-b border-[#1a1f2e] lg:pt-4 pt-14">
          <div className="lg:hidden">
            <LogoEntity state={logoState} size="sm" />
          </div>
          <div>
            <h4 className="font-semibold text-[#E8EDF5]">
              Novarcis IA
            </h4>
            <span className="text-xs text-[#6B7A99] font-mono">
              {isLoading ? "Escribiendo..." : "Sistema activo"}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">

          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
              />
            ))}
          </AnimatePresence>

          {isLoading && (
            <div className="flex gap-2 items-center text-[#7B2FFF]">
              <span className="typing-dot"></span>
              <span className="typing-dot delay-150"></span>
              <span className="typing-dot delay-300"></span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-[#1a1f2e]">
          <div className="flex items-center gap-2 bg-[#0D1117] border border-[#1a1f2e] rounded-lg px-4 py-3">
            <span className="text-[#00F5FF] font-mono">{">"}</span>
            <input
              ref={inputRef}
              value={input}
              autoFocus
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu consulta..."
              className="flex-1 bg-transparent text-sm text-[#E8EDF5] outline-none"
            />

            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="p-2 rounded-md bg-[#00F5FF]/10 hover:bg-[#00F5FF]/20 text-[#00F5FF]"
            >
              <Send size={16} />
            </button>

          </div>

          <p className="text-[10px] text-[#6B7A99] mt-2 text-center">
            Enter para enviar - Automatizado con n8n
          </p>
        </div>
      </div>
    </div>
  );
}