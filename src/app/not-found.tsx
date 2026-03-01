"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white">
      {/* Floating Blobs */}
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-purple-500 opacity-30 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-500 opacity-30 blur-3xl"
      />

      {/* Glass Card */}
      <div className="relative z-10 rounded-3xl border border-white/20 bg-white/10 p-12 text-center backdrop-blur-xl shadow-2xl max-w-lg">
        <h1 className="text-8xl font-extrabold bg-linear-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="mt-6 text-2xl font-semibold">Oops! Page Not Found</h2>

        <p className="mt-4 text-gray-300">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <Link href="/">
          <button className="mt-8 rounded-full bg-linear-to-r from-purple-500 to-indigo-600 px-8 py-3 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
}
