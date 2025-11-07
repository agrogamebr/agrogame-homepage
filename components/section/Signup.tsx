"use client";

import { useState } from "react";
import { SignupType } from "@/components/ui/signuptype";

export default function SignupSection() {
  const [selectedType, setSelectedType] = useState<boolean>(false); // false = empresa, true = produtor

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-950 mb-6">
            Pronto para transformar
            <br />
            o agronegócio?
          </h2>

          <p className="text-lg text-gray-600 mb-8">
            Escolha como deseja se cadastrar
          </p>

          <div className="flex justify-center items-center gap-4 mb-12 flex-wrap">
            <SignupType 
              value={selectedType} 
              onValueChange={setSelectedType}
            />
          </div>

          <div className="mt-8">
            {!selectedType && (
              <p className="text-gray-600 text-sm">
                Cadastre sua empresa e tenha acesso a soluções completas para o agronegócio
              </p>
            )}
            {selectedType && (
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