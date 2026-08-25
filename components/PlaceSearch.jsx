"use client";

import { useState } from "react";
import { useTrips } from "@/lib/TripContext";
import { SourceBadge } from "./WeatherPanel";

export default function PlaceSearch({ tripId, dayIndex, city }) {
  const { addItem } = useTrips();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [source, setSource] = useState(null);
  const [loading, setLoading] = useState(false);

  function search() {
    setLoading(true);
    fetch(`/api/places?city=${encodeURIComponent(city)}&query=${encodeURIComponent(query)}`)
      .then((r) => r.json())
      .then((data) => {
        setResults(data.results || []);
        setSource(data.source);
      })
      .finally(() => setLoading(false));
  }

  function handleAdd(place) {
    addItem(tripId, dayIndex, { time: "", title: place.name, notes: place.address || place.category });
  }

  if (!open) {
    return (
      <button
        onClick={() => {
          setOpen(true);
          if (results.length === 0) search();
        }}
        className="text-sm font-semibold text-sky-600 hover:text-sky-700"
      >
        + Search places to add
      </button>
    );
  }

  return (
    <div className="mt-2 rounded-xl border border-line bg-bg p-3">
      <div className="flex items-center gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
          placeholder={`Search in ${city}…`}
          className="flex-1 rounded-lg border border-line px-3 py-1.5 text-sm outline-none focus:border-sky-500"
        />
        <button
          onClick={search}
          className="rounded-lg bg-sky-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-sky-600"
        >
          Search
        </button>
        <SourceBadge source={source} realLabel="Live" mockLabel="Demo data" />
        <button onClick={() => setOpen(false)} className="text-sm text-ink-muted hover:text-ink">
          Close
        </button>
      </div>

      <div className="mt-2 max-h-52 space-y-1 overflow-y-auto">
        {loading && <p className="text-sm text-ink-muted">Searching…</p>}
        {!loading &&
          results.map((place) => (
            <div
              key={place.id}
              className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm"
            >
              <div>
                <p className="font-medium">{place.name}</p>
                <p className="text-xs text-ink-muted">{place.category} · {place.address}</p>
              </div>
              <button
                onClick={() => handleAdd(place)}
                className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600 hover:bg-sky-100"
              >
                Add
              </button>
            </div>
          ))}
        {!loading && results.length === 0 && (
          <p className="text-sm text-ink-muted">No results — try a different search.</p>
        )}
      </div>
    </div>
  );
}
