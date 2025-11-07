import Link from "next/link";
import Image from "next/image";
import { SiFacebook, SiLinkedin, SiX, SiInstagram } from "react-icons/si";

export default function Footer() {
  const footerSections = {
    soluções: [
      { name: "Para Empresas", href: "#empresas" },
      { name: "Para Produtores Rurais", href: "#produtores" },
      { name: "Benefícios e Diferenciais", href: "#beneficios" },
      { name: "Como Funciona", href: "#como-funciona" },
      { name: "Rede de Parceiros", href: "#parceiros" },
      { name: "Seja um Parceiro", href: "#seja-parceiro" }
    ],
    suporte: [
      { name: "Central de Ajuda", href: "#ajuda" },
      { name: "Perguntas Frequentes (FAQ)", href: "#faq" },
      { name: "Fale Conosco", href: "#contato" },
      { name: "Tutoriais", href: "#tutoriais" },
      { name: "Blog", href: "#blog" },
      { name: "Status do Sistema", href: "#status" }
    ],
    baixeOApp: [
      { name: "Figma", href: "#figma" },
      { name: "Adobe", href: "#adobe" },
      { name: "Dribbble", href: "#dribbble" },
      { name: "Behance", href: "#behance" },
      { name: "Themeforest", href: "#themeforest" }
    ]
  };

  const socialLinks = [
    { name: "Facebook", icon: "facebook", href: "#facebook" },
    { name: "LinkedIn", icon: "linkedin", href: "#linkedin" },
    { name: "X", icon: "x", href: "#x" },
    { name: "Instagram", icon: "instagram", href: "#instagram" }
  ];

  return (
    <footer className="bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
          <div className="sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2">
            <div className="flex items-center mb-6">
              <Link href="/" className="flex items-center rounded-xl overflow-hidden">
                <Image
                  src="/assets/svgs/whiteLogo.svg"
                  alt="AgroGame Logo"
                  width={252}
                  height={49}
                  priority
                  className="w-[252px] h-[49px]"
                />
              </Link>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              O ecossistema de benefícios de sucesso do agro
            </p>
          </div>

          <div className="sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              SOLUÇÕES
            </h3>
            <ul className="space-y-3">
              {footerSections.soluções.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 text-sm hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              SUPORTE
            </h3>
            <ul className="space-y-3">
              {footerSections.suporte.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 text-sm hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              BAIXE O APP
            </h3>
            <ul className="space-y-3">
              {footerSections.baixeOApp.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 text-sm hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 flex justify-start md:justify-center lg:justify-end">
            <div className="flex flex-col space-y-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-8 h-8 bg-gray-600 rounded-sm flex items-center justify-center hover:bg-blue-500 transition-colors duration-200"
                >
                  {social.icon === 'facebook' && <SiFacebook className="w-4 h-4" />}
                  {social.icon === 'linkedin' && <SiLinkedin className="w-4 h-4" />}
                  {social.icon === 'x' && <SiX className="w-4 h-4" />}
                  {social.icon === 'instagram' && <SiInstagram className="w-4 h-4" />}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-12 pt-6">
          <p className="text-gray-400 text-sm text-center">
            © 2025 Agrogame. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}