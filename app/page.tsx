import { About } from "@/app/_components/about";
import { Cta } from "@/app/_components/cta";
import { Faq } from "@/app/_components/faq";
import { Features } from "@/app/_components/features";
import { Footer } from "@/app/_components/footer";
import { Hero } from "@/app/_components/hero";
import { HowItWorks } from "@/app/_components/how-it-works";
import { Navbar } from "@/app/_components/navbar";
import { Showcase } from "@/app/_components/showcase";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Showcase />
      <About />
      <Faq />
      <Cta />
      <Footer />
    </div>
  );
}
