import Image from "next/image";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className="flex flex-col  items-center mt-[138px]">
      <div className=" flex flex-col items-center bg-blend-color relative w-full pt-[136px] 
               text-white">
                 <Image 
                 width={1000}
                 height={700}
    src="/assets/footer-bg.svg" 
    className="absolute inset-0 w-full h-full object-cover"
    alt="Footer Background"
  />

  <div className="absolute inset-0 
                  bg-gradient-to-b from-[#000000] via-black/50 to-[#000000]">
  </div>
        <h2 className="text-[72px]/[79px] max-w-[665px] relative z-10 -tracking-[2.88px] mb-[23px] font-instrument-serif">
          Start your journey toward a seamless Arbitration Process
        </h2>
        <div className="flex gap-2 mb-8 relative z-10">
          <Button className="bg-black">Get Started</Button>
          <Button className="bg-white text-black">Request Demo</Button>
        </div>
        <div className="mt-[142px] flex items-center gap-6">
            <Image src="/assets/lkdn.svg" alt="in" width={32.5} height={32.5} />
            <Image src="/assets/ig.svg" alt="ig" width={32.5} height={32.5} />
            <Image src="/assets/x.svg" alt="x" width={32.5} height={32.5} />
        </div>
      </div>

      <div className="flex items-center justify-between text-white bg-black pt-10 px-10 w-full pb-[112px]">
        <div className="flex flex-col gap-[8.5px]">
            <h3 className="text-[14px]/[21px] -tracking-[.5px] font-instrument-sans">Have a question? Email us at</h3>
            <p className=" text-[24px]/[26.4px] font-instrument-serif -tracking-[.96px]">Info@useco-arb.com</p>
        </div>
        <ul className="flex items-center text-[14px]/[20px] gap-10 ">
            <li>Home</li>
            <li>Feature</li>
            <li>Contact</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
