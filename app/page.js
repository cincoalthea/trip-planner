"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTrips } from "@/lib/TripContext";

export default function Home() {
  const { trips, createTrip } = useTrips();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
    homeCurrency: "USD",
    destCurrency: "EUR",
  });
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleCreate(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.destination.trim() || !form.startDate || !form.endDate) {
      setError("Fill in the trip name, destination, and both dates.");
      return;
    }
    if (form.endDate < form.startDate) {
      setError("End date can't be before the start date.");
      return;
    }
    setError("");
    const id = createTrip(form);
    router.push(`/trips/${id}`);
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <p className="font-display text-xs font-bold uppercase tracking-wide text-sky-600">
        Plan together, stay in sync
      </p>
      <h1 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">Trip Planner</h1>
      <p className="mt-3 max-w-xl text-ink-muted">
        Build a day-by-day itinerary, check live weather and currency rates for
        your destination, split costs fairly with the group, and export
        everything to your calendar or a PDF.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <form onSubmit={handleCreate} className="rounded-2xl border border-line bg-white p-6 shadow-sm">
          <h2 className="font-display text-lg font-bold">Start a new trip</h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="col-span-2 flex flex-col gap-1 text-sm text-ink-muted">
              Trip name
              <input
                className="rounded-lg border border-line px-3 py-2 text-ink outline-none focus:border-sky-500"
                placeholder="Tokyo Spring Trip"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </label>
            <label className="col-span-2 flex flex-col gap-1 text-sm text-ink-muted">
              Destination city
              <input
                className="rounded-lg border border-line px-3 py-2 text-ink outline-none focus:border-sky-500"
                placeholder="Tokyo"
                value={form.destination}
                onChange={(e) => update("destination", e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-ink-muted">
              Start date
              <input
                type="date"
                className="rounded-lg border border-line px-3 py-2 text-ink outline-none focus:border-sky-500"
                value={form.startDate}
                onChange={(e) => update("startDate", e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-ink-muted">
              End date
              <input
                type="date"
                className="rounded-lg border border-line px-3 py-2 text-ink outline-none focus:border-sky-500"
                value={form.endDate}
                onChange={(e) => update("endDate", e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-ink-muted">
              Home currency
              <input
                className="rounded-lg border border-line px-3 py-2 uppercase text-ink outline-none focus:border-sky-500"
                maxLength={3}
                value={form.homeCurrency}
                onChange={(e) => update("homeCurrency", e.target.value.toUpperCase())}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-ink-muted">
              Destination currency
              <input
                className="rounded-lg border border-line px-3 py-2 uppercase text-ink outline-none focus:border-sky-500"
                maxLength={3}
                value={form.destCurrency}
                onChange={(e) => update("destCurrency", e.target.value.toUpperCase())}
              />
            </label>
          </div>

          {error && <p className="mt-3 text-sm font-medium text-danger">{error}</p>}

          <button
            type="submit"
            className="mt-5 w-full rounded-full bg-sky-500 py-2.5 text-sm font-semibold text-white hover:bg-sky-600"
          >
            Create trip
          </button>
        </form>

        <div>
          <h2 className="font-display text-lg font-bold">Your trips</h2>
          <div className="mt-4 space-y-3">
            {trips.map((trip) => (
              <button
                key={trip.id}
                onClick={() => router.push(`/trips/${trip.id}`)}
                className="block w-full rounded-2xl border border-line bg-white p-5 text-left shadow-sm transition hover:border-sky-400 hover:shadow-md"
              >
                <p className="font-display font-bold">{trip.name}</p>
                <p className="mt-1 text-sm text-ink-muted">
                  {trip.destination} · {trip.startDate} to {trip.endDate}
                </p>
                <p className="mt-2 text-xs font-semibold text-sky-600">
                  {trip.days.length} day{trip.days.length !== 1 ? "s" : ""} planned →
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
