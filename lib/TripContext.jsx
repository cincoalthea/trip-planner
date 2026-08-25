"use client";

import { createContext, useContext, useState } from "react";

const TripContext = createContext(null);

function uid(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function dateRange(startDate, endDate) {
  const days = [];
  const cur = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  while (cur <= end) {
    days.push({ date: cur.toISOString().slice(0, 10), items: [] });
    cur.setDate(cur.getDate() + 1);
  }
  return days.length ? days : [{ date: startDate, items: [] }];
}

function seedTrip() {
  const you = { id: uid("p"), name: "You" };
  const sam = { id: uid("p"), name: "Sam" };
  const start = new Date();
  const days = dateRange(
    start.toISOString().slice(0, 10),
    new Date(start.getTime() + 2 * 86400000).toISOString().slice(0, 10)
  );

  days[0].items.push(
    { id: uid("item"), time: "10:00", title: "Senso-ji Temple", notes: "Asakusa" },
    { id: uid("item"), time: "14:00", title: "Ramen lunch in Asakusa", notes: "" }
  );
  days[1].items.push({ id: uid("item"), time: "09:30", title: "TeamLab Planets", notes: "Book ahead" });

  return {
    id: uid("trip"),
    name: "Tokyo Spring Trip",
    destination: "Tokyo",
    homeCurrency: "USD",
    destCurrency: "JPY",
    startDate: days[0].date,
    endDate: days[days.length - 1].date,
    participants: [you, sam],
    days,
    expenses: [
      { id: uid("exp"), title: "Airbnb (3 nights)", amount: 240, paidBy: you.id, splitAmong: [you.id, sam.id] },
      { id: uid("exp"), title: "Metro passes", amount: 30, paidBy: sam.id, splitAmong: [you.id, sam.id] },
    ],
  };
}

export function TripProvider({ children }) {
  const [trips, setTrips] = useState(() => [seedTrip()]);

  function createTrip({ name, destination, startDate, endDate, homeCurrency, destCurrency }) {
    const trip = {
      id: uid("trip"),
      name,
      destination,
      startDate,
      endDate,
      homeCurrency: homeCurrency || "USD",
      destCurrency: destCurrency || "EUR",
      participants: [{ id: uid("p"), name: "You" }],
      days: dateRange(startDate, endDate),
      expenses: [],
    };
    setTrips((prev) => [trip, ...prev]);
    return trip.id;
  }

  function updateTrip(tripId, updater) {
    setTrips((prev) => prev.map((t) => (t.id === tripId ? updater(t) : t)));
  }

  function addItem(tripId, dayIndex, item) {
    updateTrip(tripId, (t) => {
      const days = [...t.days];
      days[dayIndex] = {
        ...days[dayIndex],
        items: [...days[dayIndex].items, { id: uid("item"), ...item }],
      };
      return { ...t, days };
    });
  }

  function removeItem(tripId, dayIndex, itemId) {
    updateTrip(tripId, (t) => {
      const days = [...t.days];
      days[dayIndex] = { ...days[dayIndex], items: days[dayIndex].items.filter((i) => i.id !== itemId) };
      return { ...t, days };
    });
  }

  function addParticipant(tripId, name) {
    updateTrip(tripId, (t) => ({ ...t, participants: [...t.participants, { id: uid("p"), name }] }));
  }

  function addExpense(tripId, expense) {
    updateTrip(tripId, (t) => ({ ...t, expenses: [...t.expenses, { id: uid("exp"), ...expense }] }));
  }

  function removeExpense(tripId, expenseId) {
    updateTrip(tripId, (t) => ({ ...t, expenses: t.expenses.filter((e) => e.id !== expenseId) }));
  }

  const value = {
    trips,
    createTrip,
    addItem,
    removeItem,
    addParticipant,
    addExpense,
    removeExpense,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTrips() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTrips must be used within a TripProvider");
  return ctx;
}
