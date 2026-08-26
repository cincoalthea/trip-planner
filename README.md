# Trip Planner — Plan Trips, Split Costs, Stay in Sync

A group trip planner: build a day-by-day itinerary, check live weather and
currency rates for your destination, split costs fairly with the group, and
export the finished plan to a calendar file or a PDF.

This project is deliberately built to showcase **integrating with several
different systems in one app** — that's the point of it. Some of those
integrations are fully live by default; others fall back to realistic mock
data until you add your own free API key. Exactly which is which is
documented below — nothing here pretends to be more "real" than it is.

## What's live vs. mock, and why

| Integration | Status by default | Why |
|---|---|---|
| **Currency conversion** | **Fully live, always** | Calls the [Frankfurter API](https://www.frankfurter.app/) — genuinely free, no API key, no signup. There's no mock path for this one because there's no reason to need one. |
| **Places search** | Mock data (Tokyo, Paris, New York, Cebu, + a generic fallback) | Real code path exists for [Geoapify](https://www.geoapify.com/) — add `GEOAPIFY_API_KEY` to switch it on. (Note: Google Places API dropped its free tier in Feb 2025 and now starts around $275/month, so it was deliberately not used here.) |
| **Weather forecast** | Mock data, deterministic per city | Real code path exists for [OpenWeatherMap](https://openweathermap.org/) — add `OPENWEATHER_API_KEY` to switch it on. |
| **Calendar export (.ics)** | **Fully real** | No API needed — this is a hand-built, valid iCalendar file, which is a real, standard integration in its own right. Works with Google Calendar, Apple Calendar, and Outlook. |
| **PDF export** | **Fully real** | Client-side generation via `jspdf`. |
| **Email itinerary** | Simulated | A real send needs a verified sending domain (e.g. with [Resend](https://resend.com/)), which is real setup overhead outside a demo's scope. |
| **Expense splitting** | **Fully real** | Pure logic — a minimum-transaction debt-settlement algorithm (`lib/debts.js`), not a naive pairwise IOU list. |

Every API route in `app/api/` checks for its real key first and only falls
back to mock data if the key is missing — so adding a real key is the only
thing needed to flip an integration from demo to live, no code changes.

## Enabling the live Places / Weather integrations

Create a `.env.local` file in the project root:
```
GEOAPIFY_API_KEY=your_key_here
OPENWEATHER_API_KEY=your_key_here
```
Both have genuine free tiers with no credit card required. Leave either one
out and that integration just keeps using its mock data — nothing breaks.

## Tech stack

- **Next.js (App Router)** — one project, one deployment, with built-in API
  routes used to proxy every external call server-side so API keys never
  reach the browser
- **Tailwind CSS v4** for styling
- **jsPDF** for the PDF export
- Plain React Context for trip/itinerary/expense state — in-memory only, no
  database (refreshing resets to the seed trip)

## Project structure

```
trip-planner/
├── app/
│   ├── page.js                 # Home: create/list trips
│   ├── trips/[id]/page.js      # Trip detail: itinerary, weather, currency, expenses, exports
│   └── api/
│       ├── places/route.js     # live Geoapify if keyed, else mock
│       ├── weather/route.js    # live OpenWeatherMap if keyed, else mock
│       └── currency/route.js   # always live (Frankfurter)
├── components/                 # WeatherPanel, CurrencyConverter, PlaceSearch, ExpenseTracker, EmailItineraryModal
├── lib/
│   ├── TripContext.jsx          # in-memory trip/itinerary/expense state
│   ├── ics.js                   # .ics calendar file builder
│   ├── pdf.js                   # PDF itinerary export
│   ├── debts.js                 # settle-up algorithm
│   └── integrations/            # mock data for places + weather
└── README.md
```

## Running locally

```bash
npm install
npm run dev
```
Open the printed local address (usually `http://localhost:3000`).

## Deploying

Single-project deploy to **Vercel** — it auto-detects Next.js. If you added
`GEOAPIFY_API_KEY` or `OPENWEATHER_API_KEY` locally, add the same variables
in Vercel's Environment Variables settings so the live integrations work
there too.

**A note on the currency API specifically:** it couldn't be tested against
the real Frankfurter service from the environment this was built in, since
that sandbox blocks outbound calls to unfamiliar domains — confirmed by a
direct request returning a 403 from the sandbox's own network proxy, not
from Frankfurter. The code is written against Frankfurter's documented,
stable response shape and will work normally once deployed somewhere with
regular internet access, like Vercel.
