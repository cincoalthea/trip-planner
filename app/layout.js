import "./globals.css";
import { TripProvider } from "@/lib/TripContext";

export const metadata = {
  title: "Trip Planner — Plan trips, split costs, stay in sync",
  description:
    "Plan a group trip: build a day-by-day itinerary, check live weather and currency rates, split costs fairly, and export to your calendar.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <TripProvider>{children}</TripProvider>
      </body>
    </html>
  );
}
