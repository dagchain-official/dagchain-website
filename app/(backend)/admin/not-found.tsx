"use client";

export default function NotFound() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4 font-sora">
          404
        </h1>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4 font-sora">
          Page Not Found
        </h2>

        <p className="text-gray-600 mb-8 font-inter">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <a
          href={"/admin"}
          className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
        >
          {"Go to Admin Dashboard"}
        </a>
      </div>
    </div>
  );
}
