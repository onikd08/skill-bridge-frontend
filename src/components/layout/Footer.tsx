"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-linear-to-r from-indigo-600 to-purple-600 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold tracking-wide">Skill-Bridge</h2>
            <p className="mt-3 text-indigo-100 text-sm leading-relaxed">
              Connecting students with expert tutors to achieve academic
              success. Learn smarter, grow faster.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-indigo-100">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tutors" className="hover:text-white transition">
                  Find Tutors
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <p className="text-indigo-100 text-sm">
              📧 support@tutorconnect.com
            </p>
            <p className="text-indigo-100 text-sm mt-2">📍 Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-indigo-400 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-indigo-200">
          <p>© {new Date().getFullYear()} TutorConnect. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
