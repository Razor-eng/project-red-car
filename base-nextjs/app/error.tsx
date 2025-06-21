"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-4xl font-bold text-red-600">Something went wrong!</h1>
      <p className="mt-4 text-gray-600">{error.message}</p>
      <button
        onClick={reset}
        className="mt-6 px-4 py-2 bg-primary text-white rounded hover:bg-primary/70"
      >
        Try Again
      </button>
    </div>
  );
}
