"use client";

import { useEffect, useState } from "react";

export default function WeatherPanel({ city }) {
  const [forecast, setForecast] = useState([]);
  const [source, setSource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/weather?city=${encodeURIComponent(city)}&days=5`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        setForecast(data.forecast || []);
        setSource(data.source);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [city]);

  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold">Weather in {city}</h3>
        <SourceBadge source={source} realLabel="Live" mockLabel="Demo data" />
      </div>
      {loading ? (
        <p className="mt-3 text-sm text-ink-muted">Loading forecast…</p>
      ) : (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {forecast.map((day) => (
            <div key={day.date} className="rounded-xl bg-bg px-2 py-3 text-center">
              <p className="text-xs text-ink-muted">
                {new Date(`${day.date}T00:00:00`).toLocaleDateString(undefined, { weekday: "short" })}
              </p>
              <p className="mt-1 font-display text-lg font-bold">{day.tempC}°</p>
              <p className="mt-0.5 text-[11px] text-ink-muted">{day.condition}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function SourceBadge({ source, realLabel = "Live", mockLabel = "Demo data" }) {
  if (!source) return null;
  const isLive = source === "live";
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
        isLive ? "bg-teal-50 text-teal-600" : "bg-sunset-50 text-sunset-600"
      }`}
    >
      {isLive ? realLabel : mockLabel}
    </span>
  );
}
