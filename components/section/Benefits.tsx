"use client";

import FeatureCard from "@/components/common/feature-card";
import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/lib/utils/navigation";

export default function Benefits() {
  const benefits = [
    {
      id: 1,
      title: "Descontos em insumos e maquinário",
      description: "Economia real em fertilizantes, defensivos, sementes e equipamentos através da nossa rede de parceiros homologados que oferecem condições exclusivas.",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      title: "Rede de parceiros do agronegócio",
      description: "Acesse uma rede crescente de fornecedores, cooperativas, consultorias técnicas e instituições financeiras especializadas no setor agrícola.",
      bgColor: "bg-fuchsia-50"
    },
    {
      id: 3,
      title: "Suporte especializado",
      description: "Conte com uma equipe que entende as particularidades do agronegócio e oferece suporte técnico rápido e eficiente para empresas e produtores.",
      bgColor: "bg-gray-100"
    },
    {
      id: 4,
      title: "Programas de fidelidade personalizados",
      description: "Configure regras de pontuação, defina benefícios específicos e crie campanhas direcionadas que aumentam o engajamento dos seus produtores rurais.",
      bgColor: "bg-emerald-50"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="flex flex-col sm:flex-row gap-6 order-2 lg:order-1">
            <div className="flex flex-col gap-6">
              {benefits.filter(benefit => benefit.id === 1 || benefit.id === 3).map((benefit) => (
                <FeatureCard
                  key={benefit.id}
                  title={benefit.title}
                  description={benefit.description}
                  icon="/assets/svgs/benefits.svg"
                  backgroundColor={benefit.bgColor}
                  iconSize="lg"
                  className={`w-full sm:w-[312px] h-[340px] ${benefit.id === 3 ? 'mb-12' : ''}`}
                />
              ))}
            </div>

            <div className="flex flex-col gap-6 mt-0 sm:mt-12">
              {benefits.filter(benefit => benefit.id === 2 || benefit.id === 4).map((benefit) => (
                <FeatureCard
                  key={benefit.id}
                  title={benefit.title}
                  description={benefit.description}
                  icon="/assets/svgs/benefits.svg"
                  backgroundColor={benefit.bgColor}
                  iconSize="lg"
                  className="w-full sm:w-[312px] h-[340px]"
                />
              ))}
            </div>
          </div>

          <div className="ml-4 sm:ml-8 md:ml-12 lg:ml-16 xl:ml-20 order-1 lg:order-2 flex flex-col justify-center">
            <h2 className="font-bold text-[28px] sm:text-[36px] md:text-[48px] lg:text-[56px] 
                          leading-none sm:leading-none md:leading-none lg:leading-none 
                          tracking-[-2%] text-blue-950 mb-6">
              Benefícios e Diferenciais
            </h2>
            
            <p className="font-normal text-[14px] sm:text-[16px] md:text-[17px] lg:text-[18px]
                         leading-relaxed
                         tracking-[0%] text-blue-950 mb-8">
              Por que o Agrogame é diferente de tudo que você já viu no <br />agro
            </p>

            <Button
              onClick={() => {
                scrollToElement('signup');
              }}
              className="inline-flex items-center bg-blue-600 text-white 
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
        </div>
      </div>
    </section>
  );
}