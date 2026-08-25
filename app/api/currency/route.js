import { NextResponse } from "next/server";

// This route needs no mock fallback and no API key: Frankfurter is a genuinely
// free, keyless exchange-rate API (built on European Central Bank reference
// rates). It's the one integration in this project that's fully live by default.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const from = (searchParams.get("from") || "USD").toUpperCase();
  const to = (searchParams.get("to") || "EUR").toUpperCase();
  const amount = Number(searchParams.get("amount") || 1);

  try {
    const data = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
    ).then((r) => r.json());

    const converted = data?.rates?.[to];
    if (typeof converted !== "number") {
      throw new Error("Unexpected response shape from currency service");
    }

    return NextResponse.json({
      source: "live",
      from,
      to,
      amount,
      converted,
      rate: converted / amount,
      date: data.date,
    });
  } catch (err) {
    console.error("Frankfurter request failed:", err);
    return NextResponse.json(
      { source: "error", error: "Could not reach the currency conversion service" },
      { status: 502 }
    );
  }
}
