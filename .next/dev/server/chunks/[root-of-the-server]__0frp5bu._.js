module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[project]/app/api/weather/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integrations$2f$mockWeather$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integrations/mockWeather.js [app-route] (ecmascript)");
;
;
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const city = (searchParams.get("city") || "").trim();
    const days = Number(searchParams.get("days") || 5);
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (apiKey && city) {
        try {
            const forecast = await fetchLiveForecast(city, days, apiKey);
            if (forecast) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                source: "live",
                city,
                forecast
            });
        } catch (err) {
            console.error("OpenWeatherMap request failed, falling back to mock data:", err);
        }
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        source: "mock",
        city,
        forecast: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integrations$2f$mockWeather$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMockForecast"])(city, days)
    });
}
// Real integration: OpenWeatherMap's 5-day/3-hour forecast endpoint, summarized
// down to one entry per day. Verify against https://openweathermap.org/forecast5
// if the response shape changes.
async function fetchLiveForecast(city, days, apiKey) {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`).then((r)=>r.json());
    if (!data?.list) return null;
    const byDay = {};
    for (const entry of data.list){
        const day = entry.dt_txt.slice(0, 10);
        (byDay[day] ||= []).push(entry);
    }
    return Object.entries(byDay).slice(0, days).map(([date, entries])=>{
        const temps = entries.map((e)=>e.main.temp);
        const avg = temps.reduce((a, b)=>a + b, 0) / temps.length;
        return {
            date,
            tempC: Math.round(avg),
            condition: entries[0].weather?.[0]?.main || "—"
        };
    });
}
}),
"[project]/lib/integrations/mockWeather.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMockForecast",
    ()=>getMockForecast
]);
// Fallback forecast used when OPENWEATHER_API_KEY isn't set. Deterministic
// per city + day so the UI doesn't jitter between renders, but still varies
// across cities and across the days of a trip.
const BASE_TEMP_C = {
    Tokyo: 18,
    Paris: 14,
    "New York": 12,
    Cebu: 29,
    default: 20
};
const CONDITIONS = [
    "Sunny",
    "Partly cloudy",
    "Light rain",
    "Clear skies",
    "Overcast"
];
function getMockForecast(city, days = 5) {
    const base = BASE_TEMP_C[normalizedCityKey(city)] ?? BASE_TEMP_C.default;
    return Array.from({
        length: days
    }, (_, i)=>{
        const seed = hashString(`${city}-${i}`);
        const tempC = base + seed % 7 - 3;
        const condition = CONDITIONS[seed % CONDITIONS.length];
        const date = new Date();
        date.setDate(date.getDate() + i);
        return {
            date: date.toISOString().slice(0, 10),
            tempC,
            condition
        };
    });
}
function normalizedCityKey(city) {
    const known = Object.keys(BASE_TEMP_C);
    return known.find((k)=>k.toLowerCase() === (city || "").toLowerCase()) || "default";
}
function hashString(str) {
    let hash = 0;
    for(let i = 0; i < str.length; i++){
        hash = (hash * 31 + str.charCodeAt(i)) % 1000;
    }
    return Math.abs(hash);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0frp5bu._.js.map