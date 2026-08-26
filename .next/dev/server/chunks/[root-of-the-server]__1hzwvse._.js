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
"[project]/app/api/places/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integrations$2f$mockPlaces$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integrations/mockPlaces.js [app-route] (ecmascript)");
;
;
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const city = (searchParams.get("city") || "").trim();
    const query = (searchParams.get("query") || "").trim().toLowerCase();
    const apiKey = process.env.GEOAPIFY_API_KEY;
    if (apiKey && city) {
        try {
            const results = await fetchLivePlaces(city, apiKey);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                source: "live",
                results: filterByQuery(results, query)
            });
        } catch (err) {
            console.error("Geoapify request failed, falling back to mock data:", err);
        }
    }
    const cityKey = Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integrations$2f$mockPlaces$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MOCK_PLACES"]).find((k)=>k.toLowerCase() === city.toLowerCase());
    const results = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integrations$2f$mockPlaces$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MOCK_PLACES"][cityKey] || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integrations$2f$mockPlaces$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MOCK_PLACES"].default;
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        source: "mock",
        results: filterByQuery(results, query)
    });
}
// Real integration: Geoapify. First geocodes the city name to coordinates,
// then searches for tourism/dining places nearby. Verify the exact request
// shape against https://apidocs.geoapify.com/docs/places/ if it changes.
async function fetchLivePlaces(city, apiKey) {
    const geo = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(city)}&apiKey=${apiKey}`).then((r)=>r.json());
    const feature = geo?.features?.[0];
    if (!feature) return [];
    const [lon, lat] = feature.geometry.coordinates;
    const places = await fetch(`https://api.geoapify.com/v2/places?categories=tourism.sights,catering.restaurant&filter=circle:${lon},${lat},5000&limit=12&apiKey=${apiKey}`).then((r)=>r.json());
    return (places?.features || []).map((f)=>({
            id: f.properties.place_id,
            name: f.properties.name || f.properties.address_line1 || "Unnamed place",
            category: (f.properties.categories || [])[0] || "place",
            address: f.properties.formatted || ""
        }));
}
function filterByQuery(list, query) {
    if (!query) return list;
    return list.filter((p)=>p.name.toLowerCase().includes(query));
}
}),
"[project]/lib/integrations/mockPlaces.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Fallback data used when GEOAPIFY_API_KEY isn't set. Keeps the app fully
// demoable without requiring anyone to sign up for an API key first.
__turbopack_context__.s([
    "MOCK_PLACES",
    ()=>MOCK_PLACES
]);
const MOCK_PLACES = {
    Tokyo: [
        {
            id: "tok-1",
            name: "Senso-ji Temple",
            category: "Historic site",
            address: "Asakusa, Tokyo"
        },
        {
            id: "tok-2",
            name: "TeamLab Planets",
            category: "Museum",
            address: "Koto City, Tokyo"
        },
        {
            id: "tok-3",
            name: "Shibuya Crossing",
            category: "Landmark",
            address: "Shibuya, Tokyo"
        },
        {
            id: "tok-4",
            name: "Tsukiji Outer Market",
            category: "Food market",
            address: "Chuo City, Tokyo"
        },
        {
            id: "tok-5",
            name: "Meiji Shrine",
            category: "Historic site",
            address: "Shibuya, Tokyo"
        },
        {
            id: "tok-6",
            name: "Ichiran Ramen",
            category: "Restaurant",
            address: "Multiple locations"
        }
    ],
    Paris: [
        {
            id: "par-1",
            name: "Eiffel Tower",
            category: "Landmark",
            address: "Champ de Mars, Paris"
        },
        {
            id: "par-2",
            name: "Musée d'Orsay",
            category: "Museum",
            address: "7th arrondissement"
        },
        {
            id: "par-3",
            name: "Le Marais",
            category: "Neighborhood",
            address: "4th arrondissement"
        },
        {
            id: "par-4",
            name: "Sainte-Chapelle",
            category: "Historic site",
            address: "Île de la Cité"
        },
        {
            id: "par-5",
            name: "Café de Flore",
            category: "Cafe",
            address: "Saint-Germain-des-Prés"
        }
    ],
    "New York": [
        {
            id: "nyc-1",
            name: "Central Park",
            category: "Park",
            address: "Manhattan"
        },
        {
            id: "nyc-2",
            name: "The Met",
            category: "Museum",
            address: "Upper East Side"
        },
        {
            id: "nyc-3",
            name: "Brooklyn Bridge",
            category: "Landmark",
            address: "Manhattan/Brooklyn"
        },
        {
            id: "nyc-4",
            name: "Katz's Delicatessen",
            category: "Restaurant",
            address: "Lower East Side"
        },
        {
            id: "nyc-5",
            name: "High Line",
            category: "Park",
            address: "Chelsea"
        }
    ],
    Cebu: [
        {
            id: "ceb-1",
            name: "Magellan's Cross",
            category: "Historic site",
            address: "Cebu City"
        },
        {
            id: "ceb-2",
            name: "Kawasan Falls",
            category: "Nature",
            address: "Badian"
        },
        {
            id: "ceb-3",
            name: "Temple of Leah",
            category: "Landmark",
            address: "Cebu City"
        },
        {
            id: "ceb-4",
            name: "Larsian BBQ",
            category: "Restaurant",
            address: "Cebu City"
        },
        {
            id: "ceb-5",
            name: "Oslob Whale Sharks",
            category: "Nature",
            address: "Oslob"
        }
    ],
    default: [
        {
            id: "def-1",
            name: "Old Town Square",
            category: "Landmark",
            address: "City center"
        },
        {
            id: "def-2",
            name: "Local History Museum",
            category: "Museum",
            address: "City center"
        },
        {
            id: "def-3",
            name: "Riverside Walk",
            category: "Park",
            address: "Riverside"
        },
        {
            id: "def-4",
            name: "Central Market",
            category: "Food market",
            address: "City center"
        }
    ]
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1hzwvse._.js.map