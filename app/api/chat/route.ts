import { NextResponse } from "next/server";
import { n8nService } from "@/app/services/n8nService";

// Basic in-memory rate limiter (in a real-world edge scenario, consider Upstash/Redis)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_MAX = 5; // 5 messages
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // per minute

export async function POST(req: Request) {
  try {
    // 1. IP & CORS Basic Protection
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

    // Rate limiter execution
    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW_MS;

    // Cleanup old entries periodically
    if (Math.random() < 0.1) {
      for (const [key, value] of rateLimitMap.entries()) {
        if (value.timestamp < windowStart) rateLimitMap.delete(key);
      }
    }

    const currentRate = rateLimitMap.get(ip) || { count: 0, timestamp: now };
    if (currentRate.timestamp < windowStart) {
      currentRate.count = 1;
      currentRate.timestamp = now;
    } else {
      currentRate.count++;
    }
    rateLimitMap.set(ip, currentRate);

    if (currentRate.count > RATE_LIMIT_MAX) {
      return NextResponse.json(
        { reply: "Has alcanzado el límite de mensajes permitidos por minuto. Por favor, espera un momento antes de enviar otro." },
        { status: 429 }
      );
    }

    // 2. Input extraction
    const body = await req.json();
    let { message, sessionId, conversationHistory, name } = body;

    // 3. Payload Validation and Token Limiting
    // Limit message size to prevent huge prompt injection
    if (!message || typeof message !== "string") {
      return NextResponse.json({ reply: "Mensaje inválido." }, { status: 400 });
    }
    const safeMessage = message.substring(0, 500).trim();

    // Limit conversation history to the last 10 messages (5 turns) to save tokens
    let safeHistory: { role: "assistant" | "user"; content: string }[] = [];
    if (Array.isArray(conversationHistory)) {
      safeHistory = conversationHistory.slice(-10).map(msg => ({
        // Ensure TS knows the role is exactly one of these two strings
        role: (msg.role === "assistant" ? "assistant" : "user") as "assistant" | "user",
        content: typeof msg.content === "string" ? msg.content.substring(0, 500) : ""
      })).filter(msg => msg.content.length > 0);
    }

    const safeName = typeof name === "string" ? name.substring(0, 50).trim() : "visitante";
    const safeSessionId = typeof sessionId === "string" ? sessionId.substring(0, 100).trim() : `session-${Date.now()}`;

    // Check if N8N webhook URL is configured
    if (!n8nService.isConfigured()) {
      return NextResponse.json({
        reply: getFallbackResponse(safeMessage),
      });
    }

    // Forward sanitized message to N8N webhook
    const response = await n8nService.sendMessage({
      message: safeMessage,
      sessionId: safeSessionId,
      conversationHistory: safeHistory,
      name: safeName
    });

    if (!response.success) {
      return NextResponse.json(
        { reply: response.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      reply: response.message,
    });
  } catch (error) {
    // Only log essential errors, avoid exposing objects directly in prod
    console.error("Chat API error processing request.");
    return NextResponse.json(
      {
        reply:
          "Lo siento, hubo un error temporal en el servidor. Por favor intenta de nuevo.",
      },
      { status: 500 }
    );
  }
}

// Fallback responses when N8N is not configured
function getFallbackResponse(message: string): string {
  const lowercaseMessage = message.toLowerCase();

  if (
    lowercaseMessage.includes("precio") ||
    lowercaseMessage.includes("costo") ||
    lowercaseMessage.includes("cuanto")
  ) {
    return "Los precios varían según la complejidad del proyecto. Nuestros servicios van desde automatizaciones simples con N8N hasta arquitecturas empresariales complejas. ¿Podrías contarme más sobre tu proyecto para darte una estimación más precisa?";
  }

  if (
    lowercaseMessage.includes("servicio") ||
    lowercaseMessage.includes("ofrecen")
  ) {
    return "Ofrecemos tres niveles de servicio: 1) Automatización No-Code con N8N, Make y Zapier. 2) Desarrollo con IA incluyendo LLMs, agentes y RAG pipelines. 3) Ingeniería de Software Compleja con microservicios y arquitecturas escalables. ¿Cuál te interesa más?";
  }

  if (
    lowercaseMessage.includes("ia") ||
    lowercaseMessage.includes("inteligencia artificial") ||
    lowercaseMessage.includes("llm")
  ) {
    return "Somos expertos en integración de IA. Trabajamos con LLMs personalizados, agentes autónomos, RAG pipelines y fine-tuning de modelos. Podemos crear chatbots inteligentes, sistemas de análisis de documentos, o cualquier solución que necesite inteligencia artificial.";
  }

  if (
    lowercaseMessage.includes("automatiz") ||
    lowercaseMessage.includes("workflow")
  ) {
    return "La automatización es nuestro core. Desde flujos simples con N8N hasta pipelines de datos complejos con código Python. Identificamos procesos repetitivos en tu negocio y los automatizamos para que tu equipo se enfoque en lo que importa.";
  }

  if (
    lowercaseMessage.includes("tiempo") ||
    lowercaseMessage.includes("duración")
  ) {
    return "El tiempo de desarrollo depende del alcance. Una automatización simple puede estar lista en 1-2 semanas. Proyectos más complejos con IA pueden tomar 4-8 semanas. Siempre trabajamos con sprints cortos y demos frecuentes para que veas el progreso.";
  }

  if (lowercaseMessage.includes("hola") || lowercaseMessage.includes("hey")) {
    return "¡Hola! Soy el asistente de NovarcisIA. Estoy aquí para responder tus preguntas sobre automatización, desarrollo con IA, y nuestros servicios. ¿En qué puedo ayudarte?";
  }

  return "Gracias por tu mensaje. Para darte la mejor información, ¿podrías especificar si te interesa saber sobre nuestros servicios de automatización, desarrollo con IA, o tienes un proyecto específico en mente? También puedes usar el formulario de contacto para que nuestro equipo te responda directamente.";
}
