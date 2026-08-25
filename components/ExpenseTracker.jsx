"use client";

import { useState } from "react";
import { useTrips } from "@/lib/TripContext";
import { computeSettlements } from "@/lib/debts";

export default function ExpenseTracker({ trip }) {
  const { addParticipant, addExpense, removeExpense } = useTrips();
  const [newName, setNewName] = useState("");
  const [form, setForm] = useState({ title: "", amount: "", paidBy: trip.participants[0]?.id || "" });
  const [splitAmong, setSplitAmong] = useState(trip.participants.map((p) => p.id));

  const nameFor = (id) => trip.participants.find((p) => p.id === id)?.name || "Someone";

  const { settlements } = computeSettlements(trip.participants, trip.expenses);

  function handleAddParticipant() {
    if (!newName.trim()) return;
    addParticipant(trip.id, newName.trim());
    setNewName("");
  }

  function toggleSplit(id) {
    setSplitAmong((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function handleAddExpense(e) {
    e.preventDefault();
    const amount = Number(form.amount);
    if (!form.title.trim() || !amount || amount <= 0 || !form.paidBy || splitAmong.length === 0) return;
    addExpense(trip.id, { title: form.title.trim(), amount, paidBy: form.paidBy, splitAmong });
    setForm({ title: "", amount: "", paidBy: form.paidBy });
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
      <h3 className="font-display font-bold">Group expenses</h3>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {trip.participants.map((p) => (
          <span key={p.id} className="rounded-full bg-bg px-3 py-1 text-xs font-medium text-ink-muted">
            {p.name}
          </span>
        ))}
        <div className="flex items-center gap-1">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddParticipant()}
            placeholder="Add person"
            className="w-28 rounded-full border border-line px-3 py-1 text-xs outline-none focus:border-sky-500"
          />
          <button
            onClick={handleAddParticipant}
            className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-600 hover:bg-sky-100"
          >
            Add
          </button>
        </div>
      </div>

      <form onSubmit={handleAddExpense} className="mt-4 space-y-2 border-t border-line pt-4">
        <div className="flex gap-2">
          <input
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Expense (e.g. Airbnb)"
            className="flex-1 rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-sky-500"
          />
          <input
            type="number"
            min="0"
            value={form.amount}
            onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
            placeholder="Amount"
            className="w-28 rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-sky-500"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <label className="text-ink-muted">Paid by</label>
          <select
            value={form.paidBy}
            onChange={(e) => setForm((f) => ({ ...f, paidBy: e.target.value }))}
            className="rounded-lg border border-line px-2 py-1.5 text-sm"
          >
            {trip.participants.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <label className="text-ink-muted">Split among</label>
          {trip.participants.map((p) => (
            <label key={p.id} className="flex items-center gap-1 text-xs">
              <input
                type="checkbox"
                checked={splitAmong.includes(p.id)}
                onChange={() => toggleSplit(p.id)}
              />
              {p.name}
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
        >
          Add expense
        </button>
      </form>

      <div className="mt-4 space-y-1 border-t border-line pt-4">
        {trip.expenses.length === 0 && <p className="text-sm text-ink-muted">No expenses yet.</p>}
        {trip.expenses.map((exp) => (
          <div key={exp.id} className="flex items-center justify-between text-sm">
            <span>
              {exp.title} — {exp.amount} <span className="text-ink-muted">(paid by {nameFor(exp.paidBy)})</span>
            </span>
            <button
              onClick={() => removeExpense(trip.id, exp.id)}
              className="text-xs text-ink-muted hover:text-danger"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-line pt-4">
        <p className="text-sm font-semibold">Settling up</p>
        {settlements.length === 0 ? (
          <p className="mt-1 text-sm text-teal-600">Everyone's even — nothing to settle.</p>
        ) : (
          <ul className="mt-1 space-y-1 text-sm">
            {settlements.map((s, i) => (
              <li key={i}>
                <span className="font-medium">{nameFor(s.from)}</span> owes{" "}
                <span className="font-medium">{nameFor(s.to)}</span> {s.amount.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
