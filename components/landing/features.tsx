import Image from "next/image";
import React from "react";
import { ClienteItem } from "./cliente";

const Features = () => {
  return (
    <section className="px-[100px]">
      <div className="space-y-[15px] flex flex-col items-start p-[150px] border-l-[#F0F0F0] border-r-[#F0F0F0] border ">
        <h2 className="text-[14px]/[18px] text-[#2563EB]">FEATURES</h2>
        <p className="text-[54px]/[64px] -tracking-[1.2px] font-instrument-serif max-w-[485px]">
          Command the AI Landscape Before Competitors Do
        </p>
        <p className="text-[18px]/[28px] text-[#666666]">
          Sophisticated AI tools designed to revolutionize arbitration. Our
          AI-powered platform combines cutting-edge technology with proven
          arbitration principles
        </p>
      </div>
      <div className="bg-[#FDFCFF] flex items-end justify-between border relative overflow-hidden">
        <div className="p-8">
          <p className="text-[21.8px]/[26.4px] -tracking-[.44px] font-medium">
            Smart Document Analysis
          </p>
          <p className="text-[16px]/[26px] -tracking-[.31px] text-[#666666] max-w-[299px]">
            AI-powered extraction of key clauses, obligations, and dispute
            points from complex legal documents.
          </p>
        </div>
        <div className="h-[511px]">
          <Image
            src="/assets/file-purple.png"
            alt="File"
            width={502}
            height={511}
            className="-bottom-20 right-20 absolute"
          />
        </div>
      </div>

      <div className="flex justify-center border bg-[#FDFCFF]">
        <div className="px-8 pb-[91px] max-w-[408px]">
          <Image
            src="/assets/collab.png"
            alt="collab"
            width={547}
            height={336}
            className=""
          />
          <div className="space-y-[11px]">
            <h3 className="text-[21.8px]/[26.4px] -tracking-[.44px] font-medium">
              Collaborative Platform
            </h3>
            <p className="text-[16px]/[26px] -tracking-[.31px] text-[#737373] max-w-[299px]">
              Seamless communication with real-time updates and secure document
              sharing.
            </p>
          </div>
        </div>
        <div className="px-8 pb-[91px] max-w-[408px] border-l border-r">
          <div className="w-[408px] h-[319px] flex items-center justify-center">
            <Image
              src="/assets/lightning.svg"
              alt="lightning speed"
              width={261}
              height={266}
              className=""
            />
          </div>
          <div className="space-y-[11px]">
            <h3 className="text-[21.8px]/[26.4px] -tracking-[.44px] font-medium">
              Lightning Fast Processing
            </h3>
            <p className="text-[16px]/[26px] -tracking-[.31px] text-[#737373] max-w-[299px]">
              Reduce arbitration timelines from months to weeks with legal
              research and analysis.
            </p>
          </div>
        </div>
        <div className="px-8 pb-[91px] max-w-[408px]">
          <Image
            src="/assets/collab.png"
            alt="collab"
            width={547}
            height={336}
            className=""
          />
          <div className="space-y-[11px]">
            <h3 className="text-[21.8px]/[26.4px] -tracking-[.44px] font-medium">
              Unbiased Resolution Engine
            </h3>
            <p className="text-[16px]/[26px] -tracking-[.31px] text-[#737373] max-w-[299px]">
              Advanced algorithms ensure fair, impartial recommendations based
              on legal precedents and case law.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-end h-[435px] relative overflow-hidden border bg-[#FDFCFF]">
        <div className="flex flex-col gap-3 pl-8 pb-[74px]">
          <h3 className="text-[21.8px]/[26.4px] -tracking-[.44px] font-medium">
            Global Compliance
          </h3>
          <p className="text-[16px]/[26px] -tracking-[.31px] text-[#737373] max-w-[299px]">
            Built-in support for UNCITRAL, ICC, AAA, and other international
            arbitration frameworks.
          </p>
        </div>

        <div className="grid grid-cols-4 border border-[#F0F0F0] absolute bg-white -right-[263px] -bottom-[94px]">
          <ClienteItem logo="/assets/lcia.svg" />
          <ClienteItem logo="/assets/gar.svg" w={116} h={20} />
          <ClienteItem logo="/assets/lcia.svg" />
          <ClienteItem logo="/assets/gar.svg" w={116} h={20} />
          <ClienteItem logo="/assets/lcia.svg" />
          <ClienteItem logo="/assets/gar.svg" w={116} h={20} />
          <ClienteItem logo="/assets/lcia.svg" />
          <ClienteItem logo="/assets/gar.svg" w={116} h={20} />
          <ClienteItem />
          <ClienteItem />
          <ClienteItem />
          <ClienteItem />
        </div>
      </div>
    </section>
  );
};

export default Features;
