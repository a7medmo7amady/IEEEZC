"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Committees", href: "/committees" },
  { label: "Events", href: "/events" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
           <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-ieee-blue flex items-center justify-center">
                <span className="text-white text-xs font-black tracking-tight leading-none">IEEE</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-charcoal leading-tight">IEEE Zewail City</span>
                <span className="text-xs font-medium text-zc-gold">Student Branch</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-md text-sm font-medium text-charcoal hover:text-ieee-blue transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/join"
                className="ml-4 px-5 py-2 rounded-full text-sm font-semibold text-white bg-ieee-blue hover:bg-ieee-blue/80 transition-colors duration-150"
              >
                Join IEEE ZC
              </Link>
            </div>

            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-md focus:outline-none"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              <span
                className="block h-[2px] w-6 rounded-full bg-ieee-blue transition-all duration-300 origin-center"
                style={{ transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }}
              />
              <span
                className="block h-[2px] w-6 rounded-full bg-ieee-blue transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? "scaleX(0)" : "scaleX(1)" }}
              />
              <span
                className="block h-[2px] w-6 rounded-full bg-ieee-blue transition-all duration-300 origin-center"
                style={{ transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }}
              />
            </button>
          </div>
        </div>
      </nav>

      <div
        className="fixed inset-0 z-50 md:hidden flex flex-col bg-white transition-opacity duration-300"
        style={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none" }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
       
            <div className="w-12 h-12 rounded-xl bg-ieee-blue flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-black tracking-tight leading-none">IEEE</span>
            </div>
            <div>
              <p className="text-base font-bold text-charcoal leading-tight">IEEE Zewail City</p>
              <p className="text-xs font-medium text-zc-gold">Student Branch</p>
            </div>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-md text-charcoal"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col px-4 pt-4 gap-1 flex-1 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-5 py-4 rounded-xl text-base font-semibold transition-colors duration-150 ${
                  isActive
                    ? "bg-ieee-blue text-white"
                    : "text-charcoal hover:bg-ieee-blue/10 hover:text-ieee-blue"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="px-4 pb-10 pt-4 flex flex-col gap-3">
          <div className="h-px bg-gray-100" />
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full text-sm font-semibold text-ieee-blue border-2 border-ieee-blue hover:bg-ieee-blue/10 transition-colors duration-150"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Login
          </Link>
          <Link
            href="/join"
            onClick={() => setMenuOpen(false)}
            className="block w-full px-5 py-3 rounded-full text-sm font-semibold text-white text-center bg-ieee-blue hover:bg-ieee-blue/80 transition-colors duration-150"
          >
            Join IEEE ZC
          </Link>
        </div>
      </div>
    </>
  );
}
