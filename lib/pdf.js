import { jsPDF } from "jspdf";

export function downloadItineraryPDF(trip) {
  const doc = new jsPDF();
  let y = 20;

  doc.setFontSize(18);
  doc.text(trip.name, 14, y);
  y += 8;

  doc.setFontSize(11);
  doc.setTextColor(90);
  doc.text(`${trip.destination} · ${trip.startDate} to ${trip.endDate}`, 14, y);
  doc.setTextColor(0);
  y += 12;

  trip.days.forEach((day, i) => {
    y = ensureSpace(doc, y, 16);
    doc.setFontSize(13);
    doc.text(`Day ${i + 1} — ${day.date}`, 14, y);
    y += 7;

    doc.setFontSize(10);
    if (day.items.length === 0) {
      doc.setTextColor(140);
      doc.text("Nothing planned yet", 18, y);
      doc.setTextColor(0);
      y += 6;
    }
    day.items.forEach((item) => {
      y = ensureSpace(doc, y, 8);
      doc.text(`${item.time || "—"}   ${item.title}`, 18, y);
      y += 6;
      if (item.notes) {
        doc.setTextColor(120);
        doc.text(item.notes, 22, y);
        doc.setTextColor(0);
        y += 6;
      }
    });
    y += 4;
  });

  if (trip.expenses.length > 0) {
    y = ensureSpace(doc, y, 16);
    doc.setFontSize(13);
    doc.text("Expenses", 14, y);
    y += 7;
    doc.setFontSize(10);
    trip.expenses.forEach((exp) => {
      y = ensureSpace(doc, y, 8);
      doc.text(`${exp.title} — ${exp.amount}`, 18, y);
      y += 6;
    });
  }

  doc.save(`${trip.name.replace(/\s+/g, "-").toLowerCase()}.pdf`);
}

function ensureSpace(doc, y, needed) {
  if (y + needed > 280) {
    doc.addPage();
    return 20;
  }
  return y;
}
