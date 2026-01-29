import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://www.cloudflare.com/cdn-cgi/trace");
    if (!res.ok) throw new Error(`Cloudflare trace failed: ${res.status}`);

    const text = await res.text();

    // Parse key=value lines into object
    const data: Record<string, string> = {};
    text.split("\n").forEach((line) => {
      const [key, value] = line.split("=");
      if (key && value) data[key.trim()] = value.trim();
    });

    // Map to clean JSON
    const result = {
      ip: data.ip ?? null,
      colo: data.colo ?? null, // Cloudflare datacenter
      loc: data.loc ?? null, // Country code
      tls: data.tls ?? null,
      scheme: data.visit_scheme ?? null,
      userAgent: data.uag ?? null,
      http: data.http ?? null,
      warp: data.warp === "on",
      sni: data.sni ?? null,
      gateway: data.gateway === "on",
      rbi: data.rbi === "on",
      kex: data.kex ?? null,
      fl: data.fl ?? null,
      host: data.h ?? null,
      ts: Number(data.ts) || null,
    };

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Failed to fetch IP info",
        message: err?.message ?? "unknown error",
      },
      { status: 500 },
    );
  }
}
