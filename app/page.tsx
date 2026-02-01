import Cliente from "@/components/landing/cliente";
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
    </div>
  );
}
