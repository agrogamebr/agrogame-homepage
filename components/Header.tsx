"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "Como funciona", href: "#about" },
    { name: "Para empresas", href: "#companies" },
    { name: "Para produtores", href: "#producers" },
    { name: "Benefícios e Diferencias", href: "#benefits" },
  ];

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-green-600">
                <Image
                  className="dark"
                  src="/logo.svg"
                  alt="AgroGame Logo"
                  width={180}
                  height={49}
                  priority
                />
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="#contact"
              className="bg-[#0b63e5] text-white px-4 py-2 rounded-sm text-sm font-medium hover:bg-[#0059cf] transition-colors duration-200"
            >
              Quero Fazer Parte do Agro Game
            </Link>
          </div>

          <div className="hidden md:block">
            <Link
              href="#contact"
              className="bg-transparent text-[#0b63e5] px-4 py-2 rounded-sm text-sm border border-[#0b63e5] font-medium hover:bg-[#0b63e5] hover:text-white transition-colors duration-200 ml-5"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#0b63e5] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0b63e5]"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#0b63e5] hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="#contact"
                className="block w-full text-center bg-[#0b63e5] text-white px-3 py-2 rounded-lg text-base font-medium hover:bg-[#0059cf] transition-colors duration-200 mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Quero Fazer Parte do Agro Game
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}