import Image from "next/image";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      icon: "/assets/svgs/pc.svg",
      title: "Cadastre sua empresa",
      description: "Registre-se na plataforma e acesse o painel de gestão completo para configurar benefícios e monitorar resultados.",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      icon: "/assets/svgs/chart.svg",
      title: "Acesse benefícios e parceiros",
      description: "Conecte-se a uma rede exclusiva de fornecedores, descontos em insumos, seguros especializados e linhas de crédito diferenciadas.",
      bgColor: "bg-pink-50"
    },
    {
      id: 3,
      icon: "/assets/svgs/farmer.svg",
      title: "Incentive seus colaboradores",
      description: "Ofereça recompensas tangíveis que motivam produtores a utilizarem mais serviços do ecossistema e gerarem dados valiosos para sua operação.",
      bgColor: "bg-cyan-50"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Image
                src="/assets/svgs/works.svg"
                alt="How It Works Icon"
                width={280}
                height={260}
                className="w-32 h-30"
              />
            </div>
            
            <div>
              <h2 className="text-5xl font-bold text-[#061C3D]">
                Como o Agro Game funciona?
              </h2>
            </div>
          </div>

          <div className="lg:text-right">
            <p className="text-lg text-[#061C3D] max-w-md lg:ml-auto">
              Em poucos cliques, sua empresa 
              se conecta ao futuro do 
              agronegócio.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div 
              key={step.id}
              className={`${step.bgColor} rounded-3xl p-8 transition-transform hover:scale-105`}
            >
              <div className={`w-20 h-20 rounded-2xl flex justify-center mx-auto mb-6`}>
                <Image
                  src={step.icon}
                  alt={step.title}
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
              </div>

              <h3 className="text-xl font-semibold text-[#061C3D] mb-4">
                {step.title}
              </h3>

              <p className="text-[#061C3D] text-sm leading-relaxed mb-6">
                {step.description}
              </p>

              <Link
                href={`#step-${step.id}`}
                className="inline-flex items-center bg-white px-4 py-2 rounded-md text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors"
              >
                Learn More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}