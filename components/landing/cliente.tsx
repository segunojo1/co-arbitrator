import Image from "next/image";
import React from "react";

const Cliente = () => {
  return (
    <section
      className="bg-white"
      style={{ paddingTop: "clamp(200px, 64.87vw, 410px)" }}
    >
      <div className="border-t border-[#F0F0F0] flex items-center flex-col">
        <div className="p-10 text-center">
          <h2 className="text-[14.1px]/[18px] font-normal text-[#2563EB] mb-2">
            OUR CLIENTLE
          </h2>
          <h2 className="text-[46px]/[60px] font-normal font-instrument-serif">
            Built for Excellent Institutions
          </h2>
        </div>
        <div className="grid grid-cols-4 border border-[#F0F0F0]">
            <ClienteItem logo="/assets/lcia.svg"/>
            <ClienteItem logo="/assets/gar.svg" w={116} h={20}/>
            <ClienteItem logo="/assets/lcia.svg"/>
            <ClienteItem logo="/assets/gar.svg" w={116} h={20}/>
            <ClienteItem logo="/assets/lcia.svg"/>
            <ClienteItem logo="/assets/gar.svg" w={116} h={20}/>
            <ClienteItem logo="/assets/lcia.svg"/>
            <ClienteItem logo="/assets/gar.svg" w={116} h={20}/>
            <ClienteItem />
            <ClienteItem />
            <ClienteItem />
            <ClienteItem />
        </div>
      </div>
    </section>
  );
};

export default Cliente;


export const ClienteItem = ({logo, w, h}: {logo?: string, w?: number, h?: number}) => {
  return (
    <div className="p-[60px] flex items-center justify-center border-r border-b border-[#F0F0F0] last:border-r-0">
        {logo && <Image src={logo} alt="Cliente Logo" width={w || 87} height={h || 46} />}
    </div>
  )
}

