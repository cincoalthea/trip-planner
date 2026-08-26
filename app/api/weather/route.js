import { NextResponse } from "next/server";
import { getMockForecast } from "@/lib/integrations/mockWeather";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = (searchParams.get("city") || "").trim();
  const days = Number(searchParams.get("days") || 5);
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (apiKey && city) {
    try {
      const forecast = await fetchLiveForecast(city, days, apiKey);
      if (forecast) return NextResponse.json({ source: "live", city, forecast });
    } catch (err) {
      console.error("OpenWeatherMap request failed, falling back to mock data:", err);
    }
  }

  return NextResponse.json({ source: "mock", city, forecast: getMockForecast(city, days) });
}

async function fetchLiveForecast(city, days, apiKey) {
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
  ).then((r) => r.json());

  if (!data?.list) return null;

  const byDay = {};
  for (const entry of data.list) {
    const day = entry.dt_txt.slice(0, 10);
    (byDay[day] ||= []).push(entry);
  }

  return Object.entries(byDay)
    .slice(0, days)
    .map(([date, entries]) => {
      const temps = entries.map((e) => e.main.temp);
      const avg = temps.reduce((a, b) => a + b, 0) / temps.length;
      return { date, tempC: Math.round(avg), condition: entries[0].weather?.[0]?.main || "—" };
    });
}
