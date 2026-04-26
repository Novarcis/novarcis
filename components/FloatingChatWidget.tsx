"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoEntity, type LogoState } from "@/components/LogoEntity";
import { Send, X, MessageSquare, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                }`}
        >
            <div
                className={`max-w-[85%] ${message.role === "user" ? "order-1" : "flex items-start gap-2"
                    }`}
            >
                {message.role === "assistant" && (
                    <div className="shrink-0 w-6 h-6 rounded-full bg-linear-to-br from-[#00F5FF]/20 to-[#7B2FFF]/20 flex items-center justify-center mt-1">
                        <div className="w-3 h-3">
                            <svg viewBox="0 0 20 20" fill="none">
                                <polygon
                                    points="10,2 18,7 18,13 10,18 2,13 2,7"
                                    stroke="#00F5FF"
                                    strokeWidth="1.5"
                                />
                            </svg>
                        </div>
                    </div>
                )}

                <div
                    className={`rounded-xl px-3 py-2 shadow-sm ${message.role === "user"
                        ? "bg-[#00F5FF]/10 border border-[#00F5FF]/30 text-[#00F5FF] font-mono text-xs rounded-tr-sm"
                        : "bg-[#0d1522] border border-[#1a1f2e] text-[#E8EDF5] text-sm leading-relaxed rounded-tl-sm shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                        }`}
                >
                    <p className="whitespace-pre-wrap">{message.content}</p>

                    <span className="text-[9px] text-[#6B7A99] mt-1.5 block text-right font-mono">
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

export function FloatingChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [logoState, setLogoState] = useState<LogoState>("idle");
    const [isHoveringWidget, setIsHoveringWidget] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Expose a global method to open the chat (useful for external buttons)
    useEffect(() => {
        const handleOpenChat = () => setIsOpen(true);
        window.addEventListener("open-ai-chat", handleOpenChat);
        return () => window.removeEventListener("open-ai-chat", handleOpenChat);
    }, []);

    const generateId = useCallback(
        () => Math.random().toString(36).substring(2, 9),
        []
    );

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
    }, []);

    useEffect(() => {
        if (!sessionStorage.getItem("chatSessionId")) {
            sessionStorage.setItem("chatSessionId", "session-" + Date.now());
        }

        // Auto-clean old persistent storage if any remains
        localStorage.removeItem("novarcis-chat-history");

        const savedMessages = sessionStorage.getItem("novarcis-chat-history");
        if (savedMessages) {
            try {
                const parsed = JSON.parse(savedMessages);
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
                    "Hola. Soy Novarcis. ¿En qué puedo ayudarte? Puedo responder preguntas sobre automatización, desarrollo con IA, o nuestros servicios.",
                timestamp: new Date(),
            },
        ]);
    };

    useEffect(() => {
        if (isInitialized) {
            sessionStorage.setItem("novarcis-chat-history", JSON.stringify(messages));
        }
    }, [messages, isInitialized]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                scrollToBottom();
                inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen, messages, scrollToBottom]);

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
            const conversationHistory = messages.map((msg) => ({
                role: msg.role,
                content: msg.content,
            }));

            let sessionId = sessionStorage.getItem("chatSessionId");
            if (!sessionId) {
                sessionId = "session-" + Date.now();
                sessionStorage.setItem("chatSessionId", sessionId);
            }

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage.content,
                    conversationHistory,
                    name: "visitante",
                    sessionId,
                }),
            });

            const data = await response.json();
            setLogoState("speaking");

            const assistantMessage: Message = {
                id: generateId(),
                role: "assistant",
                content: data.message || data.reply || "Lo siento, no pude procesar tu mensaje.",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    id: generateId(),
                    role: "assistant",
                    content: "Hubo un error de conexión con el webhook.",
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
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-100 group"
                        onMouseEnter={() => setIsHoveringWidget(true)}
                        onMouseLeave={() => setIsHoveringWidget(false)}
                    >
                        {/* Tooltip Automático */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: isHoveringWidget ? 1 : 0, x: isHoveringWidget ? 0 : 20 }}
                            transition={{ duration: 0.2 }}
                            className="hidden md:block absolute right-[115%] top-1/2 -translate-y-1/2 px-4 py-2 bg-[#0D1117]/90 backdrop-blur-md border border-[#00F5FF]/30 rounded-xl whitespace-nowrap text-[#E8EDF5] shadow-xl text-sm font-medium mr-2"
                        >
                            Habla con nuestra Inteligencia Artificial
                        </motion.div>

                        {/* Float Button Core */}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="relative w-16 h-16 flex items-center justify-center rounded-full bg-[#080a0f]/80 backdrop-blur-xl border border-[#00F5FF]/40 shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:shadow-[0_0_30px_rgba(0,245,255,0.6)] transition-all hover:scale-105"
                        >
                            {/* Pulsing ring */}
                            <div className="absolute inset-0 rounded-full bg-[#00F5FF]/20 animate-ping opacity-50" style={{ animationDuration: "3s" }} />

                            <LogoEntity state="idle" size="sm" className="w-10 h-10 -ml-1" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 250 }}
                        className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-[400px] h-dvh sm:h-[650px] max-h-dvh z-100 sm:rounded-2xl border-0 sm:border border-[#1a1f2e] bg-[#060810]/95 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="shrink-0 flex items-center justify-between px-5 py-4 bg-[#080A0F] border-b border-[#1a1f2e] z-10 shadow-md">
                            <div className="flex items-center gap-3">
                                <LogoEntity state={logoState} size="sm" className="w-8 h-8" />
                                <div>
                                    <h4 className="font-semibold text-[#E8EDF5] text-sm">Novarcis IA</h4>
                                    <div className="flex items-center gap-2">
                                        <span className={`w-1.5 h-1.5 rounded-full ${isLoading ? "bg-[#7B2FFF] animate-pulse" : "bg-[#00F5FF]"}`} />
                                        <span className="text-[10px] text-[#6B7A99] font-mono uppercase tracking-wider">
                                            {isLoading ? "Procesando..." : "Sistema en línea"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 rounded-full bg-[#1a1f2e]/50 hover:bg-[#1a1f2e] text-[#6B7A99] hover:text-white transition-colors"
                                aria-label="Cerrar chat"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 scrollbar-thin scrollbar-thumb-[#1a1f2e] scrollbar-track-transparent bg-linear-to-b from-transparent to-[#080A0F]/20 relative">
                            <AnimatePresence initial={false}>
                                {messages.map((message) => (
                                    <MessageBubble key={message.id} message={message} />
                                ))}
                            </AnimatePresence>

                            {isLoading && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1 items-center text-[#7B2FFF] p-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#7B2FFF] animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#7B2FFF] animate-bounce" style={{ animationDelay: "150ms" }} />
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#7B2FFF] animate-bounce" style={{ animationDelay: "300ms" }} />
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} className="h-1" />
                        </div>

                        {/* Input Area */}
                        <div className="shrink-0 p-3 pt-2 bg-[#080A0F] border-t border-[#1a1f2e] z-10 w-full mb-0 sm:mb-2 max-w-full overflow-hidden">
                            <div className="flex items-end gap-2 bg-[#10141d] border border-[#1a1f2e] rounded-xl pl-3 pr-1.5 py-1.5 focus-within:border-[#00F5FF]/50 transition-colors shadow-inner">

                                <textarea
                                    ref={inputRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Mensaje a Novarcis..."
                                    rows={1}
                                    className="flex-1 bg-transparent text-sm min-h-[40px] max-h-[120px] py-2.5 text-[#E8EDF5] outline-none resize-none scrollbar-none placeholder:text-[#6B7A99] font-sans"
                                    style={{
                                        lineHeight: "1.25rem",
                                        wordWrap: "break-word",
                                        whiteSpace: "pre-wrap",
                                        overflowWrap: "break-word"
                                    }}
                                />

                                <button
                                    onClick={sendMessage}
                                    disabled={!input.trim() || isLoading}
                                    className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-[#00F5FF]/10 hover:bg-[#00F5FF]/20 text-[#00F5FF] disabled:opacity-30 disabled:hover:bg-[#00F5FF]/10 transition-all mb-0.5"
                                    aria-label="Enviar"
                                >
                                    <Send size={15} className="transform translate-x-px translate-y-px" />
                                </button>
                            </div>

                            <div className="flex items-center justify-center gap-1 mt-2 mb-1">
                                <span className="text-[9px] text-[#6B7A99] font-mono uppercase tracking-widest opacity-80">
                                    Powered by Novarcis AI Workflow
                                </span>
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
