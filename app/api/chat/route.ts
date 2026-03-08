import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, sessionId } = await req.json();

    // Check if N8N webhook URL is configured
    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      // Return a fallback response when webhook is not configured
      return NextResponse.json({
        reply: getFallbackResponse(message),
      });
    }

    // Forward message to N8N webhook
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        sessionId,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`N8N webhook responded with status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      reply: data.output || data.text || data.reply || data.message,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply:
          "Lo siento, hubo un error al procesar tu mensaje. Por favor intenta de nuevo.",
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
