"use client";

import { useState } from "react";
import { SignupType } from "@/components/common/signuptype";
import CompanySignupForm from "@/components/forms/CompanySignupForm";
import { CompanySignupData } from "@/lib/schemas";
import { ProducerSignupData } from "@/lib/schemas-producer";
import { useCreateCompany } from "@/lib/api/company";
import { useToast } from "@/components/ui/toast";

export default function SignupSection() {
  const [selectedType, setSelectedType] = useState<boolean>(false); // false = empresa, true = produtor

  const { showToast, ToastContainer } = useToast();
  const createCompanyMutation = useCreateCompany();

  const handleCompanySignup = async (data: CompanySignupData) => {
    try {
      const result = await createCompanyMutation.mutateAsync(data);

      showToast(
        result.message || 'Cadastro de empresa realizado com sucesso!',
        'success'
      );
      console.log("✅ Empresa cadastrada com sucesso:", result);
      
      // TODO: Validar o que deve ser feito após cadastro bem-sucedido
      
    } catch (error) {
      console.error("❌ Erro completo ao cadastrar empresa:", error);
      
      let errorMessage = 'Erro inesperado ao cadastrar empresa';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      if (errorMessage.includes('CNPJ')) {
        errorMessage = 'CNPJ inválido ou já cadastrado';
      } else if (errorMessage.includes('email')) {
        errorMessage = 'Email já cadastrado ou inválido';
      } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        errorMessage = 'Erro de conexão. Verifique sua internet e tente novamente';
      }
      
      showToast(errorMessage, 'error');
    }
  };

  const handleProducerSignup = (data: ProducerSignupData) => {
    console.log("Producer registration:", data);
    // TODO: Implementar integração com API do produtor
    alert("Cadastro de produtor realizado com sucesso!");
  };

  return (
    <>
      <section className="bg-gray-50 py-20">
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
                <div className="text-center p-8">
                  <p className="text-gray-600">
                    Formulário de produtor em desenvolvimento...
                  </p>
                  <button 
                    onClick={() => handleProducerSignup({} as ProducerSignupData)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Teste Cadastro Produtor
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <ToastContainer />
    </>
  );
}