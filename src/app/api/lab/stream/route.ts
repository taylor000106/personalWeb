export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CHUNKS = [
  "# Why Next.js for this site\n\n",
  "This portfolio is built with **Next.js 15 App Router**.\n\n",
  "## What you get\n\n",
  "- Server Components for SEO-friendly sections\n",
  "- Client islands for particles / motion\n",
  "- Route Handlers for auth, CRUD, and **SSE**\n\n",
  "## Streaming pattern\n\n",
  "AI chat UIs usually push tokens over SSE:\n\n",
  "```\n",
  "EventSource -> onmessage -> append text -> render Markdown\n",
  "```\n\n",
  "This demo uses the same shape as production chat apps\n",
  "I shipped with `uni-app` + SSE plugins.\n\n",
  "## Takeaway\n\n",
  "Keep the transport simple. Invest UX in interrupt, reconnect, and readable streaming Markdown.\n",
];

export async function GET() {
  const encoder = new TextEncoder();
  let closed = false;

  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: unknown) => {
        if (closed) return;
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      };

      try {
        for (const chunk of CHUNKS) {
          if (closed) break;
          // Split into smaller pieces to feel like token streaming
          for (const piece of chunk.match(/[\s\S]{1,12}/g) || []) {
            if (closed) break;
            send({ text: piece });
            await new Promise((r) => setTimeout(r, 28));
          }
        }
        send({ done: true });
      } catch {
        // client disconnected
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
