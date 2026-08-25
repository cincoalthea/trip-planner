"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTrips } from "@/lib/TripContext";
import PlaceSearch from "@/components/PlaceSearch";
import WeatherPanel from "@/components/WeatherPanel";
import CurrencyConverter from "@/components/CurrencyConverter";
import ExpenseTracker from "@/components/ExpenseTracker";
import EmailItineraryModal from "@/components/EmailItineraryModal";
import { downloadICS } from "@/lib/ics";
import { downloadItineraryPDF } from "@/lib/pdf";

export default function TripPage() {
  const { id } = useParams();
  const router = useRouter();
  const { trips, removeItem } = useTrips();
  const [dayIndex, setDayIndex] = useState(0);
  const [showEmail, setShowEmail] = useState(false);

  const trip = trips.find((t) => t.id === id);

  if (!trip) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-16 text-center">
        <p className="text-ink-muted">That trip doesn't exist in this session.</p>
        <button onClick={() => router.push("/")} className="mt-3 font-semibold text-sky-600">
          ← Back home
        </button>
      </div>
    );
  }

  const day = trip.days[dayIndex];

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <button onClick={() => router.push("/")} className="text-sm font-semibold text-ink-muted hover:text-ink">
        ← All trips
      </button>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">{trip.name}</h1>
          <p className="text-ink-muted">
            {trip.destination} · {trip.startDate} to {trip.endDate}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => downloadItineraryPDF(trip)}
            className="rounded-full border border-line px-3 py-1.5 text-sm font-semibold text-ink-muted hover:bg-white"
          >
            Download PDF
          </button>
          <button
            onClick={() => downloadICS(trip)}
            className="rounded-full border border-line px-3 py-1.5 text-sm font-semibold text-ink-muted hover:bg-white"
          >
            Download calendar (.ics)
          </button>
          <button
            onClick={() => setShowEmail(true)}
            className="rounded-full bg-sky-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-sky-600"
          >
            Email itinerary
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="flex flex-wrap gap-1 rounded-full border border-line bg-white p-1 w-fit">
            {trip.days.map((d, i) => (
              <button
                key={d.date}
                onClick={() => setDayIndex(i)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                  i === dayIndex ? "bg-sky-500 text-white" : "text-ink-muted"
                }`}
              >
                Day {i + 1}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-line bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold">
                Day {dayIndex + 1} — {day.date}
              </h3>
            </div>

            <div className="mt-3 space-y-2">
              {day.items.length === 0 && (
                <p className="text-sm text-ink-muted">Nothing planned yet for this day.</p>
              )}
              {day.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl bg-bg px-3 py-2 text-sm"
                >
                  <div>
                    <span className="font-medium">{item.time || "—"}</span>{" "}
                    <span>{item.title}</span>
                    {item.notes && <span className="text-ink-muted"> · {item.notes}</span>}
                  </div>
                  <button
                    onClick={() => removeItem(trip.id, dayIndex, item.id)}
                    className="text-xs text-ink-muted hover:text-danger"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-3">
              <PlaceSearch tripId={trip.id} dayIndex={dayIndex} city={trip.destination} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <WeatherPanel city={trip.destination} />
          <CurrencyConverter fromCurrency={trip.homeCurrency} toCurrency={trip.destCurrency} />
        </div>
      </div>

      <div className="mt-6">
        <ExpenseTracker trip={trip} />
      </div>

      {showEmail && <EmailItineraryModal tripName={trip.name} onClose={() => setShowEmail(false)} />}
    </div>
  );
}
