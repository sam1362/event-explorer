"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; 

const ROUTES = [
  { href: "/", title: "Home" },
  { href: "/under-construction",  title: "Events" },
  { href: "/under-construction", title: "About" },
  { href: "/under-construction", title: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-teal-900 text-white px-6 py-4 shadow-md relative z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">EventFin</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 font-medium">
          {ROUTES.map((route) => (
            <li key={route.href + route.title}>
              <Link
                href={route.href}
                className="hover:text-teal-300 border-b-2 border-transparent hover:border-teal-400 transition"
              >
                {route.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Signup Button (Desktop Only) */}
        <button className="hidden md:block bg-white text-teal-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100">
          Sign Up
        </button>

        {/* Hamburger Icon (Mobile Only) */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-teal-800"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* 🔥 Fullscreen Mobile Menu (Top-Left Layout) */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-teal-900 bg-opacity-95 text-white text-lg z-40 transition-all duration-300"
        >
          {/* close button*/}
          <button
            className="absolute top-5 right-6 text-white hover:text-teal-300"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={30} />
          </button>

          {/* menu left*/}
          <div className="flex flex-col items-start justify-start mt-20 ml-8 space-y-6">
            <ul className="flex flex-col items-start gap-4 font-medium">
              {ROUTES.map((route) => (
                <li key={route.href + route.title}>
                  <Link
                    href={route.href}
                    className="hover:text-teal-300 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    {route.title}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Sign Up Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="mt-8 bg-white text-teal-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
