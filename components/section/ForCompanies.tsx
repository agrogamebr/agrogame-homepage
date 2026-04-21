"use client";

import FeatureCard from "@/components/common/feature-card";
import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/lib/utils/navigation";

export default function ForCompanies() {
  const benefits = [
    {
      id: 1,
      icon: "/assets/svgs/costReduction.svg",
      title: "Redução de custos operacionais:",
      description: "Acesse descontos corporativos em insumos agrícolas, maquinário, seguros e serviços especializados através da rede de parceiros Agrogame.",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      icon: "/assets/svgs/relationship.svg", 
      title: "Fortalecimento do relacionamento:",
      description: "Ofereça benefícios exclusivos aos produtores rurais vinculados à sua empresa, aumentando fidelização e engajamento contínuo.",
      bgColor: "bg-fuchsia-50"
    },
    {
      id: 3,
      icon: "/assets/svgs/dataInsight.svg",
      title: "Dados e insights estratégicos:",
      description: "Monitore o uso de benefícios, identifique padrões de comportamento e tome decisões baseadas em dados reais do campo.",
      bgColor: "bg-gray-100"
    },
    {
      id: 4,
      icon: "/assets/svgs/sustainableGrowth.svg",
      title: "Crescimento sustentável:",
      description: "Construa um ecossistema de relacionamento que transforma produtores em parceiros de longo prazo, gerando valor compartilhado.",
      bgColor: "bg-emerald-50"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="lg:pr-8">
            <h2 className="font-bold text-[28px] sm:text-[36px] md:text-[48px] lg:text-[56px] 
                          leading-none sm:leading-none md:leading-none lg:leading-none 
                          tracking-[-2%] text-blue-950 mb-6">
              Empresas do agro que crescem juntas, crescem mais rápido
            </h2>
            
            <p className="font-normal text-[14px] sm:text-[16px] md:text-[17px] lg:text-[18px]
                         leading-relaxed
                         tracking-[0%] text-blue-950 mb-8">
              O Agrogame é o hub de conexão entre sua empresa e um ecossistema de parceiros estratégicos que impulsionam resultados no campo.
            </p>

            <Button
              onClick={() => {
                scrollToElement('signup');
              }}
              className="hidden inline-flex items-center bg-blue-600 text-white 
                        px-8 py-3 rounded-lg gap-3
                        font-semibold hover:bg-blue-700 transition-colors duration-200
                        text-sm lg:text-base
                        w-fit h-auto cursor-pointer"
            >
              Quero Fazer Parte Do Ecossistema Agrogame
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col gap-6">
              {benefits.filter(benefit => benefit.id === 1 || benefit.id === 3).map((benefit) => (
                <FeatureCard
                  key={benefit.id}
                  title={benefit.title}
                  description={benefit.description}
                  icon={benefit.icon}
                  backgroundColor={benefit.bgColor}
                  iconSize="sm"
                  className={`w-full sm:w-[312px] h-[280px] ${benefit.id === 3 ? 'mb-12' : ''}`}
                />
              ))}
            </div>

            <div className="flex flex-col gap-6 mt-0 sm:mt-12">
              {benefits.filter(benefit => benefit.id === 2 || benefit.id === 4).map((benefit) => (
                <FeatureCard
                  key={benefit.id}
                  title={benefit.title}
                  description={benefit.description}
                  icon={benefit.icon}
                  backgroundColor={benefit.bgColor}
                  iconSize="sm"
                  className="w-full sm:w-[312px] h-[280px]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}