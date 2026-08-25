"use client";

import { useState } from "react";

// Simulates sending the itinerary via Resend. A real send needs a verified
// sending domain and an API key, which is real setup overhead outside the
// scope of a demo — so this is a timed simulation, the same honest pattern
// used for the payment flow in the canteen-ordering project.
export default function EmailItineraryModal({ tripName, onClose }) {
  const [stage, setStage] = useState("compose"); // compose -> sending -> sent
  const [email, setEmail] = useState("");

  function send() {
    setStage("sending");
    setTimeout(() => setStage("sent"), 1400);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        {stage === "compose" && (
          <>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
              Simulated send
            </p>
            <h3 className="mt-1 font-display text-lg font-bold">Email the itinerary</h3>
            <p className="mt-2 text-sm text-ink-muted">
              This demo simulates sending via Resend — no real email goes out.
            </p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="friend@example.com"
              className="mt-4 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-sky-500"
            />
            <div className="mt-5 flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 rounded-full border border-line py-2.5 text-sm font-semibold text-ink-muted hover:bg-bg"
              >
                Cancel
              </button>
              <button
                onClick={send}
                disabled={!email.trim()}
                className="flex-1 rounded-full bg-sky-500 py-2.5 text-sm font-semibold text-white hover:bg-sky-600 disabled:opacity-60"
              >
                Send
              </button>
            </div>
          </>
        )}

        {stage === "sending" && (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-100 border-t-sky-500" />
            <p className="mt-4 font-display font-semibold">Sending…</p>
          </div>
        )}

        {stage === "sent" && (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="mt-4 font-display font-semibold">"{tripName}" sent to {email}</p>
            <p className="mt-1 text-sm text-ink-muted">(Simulated — no real email was sent)</p>
            <button
              onClick={onClose}
              className="mt-4 rounded-full bg-bg px-4 py-2 text-sm font-semibold text-ink-muted hover:bg-line"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
