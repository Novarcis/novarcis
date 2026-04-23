import { NextResponse } from "next/server";

export interface N8nMessagePayload {
    message: string;
    conversationHistory: { role: "user" | "assistant"; content: string }[];
    name?: string;
    sessionId?: string;
}

export interface N8nSuccessResponse {
    success: true;
    message: string;
}

export interface N8nErrorResponse {
    success: false;
    message: string;
}

export type N8nResponse = N8nSuccessResponse | N8nErrorResponse;

export class N8nService {
    private webhookUrl: string;

    constructor() {
        this.webhookUrl = process.env.N8N_WEBHOOK_URL || "";
    }

    isConfigured(): boolean {
        return this.webhookUrl !== "";
    }

    async sendMessage(payload: N8nMessagePayload): Promise<N8nResponse> {
        if (!this.isConfigured()) {
            return {
                success: false,
                message: "El webhook de n8n no está configurado en las variables de entorno.",
            };
        }

        try {
            const response = await fetch(this.webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    message: payload.message,
                    conversationHistory: payload.conversationHistory,
                    name: payload.name || "visitante",
                    sessionId: payload.sessionId,
                    timestamp: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                return {
                    success: false,
                    message: `Error al conectar con el asistente.`,
                };
            }

            const textResponse = await response.text();

            let data: any = {};
            if (textResponse) {
                try {
                    data = JSON.parse(textResponse);
                    // Si n8n devuelve un array (común en webhooks), extraemos el primer elemento
                    if (Array.isArray(data) && data.length > 0) {
                        data = data[0];
                    }

                    // A veces n8n devuelve cosas dentro de "json" u otros Wrappers.
                    if (data && data.json) {
                        data = data.json;
                    }
                } catch (e) {
                    // Fallback to raw text

                    data = { message: textResponse };
                }
            }


            // According to the user definition: {{ { success: true, message: $json.aiResponse || $json.response } }}
            // We can check if it explicitly sends success/message
            if (data && typeof data.success !== 'undefined' && data.message) {
                return { success: !!data.success, message: String(data.message) };
            }

            // Fallback if the webhook returns something else:
            const reply = data.message || data.output || data.text || data.reply || data.aiResponse || data.response || "Respuesta recibida pero sin formato esperado.";

            return {
                success: true,
                message: reply,
            };
        } catch (error) {
            // Eliminar traza completa de error de cliente por seguridad

            return {
                success: false,
                message: "Ocurrió un error al intentar enviar el mensaje al servidor.",
            };
        }
    }
}

export const n8nService = new N8nService();

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const result = await n8nService.sendMessage({
            message: body.message,
            conversationHistory: body.conversationHistory || [],
            name: body.name,
            sessionId: body.sessionId
        });

        if (!result.success) {
            return NextResponse.json(result, { status: 400 });
        }

        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        console.error("Error en la ruta /api/chat:", error);
        return NextResponse.json(
            { success: false, message: "Error interno del servidor en Next.js." },
            { status: 500 }
        );
    }
}