import Header from "@/components/section/Header";
import Hero from "@/components/section/Hero";
import HowItWorks from "@/components/section/HowItWorks";
import ForCompanies from "@/components/section/ForCompanies";
import ForProducers from "@/components/section/ForProducers";
import Benefits from "@/components/section/Benefits";
import DownloadApp from "@/components/section/DownloadApp";
import SignupSection from "@/components/section/Signup";
import Footer from "@/components/section/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <section id="home">
        <Hero />
      </section>
      <section id="howitworks">
        <HowItWorks />
      </section>
      <section id="companies">
        <ForCompanies />
      </section>
      <section id="producers">
        <ForProducers />
      </section>
      <section id="benefits">
        <Benefits />
      </section>
      {/* <DownloadApp /> */}
      <section id="signup">
        <SignupSection />
      </section>
      <Footer />
    </div>
  );
}
