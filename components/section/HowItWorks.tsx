import Image from "next/image";
import Link from "next/link";
import FeatureCard from "@/components/common/feature-card";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      icon: "/assets/svgs/signup.svg",
      title: "Cadastre sua empresa",
      description: "Registre-se na plataforma e acesse o painel de gestão completo para configurar benefícios e monitorar resultados.",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      icon: "/assets/svgs/benefits.svg",
      title: "Acesse benefícios e parceiros",
      description: "Conecte-se a uma rede exclusiva de fornecedores, descontos em insumos, seguros especializados e linhas de crédito diferenciadas.",
      bgColor: "bg-pink-50"
    },
    {
      id: 3,
      icon: "/assets/svgs/incentive.svg",
      title: "Incentive seus colaboradores",
      description: "Ofereça recompensas tangíveis que motivam produtores a utilizarem mais serviços do ecossistema e gerarem dados valiosos para sua operação.",
      bgColor: "bg-cyan-50"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden lg:flex justify-between items-center w-full max-w-[1320px] h-[260px] mx-auto mb-8">
          <div className="flex items-center space-x-0">
            <div className="shrink-0">
              <Image
                src="/assets/svgs/works.svg"
                alt="How It Works Icon"
                width={280}
                height={260}
                className="w-[280px] h-[260px]"
              />
            </div>

            <div className="flex items-center ml-8">
              <h2 className="w-[616px] h-[120px] flex items-center font-bold text-[56px] leading-[60px] tracking-[-0.02em] text-blue-950">
                Como o Agro Game funciona?
              </h2>
            </div>
          </div>

          <div className="shrink-0">
            <p className="w-[312px] h-[84px] font-normal text-[20px] leading-7 tracking-[0%] text-blue-950 text-left flex items-center justify-end">
              Em poucos cliques, sua empresa 
              se conecta ao futuro do 
              agronegócio.
            </p>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="flex flex-col space-y-6 items-center text-center">
            <div>
              <Image
                src="/assets/svgs/works.svg"
                alt="How It Works Icon"
                width={280}
                height={260}
                className="w-[200px] h-[185px] sm:w-60 sm:h-[222px]"
              />
            </div>

            <div>
              <h2 className="font-bold text-[32px] leading-9 sm:text-[40px] sm:leading-11 tracking-[-0.02em] text-blue-950">
                Como o Agro Game funciona?
              </h2>
            </div>

            <div>
              <p className="font-normal text-[16px] leading-6 sm:text-[18px] sm:leading-[26px] tracking-[0%] text-blue-950 max-w-[280px] sm:max-w-[320px]">
                Em poucos cliques, sua empresa 
                se conecta ao futuro do 
                agronegócio.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {steps.map((step) => (
            <FeatureCard
              key={step.id}
              title={step.title}
              description={step.description}
              icon={step.icon}
              backgroundColor={step.bgColor}
              iconSize="xl"
              padding="p-4 sm:p-6 md:p-8"
              className="h-full"
            >
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}