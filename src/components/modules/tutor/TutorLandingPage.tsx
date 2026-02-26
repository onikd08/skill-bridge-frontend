"use client";

import { useState } from "react";
import Image from "next/image";

interface Tutor {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function TutorLanding({ tutor }: { tutor: Tutor }) {
  const [name, setName] = useState(tutor.name);
  const [imageUrl, setImageUrl] = useState<string | null>(tutor.imageUrl);

  const handleUpdate = async () => {
    console.log({ name, imageUrl });
  };

  return (
    // Updated background for dark mode
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-800 shadow-xl dark:shadow-2xl rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 border border-transparent dark:border-slate-700">
          {/* Avatar */}
          {imageUrl && imageUrl.startsWith("http") ? (
            <Image
              src={imageUrl}
              alt="Tutor Profile"
              width={140}
              height={140}
              // Added onError to fallback if the URL is valid but the image doesn't exist
              onError={() => setImageUrl(null)}
              className="rounded-full object-cover border-4 border-indigo-200 dark:border-indigo-900/50"
            />
          ) : (
            <div className="w-36 h-36 rounded-full bg-indigo-500 dark:bg-indigo-600 text-white flex items-center justify-center text-5xl font-bold shadow-lg">
              {name.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Info */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              {name}
            </h1>
            <p className="text-gray-500 dark:text-slate-400 mt-1">
              {tutor.email}
            </p>

            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
              <span className="px-4 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                {tutor.status}
              </span>
              <span className="px-4 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
                {tutor.role}
              </span>
            </div>

            <p className="text-sm text-gray-400 dark:text-slate-500 mt-4">
              Joined: {new Date(tutor.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Update Section */}
        <div className="bg-white dark:bg-slate-800 shadow-lg dark:shadow-2xl rounded-3xl p-8 space-y-6 border border-transparent dark:border-slate-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Update Profile
          </h2>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300">
              Name
            </label>
            <input
              className="w-full p-3 border dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300">
              Profile Image URL
            </label>
            <input
              className="w-full p-3 border dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
              value={imageUrl ?? ""}
              onChange={(e) => setImageUrl(e.target.value || null)}
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          <button
            onClick={() => {
              handleUpdate();
            }}
            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-8 py-3 rounded-xl transition-colors shadow-md active:scale-95"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
