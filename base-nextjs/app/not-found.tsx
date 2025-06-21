// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="mt-4 text-gray-600">
        Sorry, the page you are looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="mt-6 px-4 py-2 bg-primary text-white rounded hover:bg-primary/70"
      >
        Go Home
      </Link>
    </div>
  );
}
