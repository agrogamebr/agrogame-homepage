import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ForCompanies from "@/components/ForCompanies";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <HowItWorks />
      <ForCompanies />
      <Footer />
    </div>
  );
}
