// Fallback used when OPENWEATHER_API_KEY isn't set. Deterministic per city+day so the UI doesn't jitter between renders.
const BASE_TEMP_C = { Tokyo: 18, Paris: 14, "New York": 12, Cebu: 29, default: 20 };
const CONDITIONS = ["Sunny", "Partly cloudy", "Light rain", "Clear skies", "Overcast"];

export function getMockForecast(city, days = 5) {
  const base = BASE_TEMP_C[normalizedCityKey(city)] ?? BASE_TEMP_C.default;
  return Array.from({ length: days }, (_, i) => {
    const seed = hashString(`${city}-${i}`);
    const tempC = base + (seed % 7) - 3;
    const condition = CONDITIONS[seed % CONDITIONS.length];
    const date = new Date();
    date.setDate(date.getDate() + i);
    return { date: date.toISOString().slice(0, 10), tempC, condition };
  });
}

function normalizedCityKey(city) {
  const known = Object.keys(BASE_TEMP_C);
  return known.find((k) => k.toLowerCase() === (city || "").toLowerCase()) || "default";
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % 1000;
  }
  return Math.abs(hash);
}
