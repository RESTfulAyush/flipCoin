"use client";

import { useState } from "react";

export default function HomePage() {
  const [result, setResult] = useState<"Heads" | "Tails" | null>(null);

  const flipCoin = () => {
    const outcome = Math.random() < 0.5 ? "Heads" : "Tails";
    setResult(outcome);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4">
      <h1 className="text-4xl font-bold mb-6">🪙 Head or Tail</h1>

      <button
        onClick={flipCoin}
        className="bg-white text-black px-6 py-2 rounded-lg shadow hover:bg-gray-100 transition"
      >
        Flip
      </button>

      {result && (
        <div className="mt-8 text-2xl font-semibold">
          Result: <span className="text-yellow-400">{result}</span>
        </div>
      )}
    </main>
  );
}
