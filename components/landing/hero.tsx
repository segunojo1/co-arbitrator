import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="bg-[url(/assets/hero_bg.png)] relative bg-cover bg-center flex flex-col justify-center items-center px-10 pt-[255px] min-h-full h-full">
      <div className="font-instrument-serif text-center text-[58px]/[66.7px] font-normal -tracking-[3px] mb-[18px]">
        <h1>Co-Arbitrator</h1>
        <span className="flex items-center">
          Dispute Resolution Powered by
          <Image
            src="/assets/law_icon.png"
            alt="Hero Logo"
            width={55.15}
            height={55.15}
          />
          <h1>Intelligence</h1>
        </span>
      </div>

      <p className="text-[18px]/[28px] -tracking-[.5px] font-normal text-center mb-[40px]">Resolve dispute faster with AI-Assisted Arbitration.Transform dispute resolution with cutting-edge AI technology. Fast, fair, and transparent arbitration for the modern world. </p>

      <div className="flex gap-2 mb-8">
        <Button className="bg-black">Get Started</Button>
        <Button className="bg-white text-black">Request Demo</Button>
      </div>

      {/* <Image src="/assets/hero-img.png" alt="Hero Image" width={1095} height={710} className="absolute"/> */}
    </div>
  );
};

export default Hero;
