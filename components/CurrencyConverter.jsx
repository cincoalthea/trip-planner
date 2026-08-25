"use client";

import { useState } from "react";
import { SourceBadge } from "./WeatherPanel";

export default function CurrencyConverter({ fromCurrency, toCurrency }) {
  const [amount, setAmount] = useState(100);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function convert() {
    setLoading(true);
    setError("");
    fetch(`/api/currency?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.source === "error") {
          setError(data.error || "Conversion failed.");
          setResult(null);
        } else {
          setResult(data);
        }
      })
      .catch(() => setError("Couldn't reach the currency service."))
      .finally(() => setLoading(false));
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold">Currency</h3>
        <SourceBadge source={result?.source} realLabel="Live rate" />
      </div>
      <p className="mt-1 text-xs text-ink-muted">
        {fromCurrency} → {toCurrency}, via the free Frankfurter exchange-rate API
      </p>

      <div className="mt-3 flex gap-2">
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-28 rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-sky-500"
        />
        <button
          onClick={convert}
          disabled={loading}
          className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600 disabled:opacity-60"
        >
          {loading ? "Converting…" : "Convert"}
        </button>
      </div>

      {error && <p className="mt-2 text-sm text-danger">{error}</p>}

      {result && (
        <p className="mt-3 font-display text-lg font-bold">
          {amount} {fromCurrency} ≈ {result.converted.toFixed(2)} {toCurrency}
        </p>
      )}
    </div>
  );
}
