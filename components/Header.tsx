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
              <span>
                <Image
                  src="/assets/svgs/logo.svg"
                  alt="AgroGame Logo"
                  width={140}
                  height={38}
                  priority
                  className="w-[140px] h-[38px] sm:w-40 sm:h-[43px] md:w-[180px] md:h-[49px]"
                />
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#0b63e5] transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="#signup"
              className="bg-[#0b63e5] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0059cf] transition-colors duration-200"
            >
              Quero Fazer Parte Do Agro Game
            </Link>
            <Link
              href="#login"
              className="bg-transparent text-[#0b63e5] px-4 py-2 rounded-md text-sm border border-[#0b63e5] font-medium hover:bg-[#0b63e5] hover:text-white transition-colors duration-200"
            >
              Login
            </Link>
          </div>

          {/* Tablet CTA - Only main button */}
          <div className="hidden md:block lg:hidden">
            <Link
              href="#signup"
              className="bg-[#0b63e5] text-white px-3 py-2 rounded-sm text-xs font-medium hover:bg-[#0059cf] transition-colors duration-200"
            >
              Fazer Parte
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
              <div className="pt-4 space-y-2">
                <Link
                  href="#signup"
                  className="block w-full text-center bg-[#0b63e5] text-white px-3 py-2 rounded-lg text-base font-medium hover:bg-[#0059cf] transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Fazer Parte
                </Link>
                <Link
                  href="#login"
                  className="block w-full text-center bg-transparent text-[#0b63e5] px-3 py-2 rounded-lg text-base border border-[#0b63e5] font-medium hover:bg-[#0b63e5] hover:text-white transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}