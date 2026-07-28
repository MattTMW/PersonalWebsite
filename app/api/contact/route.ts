import { NextResponse } from "next/server";
import { site } from "@/lib/content";

export const runtime = "nodejs";

type Payload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Best-effort rate limit. Module scope survives between invocations on a warm
 * instance but not across cold starts or multiple regions — it raises the cost
 * of casual abuse without pretending to be real infrastructure. Put a proper
 * limiter (Upstash, Vercel KV) in front of this if the address ever leaks.
 */
const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const record = attempts.get(ip);

  if (!record || now > record.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  record.count += 1;
  return record.count > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  // Honeypot tripped — accept silently so bots get no signal to adapt to.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ status: "ok" });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  // Server-side validation, because the client's `required` attributes are only
  // a convenience and anyone can POST here directly.
  if (name.length < 1 || name.length > 100) {
    return NextResponse.json({ message: "Please enter your name." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email) || email.length > 200) {
    return NextResponse.json({ message: "Please enter a valid email." }, { status: 400 });
  }
  if (message.length < 1 || message.length > 5000) {
    return NextResponse.json(
      { message: "Please enter a message under 5000 characters." },
      { status: 400 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many messages. Please email me directly." },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const from = process.env.CONTACT_FROM_EMAIL;

  // No provider configured: tell the client so it can fall back to mailto:
  // rather than reporting a success that never happened.
  if (!apiKey || !from) {
    return NextResponse.json({ status: "not_configured" });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        // Lets you hit reply and land in the sender's inbox.
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!response.ok) {
      // Log the provider detail server-side; never leak it to the client.
      console.error("Resend error", response.status, await response.text());
      return NextResponse.json(
        { message: "Couldn't send right now. Please email me directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Contact route error", error);
    return NextResponse.json(
      { message: "Couldn't send right now. Please email me directly." },
      { status: 500 },
    );
  }
}
