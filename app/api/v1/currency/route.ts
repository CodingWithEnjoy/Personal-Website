import { NextResponse } from "next/server";

interface CurrencyItem {
  key: string;
  price: string;
  priceFloat: number;
  change: string;
  title: string;
  enTitle: string;
  category: string;
  currency: string;
  image: string;
  link: string;
  icon: string;
  sortOrder: number;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q"); // optional, comma-separated

    const url = "https://api.dastyar.io/express/financial-item";
    const res = await fetch(url, {
      headers: { "User-Agent": "Next.js API", Accept: "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch currency data: ${res.status}`);
    }

    const dataRaw = await res.json();

    // Normalize data
    const data: CurrencyItem[] = dataRaw.map((item: any) => ({
      key: item.key,
      price: item.price,
      priceFloat: Number(item.priceFloat),
      change: item.change,
      title: item.title,
      enTitle: item.enTitle,
      category: item.category,
      currency: item.currency,
      image: item.image,
      link: item.link,
      icon: item.icon,
      sortOrder: item.sort_order,
    }));

    let filteredData = data;

    if (q) {
      const keys = q.split(",").map((k) => k.trim().toLowerCase());
      filteredData = data.filter((item) =>
        keys.includes(item.key.toLowerCase()),
      );
    }

    // Sort by sortOrder
    filteredData.sort((a, b) => a.sortOrder - b.sortOrder);

    const response = {
      meta: {
        source: "dastyar.io",
        fetchedAt: new Date().toISOString(),
        count: filteredData.length,
      },
      data: filteredData,
    };

    return NextResponse.json(response);
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Failed to fetch currency data",
        message: err?.message ?? "unknown error",
      },
      { status: 500 },
    );
  }
}
