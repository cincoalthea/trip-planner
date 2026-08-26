module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

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
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

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
"[project]/lib/TripContext.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TripProvider",
    ()=>TripProvider,
    "useTrips",
    ()=>useTrips
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const TripContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function uid(prefix = "id") {
    return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
function dateRange(startDate, endDate) {
    const days = [];
    const cur = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);
    while(cur <= end){
        days.push({
            date: cur.toISOString().slice(0, 10),
            items: []
        });
        cur.setDate(cur.getDate() + 1);
    }
    return days.length ? days : [
        {
            date: startDate,
            items: []
        }
    ];
}
function seedTrip() {
    const you = {
        id: uid("p"),
        name: "You"
    };
    const sam = {
        id: uid("p"),
        name: "Sam"
    };
    const start = new Date();
    const days = dateRange(start.toISOString().slice(0, 10), new Date(start.getTime() + 2 * 86400000).toISOString().slice(0, 10));
    days[0].items.push({
        id: uid("item"),
        time: "10:00",
        title: "Senso-ji Temple",
        notes: "Asakusa"
    }, {
        id: uid("item"),
        time: "14:00",
        title: "Ramen lunch in Asakusa",
        notes: ""
    });
    days[1].items.push({
        id: uid("item"),
        time: "09:30",
        title: "TeamLab Planets",
        notes: "Book ahead"
    });
    return {
        id: uid("trip"),
        name: "Tokyo Spring Trip",
        destination: "Tokyo",
        homeCurrency: "USD",
        destCurrency: "JPY",
        startDate: days[0].date,
        endDate: days[days.length - 1].date,
        participants: [
            you,
            sam
        ],
        days,
        expenses: [
            {
                id: uid("exp"),
                title: "Airbnb (3 nights)",
                amount: 240,
                paidBy: you.id,
                splitAmong: [
                    you.id,
                    sam.id
                ]
            },
            {
                id: uid("exp"),
                title: "Metro passes",
                amount: 30,
                paidBy: sam.id,
                splitAmong: [
                    you.id,
                    sam.id
                ]
            }
        ]
    };
}
function TripProvider({ children }) {
    const [trips, setTrips] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>[
            seedTrip()
        ]);
    function createTrip({ name, destination, startDate, endDate, homeCurrency, destCurrency }) {
        const trip = {
            id: uid("trip"),
            name,
            destination,
            startDate,
            endDate,
            homeCurrency: homeCurrency || "USD",
            destCurrency: destCurrency || "EUR",
            participants: [
                {
                    id: uid("p"),
                    name: "You"
                }
            ],
            days: dateRange(startDate, endDate),
            expenses: []
        };
        setTrips((prev)=>[
                trip,
                ...prev
            ]);
        return trip.id;
    }
    function updateTrip(tripId, updater) {
        setTrips((prev)=>prev.map((t)=>t.id === tripId ? updater(t) : t));
    }
    function addItem(tripId, dayIndex, item) {
        updateTrip(tripId, (t)=>{
            const days = [
                ...t.days
            ];
            days[dayIndex] = {
                ...days[dayIndex],
                items: [
                    ...days[dayIndex].items,
                    {
                        id: uid("item"),
                        ...item
                    }
                ]
            };
            return {
                ...t,
                days
            };
        });
    }
    function removeItem(tripId, dayIndex, itemId) {
        updateTrip(tripId, (t)=>{
            const days = [
                ...t.days
            ];
            days[dayIndex] = {
                ...days[dayIndex],
                items: days[dayIndex].items.filter((i)=>i.id !== itemId)
            };
            return {
                ...t,
                days
            };
        });
    }
    function addParticipant(tripId, name) {
        updateTrip(tripId, (t)=>({
                ...t,
                participants: [
                    ...t.participants,
                    {
                        id: uid("p"),
                        name
                    }
                ]
            }));
    }
    function addExpense(tripId, expense) {
        updateTrip(tripId, (t)=>({
                ...t,
                expenses: [
                    ...t.expenses,
                    {
                        id: uid("exp"),
                        ...expense
                    }
                ]
            }));
    }
    function removeExpense(tripId, expenseId) {
        updateTrip(tripId, (t)=>({
                ...t,
                expenses: t.expenses.filter((e)=>e.id !== expenseId)
            }));
    }
    const value = {
        trips,
        createTrip,
        addItem,
        removeItem,
        addParticipant,
        addExpense,
        removeExpense
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TripContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/TripContext.jsx",
        lineNumber: 119,
        columnNumber: 10
    }, this);
}
function useTrips() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(TripContext);
    if (!ctx) throw new Error("useTrips must be used within a TripProvider");
    return ctx;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1v28yiu._.js.map