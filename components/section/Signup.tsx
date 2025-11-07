"use client";

import { useState } from "react";
import { SignupType } from "@/components/common/signuptype";
import CompanySignupForm from "@/components/forms/CompanySignupForm";
import { CompanySignupData } from "@/lib/schemas";
import { ProducerSignupData } from "@/lib/schemas-producer";

export default function SignupSection() {
  const [selectedType, setSelectedType] = useState<boolean>(false); // false = empresa, true = produtor

  const handleCompanySignup = (data: CompanySignupData) => {
    console.log("Company registration:", data);
    // TODO: Implementar integração com API
    alert("Cadastro de empresa realizado com sucesso!");
  };

  const handleProducerSignup = (data: ProducerSignupData) => {
    console.log("Producer registration:", data);
    // TODO: Implementar integração com API
    alert("Cadastro de produtor realizado com sucesso!");
  };

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

          <div className="mt-12">
            {!selectedType ? (
              <CompanySignupForm onSubmit={handleCompanySignup} />
            ) : (
              <CompanySignupForm onSubmit={handleCompanySignup} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}