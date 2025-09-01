"use client";

import Link from "next/link";

const ROUTES = [
  { href: "/", title: "Home" },
  { href: "/under-construction", title: "Events" },
  { href: "/under-construction", title: "About" },
  { href: "/under-construction", title: "Contact" },
];

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-teal-900 text-white">
      {/* logo */}
      <h1 className="text-2xl font-bold">EventFin</h1>

      {/* menu */}
      <ul className="flex gap-6 font-medium">
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

      {/* signup */}
      <button className="bg-white text-teal-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100">
        Sign Up
      </button>
    </nav>
  );
}
