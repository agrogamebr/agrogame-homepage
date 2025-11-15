"use client";

import { useState, useEffect, useRef } from "react";
import { SignupType } from "@/components/common/signuptype";
import CompanySignupForm from "@/components/forms/CompanySignupForm";
import type { CompanySignupFormRef } from "@/components/forms/CompanySignupForm";
import { CompanySignupData } from "@/lib/schemas/companySignup";
import { ProducerSignupData } from "@/lib/schemas/producerSignup";
import { useCreateCompany } from "@/lib/api/company";
import { useCreateProducer } from "@/lib/api/producer";
import { useToast } from "@/components/ui/toast";

import ProducerSignupForm from "../forms/ProducerSignupForm";
import type { ProducerSignupFormRef } from "../forms/ProducerSignupForm";

export default function SignupSection() {
  const [selectedType, setSelectedType] = useState<boolean>(false); // false = empresa, true = produtor
  const companyFormRef = useRef<CompanySignupFormRef>(null);
  const producerFormRef = useRef<ProducerSignupFormRef>(null);

  const { showToast, ToastContainer } = useToast();
  const createCompanyMutation = useCreateCompany();
  const createProducerMutation = useCreateProducer();

  useEffect(() => {
    const handleSetSignupType = (event: CustomEvent<{ type: 'company' | 'producer' }>) => {
      const isProducer = event.detail.type === 'producer';
      setSelectedType(isProducer);
    };

    window.addEventListener('setSignupType', handleSetSignupType as EventListener);

    return () => {
      window.removeEventListener('setSignupType', handleSetSignupType as EventListener);
    };
  }, []);

  const handleCompanySignup = async (data: CompanySignupData) => {
    try {
      const result = await createCompanyMutation.mutateAsync(data);

      showToast(
        result.message || 'Cadastro de empresa realizado com sucesso!',
        'success'
      );
      console.log("✅ Empresa cadastrada com sucesso:", result);
      
      companyFormRef.current?.reset();
      
    } catch (error) {
      console.error("❌ Erro completo ao cadastrar empresa:", error);
      
      let errorMessage = 'Erro inesperado ao cadastrar empresa';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.log("Singup ERROR: ", errorMessage);

      if (errorMessage.toLowerCase().includes('cnpj')) {
        errorMessage = 'CNPJ inválido ou já cadastrado';
      } else if (errorMessage.toLowerCase().includes('email') || errorMessage.toLowerCase().includes('e-mail')) {
        errorMessage = 'Email já cadastrado ou inválido';
      } else if (errorMessage.toLowerCase().includes('network') || errorMessage.toLowerCase().includes('fetch')) {
        errorMessage = 'Erro de conexão. Verifique sua internet e tente novamente';
      } else if (errorMessage.toLowerCase().includes('timeout')) {
        errorMessage = 'Tempo de resposta excedido. Tente novamente';
      } else if (errorMessage.toLowerCase().includes('400')) {
        errorMessage = 'Dados inválidos. Verifique as informações e tente novamente';
      } else if (errorMessage.toLowerCase().includes('500')) {
        errorMessage = 'Erro no servidor. Tente novamente mais tarde';
      }
      
      showToast(errorMessage, 'error');
    }
  };

  const handleProducerSignup = async (data: ProducerSignupData) => {
    try {
      const result = await createProducerMutation.mutateAsync(data);

      showToast(
        result.message || 'Cadastro de produtor realizado com sucesso!',
        'success'
      );
      console.log("✅ Produtor cadastrado com sucesso:", result);
      
      // Resetar formulário após sucesso
      producerFormRef.current?.reset();
      
    } catch (error) {
      console.error("❌ Erro ao cadastrar produtor:", error);
      
      let errorMessage = 'Erro inesperado ao cadastrar produtor';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      // Tratamento específico de erros
      if (errorMessage.toLowerCase().includes('cpf') || errorMessage.toLowerCase().includes('documento')) {
        errorMessage = 'Documento inválido ou já cadastrado';
      } else if (errorMessage.toLowerCase().includes('email') || errorMessage.toLowerCase().includes('e-mail')) {
        errorMessage = 'Email já cadastrado ou inválido';
      } else if (errorMessage.toLowerCase().includes('network') || errorMessage.toLowerCase().includes('fetch')) {
        errorMessage = 'Erro de conexão. Verifique sua internet e tente novamente';
      } else if (errorMessage.toLowerCase().includes('timeout')) {
        errorMessage = 'Tempo de resposta excedido. Tente novamente';
      } else if (errorMessage.toLowerCase().includes('400')) {
        errorMessage = 'Dados inválidos. Verifique as informações e tente novamente';
      } else if (errorMessage.toLowerCase().includes('500')) {
        errorMessage = 'Erro no servidor. Tente novamente mais tarde';
      }
      
      showToast(errorMessage, 'error');
    }
  };

  return (
    <>
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
                <CompanySignupForm ref={companyFormRef} onSubmit={handleCompanySignup} />
              ) : (
                <ProducerSignupForm ref={producerFormRef} onSubmit={handleProducerSignup} />
              )}
            </div>
          </div>
        </div>
      </section>

      <ToastContainer />
    </>
  );
}