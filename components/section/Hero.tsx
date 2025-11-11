"use client";

import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          <div className="lg:pr-8">
            <div className="inline-flex items-center bg-orange-100 backdrop-blur-sm rounded-3xl px-4 py-2 text-sm font-medium text-gray-900 mb-8">
              BEM-VINDO AO AGRO GAME
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Transforme o relacionamento em benefícios
            </h1>

            <p className="text-lg text-gray-900 mb-8 max-w-xl">
              Conecte sua empresa a soluções exclusivas, parcerias estratégicas e vantagens 
              que aceleram o crescimento no campo. Com o Agrogame, engajamento vira 
              resultado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                onClick={() => document.getElementById('cadastro')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200 inline-flex items-center justify-center gap-2 min-w-fit h-auto cursor-pointer"
              >
                Cadastrar Minha Empresa
              </Button>
              
              <Button
                onClick={() => document.getElementById('produtor')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-50 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors duration-200 inline-flex items-center justify-center gap-2 min-w-fit h-auto cursor-pointer"
              >
                <FaPlay className="w-3 h-3" /> Sou Produtor Rural
              </Button>
            </div>

            {/* <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Mais de 1000 empresas cadastradas</span>
              </div>
            </div> */}
          </div>

          <div className="relative lg:pl-8">
            <div className="relative">
              <div className="relative">
                <Image
                  src="/assets/svgs/farmer.svg"
                  alt="Produtor Rural no Campo"
                  width={422}
                  height={781}
                  priority
                  className="w-full h-auto rounded-2xl"
                />
              </div>

              <div className="absolute -top-6 -left-6 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Image
                    src="/assets/svgs/alerts.svg"
                    alt="Alerts"
                    width={153}
                    height={153}
                    className="w-[153px] h-[153px]"
                  />
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-3 border border-gray-100">
                <div className="flex items-center space-x-2">
                  <Image
                    src="/assets/svgs/calendar.svg"
                    alt="Calendar"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="text-xs font-medium text-gray-700">Agenda</span>
                </div>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 -right-8 bg-white rounded-lg shadow-lg p-3 border border-gray-100">
                <div className="flex items-center justify-center">
                  <Image
                    src="/assets/svgs/shield.svg"
                    alt="Shield Protection"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">142×142</div>
                  <div className="text-xs text-gray-500">Benefícios ativos</div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-3 border border-gray-100">
                <div className="flex items-center space-x-2">
                  <Image
                    src="/assets/svgs/chart.svg"
                    alt="Analytics Chart"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="text-xs font-medium text-gray-700">Analytics</span>
                </div>
              </div>

              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg px-3 py-1 border border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-700">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}