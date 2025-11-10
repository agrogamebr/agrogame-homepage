import FeatureCard from "@/components/common/feature-card";

export default function ForProducers() {
  const benefits = [
    {
      id: 1,
      title: "Baixe o app gratuito:",
      bgColor: "bg-blue-50",
      description: "Disponível para Android e iOS, cadastre-se usando o código da empresa parceira que trabalha com você."
    },
    {
      id: 2,
      title: "Ganhe pontos por engajamento:",
      bgColor: "bg-fuchsia-50",
      description: "Participe de treinamentos, compre insumos, utilize serviços do ecossistema e acumule pontos automaticamente."
    },
    {
      id: 3,
      title: "Resgate benefícios exclusivos:",
      bgColor: "bg-gray-100",
      description: "Troque pontos por descontos em produtos agrícolas, serviços especializados, seguros com condições diferenciadas e muito mais."
    },
    {
      id: 4,
      title: "Acompanhe seu progresso:",
      bgColor: "bg-emerald-50",
      description: "Visualize seu saldo de pontos, histórico de resgates e descubra novas oportunidades de benefícios através do app."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-bold text-[28px] sm:text-[36px] md:text-[48px] lg:text-[56px] 
                        leading-tight tracking-[-0.02em] text-blue-950 mb-6 max-w-4xl mx-auto">
            Produtor, seu trabalho no campo vale mais do que você imagina
          </h2>
          
          <p className="font-normal text-[20px] sm:text-[18px] md:text-[20px]
                       leading-relaxed text-blue-950 max-w-2xl mx-auto">
            Com o app Agrogame, cada interação com sua empresa parceira gera pontos que você transforma em benefícios reais para sua propriedade e família.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit) => (
            <FeatureCard
              key={benefit.id}
              title={benefit.title}
              description={benefit.description}
              icon="/assets/svgs/benefits.svg"
              backgroundColor={benefit.bgColor}
              iconSize="lg"
              layout="horizontal"
              className="h-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}