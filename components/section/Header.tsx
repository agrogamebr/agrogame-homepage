"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { handleNavClick, scrollToElement } from "@/lib/utils/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "Como funciona", href: "#howitworks" },
    { name: "Para empresas", href: "#companies" },
    { name: "Para produtores", href: "#producers" },
    { name: "Benefícios e Diferencias", href: "#benefits" },
  ];

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleNavClick(e, href);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-2 min-w-0">
          <div className="shrink-0">
            <Link href="/" className="flex items-center">
              <span>
                <Image
                  src="/logo.svg"
                  alt="AgroGame Logo"
                  width={140}
                  height={38}
                  priority
                  className="w-[120px] h-8 sm:w-[140px] sm:h-[38px] md:w-[180px] md:h-[49px]"
                />
              </span>
            </Link>
          </div>

          <div className="hidden lg:block flex-1 min-w-0">
            <div className="flex items-baseline space-x-1 xl:space-x-3 justify-center">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => onNavClick(e, item.href)}
                  className="px-2 xl:px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 whitespace-nowrap"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="!hidden lg:flex items-center space-x-2 shrink-0">
            <Button
              onClick={() => scrollToElement('signup')}
              className="hidden bg-blue-600 text-white px-2 xl:px-4 py-2 rounded-md text-xs xl:text-sm font-medium hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap leading-tight h-auto cursor-pointer"
              title="Quero Fazer Parte Do Agro Game"
            >
              <span className="xl:hidden">Fazer Parte</span>
              <span className="hidden xl:inline">Quero Fazer Parte Do Agro Game</span>
            </Button>
            {/* <Link
              href="#login"
              className="bg-transparent text-blue-600 px-2 xl:px-4 py-2 rounded-md text-xs xl:text-sm border border-blue-600 font-medium hover:bg-blue-600 hover:text-white transition-colors duration-200 whitespace-nowrap leading-tight"
            >
              Login
            </Link> */}
          </div>
          <div className="!hidden md:block lg:hidden">
            <Button
              onClick={() => scrollToElement('signup')}
              className="bg-blue-600 text-white px-3 py-2 rounded-sm text-xs font-medium hover:bg-blue-700 transition-colors duration-200 h-auto cursor-pointer"
            >
              Fazer Parte
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => onNavClick(e, item.href)}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2 hidden">
                <Button
                  onClick={() => {
                    scrollToElement('signup');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-center bg-blue-600 text-white px-3 py-2 rounded-lg text-base font-medium hover:bg-blue-700 transition-colors duration-200 h-auto cursor-pointer"
                >
                  Fazer Parte
                </Button>
                {/* <Link
                  href="#login"
                  className="block w-full text-center bg-transparent text-blue-600 px-3 py-2 rounded-lg text-base border border-blue-600 font-medium hover:bg-blue-600 hover:text-white transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link> */}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}