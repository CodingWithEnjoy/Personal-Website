import { NextResponse } from "next/server";
import { load as cheerioLoad } from "cheerio";

/* ---------------------------------- runtime -------------------------------- */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ---------------------------------- utils --------------------------------- */

function normalizeNumber(text: string): number | null {
  const n = text.replace(/[^\d]/g, "");
  return n ? Number(n) : null;
}

function extractWeightGram(name: string): number | null {
  const gramMatch = name.match(/([\d.]+)\s*(گرمی|گرم|g)/i);
  if (gramMatch) return Number(gramMatch[1]);

  const ozMatch = name.match(/([\d.]+)\s*oz/i);
  if (ozMatch) return Number(ozMatch[1]) * 31.1035;

  if (/نیم\s*اونسی/.test(name)) return 0.5 * 31.1035;

  const ozPersianMatch = name.match(/([\d.]+)\s*اونسی/);
  if (ozPersianMatch) return Number(ozPersianMatch[1]) * 31.1035;

  return null;
}

function normalizeKey(name: string): string {
  return name
    .toLowerCase()
    .replace(/پمپ|pamp|سوئیسی|سوییسی|swiss|gold|bar|طلا/g, "")
    .replace(/\s+/g, "");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractImage($el: any): string | null {
  const imgs = $el.find("img");
  for (let i = 0; i < imgs.length; i++) {
    const src =
      imgs.eq(i).attr("data-src") ||
      imgs.eq(i).attr("data-lazy-src") ||
      imgs.eq(i).attr("src");
    if (src && !src.startsWith("data:image") && src.includes("wp-content/uploads")) {
      return src;
    }
  }
  return null;
}

/* ---------------------------------- fetch helper --------------------------- */

async function fetchWithRetry(url: string, retries = 2): Promise<string> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9,fa-IR;q=0.8,fa;q=0.7",
          "Sec-Fetch-Dest": "document",
          "Sec-Fetch-Mode": "navigate",
          "Sec-Fetch-Site": "none",
          "Sec-Fetch-User": "?1",
          "Upgrade-Insecure-Requests": "1",
        },
        cache: "no-store",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }

      return await response.text();
    } catch (err: unknown) {
      clearTimeout(timeoutId);

      if (attempt === retries) throw err;

      console.warn(`Fetch attempt ${attempt + 1} failed:`, (err as Error)?.message);
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
    }
  }

  throw new Error("All fetch attempts failed");
}

/* ---------------------------------- route --------------------------------- */

export async function GET() {
  const url = "https://zcoinn.com/gold-bar/";

  try {
    const html = await fetchWithRetry(url);
    const $ = cheerioLoad(html);

    const map = new Map<string, Record<string, unknown>>();

    $('div[data-elementor-type="loop-item"]').each((_, el) => {
      const $el = $(el);

      const name =
        $el.find(".product_title").first().text().trim() ||
        $el.find("h3.product_title").first().text().trim();

      if (!name || !/پمپ|pamp/i.test(name)) return;

      const key = normalizeKey(name);
      const priceText = $el.find(".price bdi").first().text().trim();
      const price = priceText ? normalizeNumber(priceText) : null;
      const link =
        $el.find("a[href*='product'], a[href*='bullion']").first().attr("href") || null;
      const image = extractImage($el);
      const weightGram = extractWeightGram(name);

      if (!map.has(key)) {
        map.set(key, {
          name,
          weightGram,
          price,
          currency: "IRR_TOMAN",
          priceText,
          link,
          image,
        });
      } else {
        const existing = map.get(key)!;
        map.set(key, {
          ...existing,
          image: existing.image || image,
          link: existing.link || link,
        });
      }
    });

    const items = Array.from(map.values()).sort(
      (a, b) => ((a.weightGram as number) ?? 0) - ((b.weightGram as number) ?? 0),
    );

    return NextResponse.json({
      meta: {
        source: "zcoinn.com",
        category: "gold-bar",
        brand: "PAMP",
        fetchedAt: new Date().toISOString(),
        count: items.length,
        type: "scraped",
      },
      items,
    });
  } catch (err: unknown) {
    console.error("PAMP Scraper Error:", err);

    const message = (err as Error)?.message ?? "unknown error";
    const isAbortError =
      (err as Error)?.name === "AbortError" ||
      message.toLowerCase().includes("aborted");

    return NextResponse.json(
      {
        error: "Failed to scrape PAMP gold bars",
        message: isAbortError
          ? "Request to zcoinn.com timed out after 8 seconds (all retries exhausted)"
          : message,
      },
      { status: 500 },
    );
  }
}
