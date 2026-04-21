"use client";

import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { scrollToSignup } from "@/lib/utils/navigation";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-16 items-center min-h-screen">
          <div className="lg:pr-8 xl:pr-16 z-10">
            <div className="inline-flex items-center bg-orange-100 backdrop-blur-sm rounded-3xl px-4 py-2 text-sm font-medium text-gray-900 mb-8">
              BEM-VINDO AO AGRO GAME
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Transforme o relacionamento em benefícios
            </h1>

            <p className="text-lg md:text-xl text-gray-900 mb-8 max-w-xl">
              Conecte sua empresa a soluções exclusivas, parcerias estratégicas e vantagens 
              que aceleram o crescimento no campo. Com o Agrogame, engajamento vira 
              resultado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 hidden">
              <Button
                onClick={() => scrollToSignup('company')}
                className="bg-blue-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-blue-700 transition-colors duration-200 inline-flex items-center justify-center gap-2 min-w-fit h-auto cursor-pointer"
              >
                Cadastrar Minha Empresa
              </Button>
              
              <Button
                onClick={() => scrollToSignup('producer')}
                className="bg-blue-50 text-blue-600 px-6 py-3 rounded-md text-base font-medium hover:bg-blue-600 hover:text-white transition-colors duration-200 inline-flex items-center justify-center gap-2 min-w-fit h-auto cursor-pointer"
              >
                <FaPlay className="w-3 h-3" /> Sou Produtor Rural
              </Button>
            </div>
          </div>

          <div className="relative lg:pl-0 xl:pl-8 -mr-4 sm:-mr-6 lg:-mr-16 xl:-mr-32">
            <div className="relative w-full h-full flex items-center justify-center lg:justify-end">
              <div className="relative w-full lg:w-[120%] xl:w-[140%]">
                <Image
                  src="/assets/svgs/bannerHero.svg"
                  alt="Produtor Rural no Campo"
                  width={900}
                  height={900}
                  priority
                  className="w-full h-auto object-contain lg:scale-110 xl:scale-125"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}