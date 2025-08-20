"use client";

import { useState } from "react";

export default function ErrorTester() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error("Test error for Error Boundary!");
  }

  return (
    <div className="p-4 bg-red-900/20 border border-red-500 rounded-xl">
      <h3 className="text-red-400 font-semibold mb-2">Error Boundary Tester</h3>
      <p className="text-gray-300 text-sm mb-4">
        This button will trigger an error to test the Error Boundary
      </p>
      <button
        onClick={() => setShouldError(true)}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
        🚨 Trigger Error
      </button>
    </div>
  );
}
