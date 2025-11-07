"use client";

import { useState } from "react";
import ToggleButton from "../ui/ToggleButton";

export default function SignupSection() {
  const [selectedType, setSelectedType] = useState<'empresa' | 'produtor'>('empresa');

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Título principal */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#061C3D] mb-6">
            Pronto para transformar
            <br />
            o agronegócio?
          </h2>
          
          {/* Subtítulo */}
          <p className="text-lg text-gray-600 mb-8">
            Escolha como deseja se cadastrar
          </p>
          
          {/* Botões de seleção */}
          <div className="flex justify-center items-center gap-4 mb-12 flex-wrap">
            
          </div>
          
          {/* Conteúdo dinâmico baseado na seleção */}
          <div className="mt-8">
            {selectedType === 'empresa' && (
              <p className="text-gray-600 text-sm">
                Cadastre sua empresa e tenha acesso a soluções completas para o agronegócio
              </p>
            )}
            {selectedType === 'produtor' && (
              <p className="text-gray-600 text-sm">
                Cadastre-se como produtor rural e transforme sua propriedade
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}