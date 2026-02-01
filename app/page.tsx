import Analytics from "@/components/landing/analytics";
import Cliente from "@/components/landing/cliente";
import FAQ from "@/components/landing/FAQ";
import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";
import WhyCoArbiter from "@/components/landing/why-coarbiter";
import Navbar from "@/components/ui/navbar";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <Cliente />
      <WhyCoArbiter />
      <Features />
      <Analytics />
      <FAQ />
    </div>
  );
}
