import { NextResponse } from "next/server";
import { MOCK_PLACES } from "@/lib/integrations/mockPlaces";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = (searchParams.get("city") || "").trim();
  const query = (searchParams.get("query") || "").trim().toLowerCase();
  const apiKey = process.env.GEOAPIFY_API_KEY;

  if (apiKey && city) {
    try {
      const results = await fetchLivePlaces(city, apiKey);
      return NextResponse.json({ source: "live", results: filterByQuery(results, query) });
    } catch (err) {
      console.error("Geoapify request failed, falling back to mock data:", err);
    }
  }

  const cityKey = Object.keys(MOCK_PLACES).find(
    (k) => k.toLowerCase() === city.toLowerCase()
  );
  const results = MOCK_PLACES[cityKey] || MOCK_PLACES.default;
  return NextResponse.json({ source: "mock", results: filterByQuery(results, query) });
}

// Real integration: Geoapify. First geocodes the city name to coordinates,
// then searches for tourism/dining places nearby. Verify the exact request
// shape against https://apidocs.geoapify.com/docs/places/ if it changes.
async function fetchLivePlaces(city, apiKey) {
  const geo = await fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(city)}&apiKey=${apiKey}`
  ).then((r) => r.json());

  const feature = geo?.features?.[0];
  if (!feature) return [];
  const [lon, lat] = feature.geometry.coordinates;

  const places = await fetch(
    `https://api.geoapify.com/v2/places?categories=tourism.sights,catering.restaurant&filter=circle:${lon},${lat},5000&limit=12&apiKey=${apiKey}`
  ).then((r) => r.json());

  return (places?.features || []).map((f) => ({
    id: f.properties.place_id,
    name: f.properties.name || f.properties.address_line1 || "Unnamed place",
    category: (f.properties.categories || [])[0] || "place",
    address: f.properties.formatted || "",
  }));
}

function filterByQuery(list, query) {
  if (!query) return list;
  return list.filter((p) => p.name.toLowerCase().includes(query));
}
