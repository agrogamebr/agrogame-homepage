import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#061C3D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="flex items-center">
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
          
          <div className="border-t border-white w-full pt-6">
            <p className="text-white text-sm">
              © 2025 Agrogame. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}