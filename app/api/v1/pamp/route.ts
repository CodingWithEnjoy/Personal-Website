import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

/* ---------------------------------- utils --------------------------------- */

function normalizeNumber(text: string) {
  const n = text.replace(/[^\d]/g, "");
  return n ? Number(n) : null;
}

function extractWeightGram(name: string): number | null {
  // gram (Persian / English)
  const gramMatch = name.match(/([\d.]+)\s*(گرمی|g)/i);
  if (gramMatch) return Number(gramMatch[1]);

  // ounce (English)
  const ozMatch = name.match(/([\d.]+)\s*oz/i);
  if (ozMatch) return Number(ozMatch[1]) * 31.1035;

  // ounce (Persian)
  if (/نیم\s*اونسی/.test(name)) return 0.5 * 31.1035;
  if (/اونسی/.test(name)) return 1 * 31.1035;

  return null;
}

function normalizeKey(name: string) {
  return name
    .toLowerCase()
    .replace(/پمپ|pamp|سوئیسی|swiss|gold|bar|طلا/g, "")
    .replace(/\s+/g, "")
    .trim();
}

function extractImage($el: cheerio.Cheerio<any>) {
  return (
    $el.find("img").attr("data-src") ||
    $el.find("img").attr("data-lazy-src") ||
    $el.find("img").attr("src") ||
    null
  );
}

/* ---------------------------------- route --------------------------------- */

export async function GET() {
  try {
    const url = "https://zcoinn.com/gold-bar/";

    const html = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "text/html",
      },
      cache: "no-store",
    }).then((r) => r.text());

    const $ = cheerio.load(html);

    const map = new Map<string, any>();

    $('div[data-elementor-type="loop-item"]').each((_, el) => {
      const $el = $(el);

      const name =
        $el.find(".product_title").first().text().trim() ||
        $el.find("h3.product_title").first().text().trim();

      // only PAMP products
      if (!name || !/پمپ|pamp/i.test(name)) return;

      const key = normalizeKey(name);

      const priceText = $el.find(".price bdi").first().text().trim();
      const price = priceText ? normalizeNumber(priceText) : null;

      const link =
        $el
          .find("a[href*='product'], a[href*='bullion']")
          .first()
          .attr("href") || null;

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
        // merge duplicate (desktop/mobile)
        const existing = map.get(key);
        map.set(key, {
          ...existing,
          image: existing.image || image,
          link: existing.link || link,
        });
      }
    });

    const items = Array.from(map.values()).sort(
      (a, b) => (a.weightGram ?? 0) - (b.weightGram ?? 0),
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
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Failed to scrape PAMP gold bars",
        message: err?.message ?? "unknown error",
      },
      { status: 500 },
    );
  }
}
