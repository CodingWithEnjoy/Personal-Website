import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

function getAqiLevel(aqi: number | null) {
  if (aqi === null) return null;
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive Groups";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
}

export async function GET() {
  try {
    const url = "https://www.iqair.com/iran/tehran/tehran";

    const html = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "text/html",
      },
      cache: "no-store",
    }).then((r) => r.text());

    const $ = cheerio.load(html);

    const card = $(
      "div:has(.aqi-legend-bg-red, .aqi-legend-bg-green, .aqi-legend-bg-yellow, .aqi-legend-bg-purple, .aqi-legend-bg-orange)",
    ).first();

    const aqiText = card
      .find(
        ".aqi-legend-bg-red p, .aqi-legend-bg-green p, .aqi-legend-bg-yellow p, .aqi-legend-bg-purple p, .aqi-legend-bg-orange p",
      )
      .first()
      .text()
      .trim();

    const aqi = aqiText ? Number(aqiText) : null;

    const status =
      card.find("p.font-body-l-medium").first().text().trim() || null;

    const pollutant =
      card
        .find("div.font-body-m-medium div.flex.items-center.gap-1 p")
        .last()
        .text()
        .trim() || null;

    const pollutantValue =
      card.find("div.font-body-m-medium > p").last().text().trim() || null;

    const infoBar = card
      .parent()
      .find("div.font-body-s-medium.bg-white")
      .first();

    const groups = infoBar.find(
      "div.flex.items-center.gap-1, div.flex-none.items-center.gap-1",
    );

    const temperature = groups.eq(0).find("p").text().trim() || null;
    const wind = groups.eq(1).find("p").text().trim() || null;
    const humidity = groups.eq(2).find("p").text().trim() || null;

    return NextResponse.json({
      meta: {
        source: "iqair.com",
        city: "Tehran",
        country: "IR",
        fetchedAt: new Date().toISOString(),
        type: "scraped",
      },
      aqi,
      level: getAqiLevel(aqi),
      status,
      mainPollutant: pollutant,
      pollutantValue,
      weather: {
        temperature,
        wind,
        humidity,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Failed to fetch AQI data",
        message: err?.message ?? "unknown error",
      },
      { status: 500 },
    );
  }
}
