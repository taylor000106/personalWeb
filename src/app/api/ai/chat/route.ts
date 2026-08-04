import { z } from "zod";
import { clientIp } from "@/lib/api";
import { streamAnswer, getAnswerMode } from "@/lib/ai/answer";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bodySchema = z.object({
  question: z.string().trim().min(2).max(500),
});

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit({
    key: `ai-chat:${ip}`,
    limit: 20,
    windowMs: 10 * 60 * 1000,
  });
  if (!limited.ok) {
    return Response.json(
      { error: "Too many requests", retryAfterSec: limited.retryAfterSec },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) {
    return Response.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const encoder = new TextEncoder();
  let closed = false;
  const mode = getAnswerMode();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: unknown) => {
        if (closed) return;
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      };

      try {
        send({ mode });
        for await (const event of streamAnswer(parsed.data.question)) {
          if (closed) break;
          if (event.type === "meta") {
            send({
              retrieval: event.meta.retrieval,
              sources: event.meta.sources,
              inScope: event.meta.inScope,
              mode: event.meta.mode || mode,
            });
          } else if (event.type === "text") {
            send({ text: event.text });
          }
        }
        send({ done: true });
      } catch (error) {
        const message = error instanceof Error ? error.message : "AI error";
        send({ error: message });
        send({ done: true });
      } finally {
        if (!closed) controller.close();
      }
    },
    cancel() {
      closed = true;
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
