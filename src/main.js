export default async function handler(event) {
  const req = event.request;
  const url = new URL(req.url);

  if (req.method === "POST" && url.pathname === "/ask") {
    const body = await req.json();
    const prompt = body.prompt;

    const res = await fetch("https://api.puter.com/v2/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4.1-nano",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response("Not Found", { status: 404 });
}
