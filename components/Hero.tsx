import Link from "next/link";
import { FaPlay } from "react-icons/fa6";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content */}
          <div className="lg:pr-8">
            {/* Badge */}
            <div className="inline-flex items-center bg-[#FFE9BD] backdrop-blur-sm rounded-3xl px-4 py-2 text-sm font-medium text-gray-900 mb-8">
              BEM-VINDO AO AGRO GAME
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Transforme o relacionamento em benefícios
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-900 mb-8 max-w-xl">
              Conecte sua empresa a soluções exclusivas, parcerias estratégicas e vantagens 
              que aceleram o crescimento no campo. Com o Agrogame, engajamento vira 
              resultado.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="#cadastro"
                className="bg-[#0b63e5] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0059cf] transition-colors duration-200 inline-flex items-center justify-center gap-2 min-w-fit"
              >
                Cadastrar Minha Empresa
              </Link>
              
              <Link
                href="#produtor"
                className="bg-[#F0F5FF] text-[#0b63e5] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0b63e5] hover:text-white transition-colors duration-200 inline-flex items-center justify-center gap-2 min-w-fit"
              >
                <FaPlay className="w-3 h-3" /> Sou Produtor Rural
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}