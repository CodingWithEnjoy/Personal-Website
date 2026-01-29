import { NextResponse } from "next/server";

interface WeatherItem {
  date: string;
  dateTitle: string;
  current?: number;
  min: number;
  max: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  backgroundColor?: string;
  textColor?: string;
  customDescription?: {
    text: string;
    emoji: string;
  };
}

// Allowed cities
const ALLOWED_CITIES = ["Tehran", "Mashhad", "Isfahan", "Shiraz", "Tabriz"];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");

    if (!city) {
      return NextResponse.json(
        {
          error: "Missing required query parameter: city",
          allowedCities: ALLOWED_CITIES,
        },
        { status: 400 },
      );
    }

    if (!ALLOWED_CITIES.includes(city)) {
      return NextResponse.json(
        {
          error: `City not supported: ${city}`,
          allowedCities: ALLOWED_CITIES,
        },
        { status: 400 },
      );
    }

    const url = `https://api.dastyar.io/express/weather?city=${encodeURIComponent(
      city,
    )}`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Next.js API",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch weather: ${res.status}`);
    }

    const data: WeatherItem[] = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Invalid weather data");
    }

    const currentWeather = data[0];
    const forecast = data.slice(1);

    const response = {
      meta: {
        source: "dastyar.io",
        city,
        fetchedAt: new Date().toISOString(),
        type: "api",
        count: data.length,
      },
      current: {
        date: currentWeather.date,
        dateTitle: currentWeather.dateTitle,
        temp: {
          current: currentWeather.current ?? null,
          min: currentWeather.min,
          max: currentWeather.max,
        },
        weather: currentWeather.weather,
        customDescription: currentWeather.customDescription ?? null,
        colors: {
          background: currentWeather.backgroundColor ?? null,
          text: currentWeather.textColor ?? null,
        },
      },
      forecast: forecast.map((f) => ({
        date: f.date,
        dateTitle: f.dateTitle,
        temp: {
          min: f.min,
          max: f.max,
          current: f.current ?? null,
        },
        weather: f.weather,
        customDescription: f.customDescription ?? null,
        colors: {
          background: f.backgroundColor ?? null,
          text: f.textColor ?? null,
        },
      })),
    };

    return NextResponse.json(response);
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Failed to fetch weather",
        message: err?.message ?? "unknown error",
      },
      { status: 500 },
    );
  }
}
