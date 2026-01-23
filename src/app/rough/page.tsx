"use client";

import { useState } from "react";

export default function Page() {
  const {count, setCount} = useState(0);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Hello Next.js 👋</h1>
      <p className="mb-6">This is a simple rough page setup.</p>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          -
        </button>

        <span className="text-xl font-semibold">{count}</span>

        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          +
        </button>
      </div>
    </main>
  );
}

