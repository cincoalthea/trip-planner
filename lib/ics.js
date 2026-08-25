// A minimal but valid iCalendar (.ics) builder. No library, no API key, no
// OAuth — this is a real, standard calendar integration that works with
// Google Calendar, Apple Calendar, and Outlook alike, just by producing a
// file in the format they all already understand.

export function buildICS(trip) {
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Trip Planner//EN"];
  const stamp = toICSDateTime(new Date());

  trip.days.forEach((day) => {
    day.items.forEach((item) => {
      lines.push(
        "BEGIN:VEVENT",
        `UID:${item.id}@trip-planner`,
        `DTSTAMP:${stamp}`,
        `DTSTART:${toICSDateTime(new Date(`${day.date}T${pad(item.time || "09:00")}:00`))}`,
        `SUMMARY:${escapeICS(item.title)}`,
        `LOCATION:${escapeICS(item.notes || "")}`,
        "END:VEVENT"
      );
    });
  });

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export function downloadICS(trip) {
  const content = buildICS(trip);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${slugify(trip.name)}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function pad(time) {
  const [h = "9", m = "0"] = String(time).split(":");
  return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
}

function toICSDateTime(date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function escapeICS(str) {
  return String(str).replace(/([,;])/g, "\\$1");
}

function slugify(str) {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
