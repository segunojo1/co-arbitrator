"use client";
import { FileText, Scale } from "lucide-react";
import Image from "next/image";
import SmartChat from "../_components/smartchat";
import { useEffect, useState } from "react";
import useAppStore from "@/store/app-store";
import FoundMatch from "../_components/foundmatch";

const SmartMatcher = () => {
  const [started, setStarted] = useState(false);
  const followIndex = useAppStore((s) => s.followIndex);
  useEffect(() => {
    console.log(followIndex);
  }, [followIndex]);

    const [arbitratorResponse, setArbitratorResponse] = useState("");

  return (
    <div className="min-h-screen w-full flex flex-row font-sans bg-white">
      <div className="flex-1 flex flex-row">
        <div className="w-20 border-r border-transparent flex flex-col items-center py-8 gap-8">
          <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
            <Scale size={20} />
          </div>
        </div>

        <div className="flex-1 px-12 py-24 flex flex-col relative">
          <div className="max-w-2xl flex flex-col justify-between h-full mt-10">
            {followIndex == null || followIndex < 4 ? (
              <div className="">
                <h1 className="font-instrument-serif text-[58px]/[66px] font-normal -tracking-[3px] mb-4">
                  Smart Matcher for
                  <span className="inline-flex items-center mx-3 align-middle">
                    <Image
                      src="/assets/law_icon.png"
                      alt="Hero Logo"
                      width={55.15}
                      height={55.15}
                    />
                  </span>
                  Parties
                </h1>

                <p className="text-[#00000099] font-inter text-[18px]/[28px] -tracking-[.5px] max-w-lg mb-20">
                  Resolve dispute faster with AI-Assisted Arbitration. Transform
                  dispute resolution with cutting-edge AI technology. Fast,
                  fair, and transparent arbitration for the modern world.
                </p>

                {followIndex !== null && (
                  <ul className="flex flex-col">
                    <li className="flex gap-[7px]">
                      <Image
                        src="/assets/ai.svg"
                        alt="ai"
                        width={32}
                        height={32}
                      />
                      <p className="font-bold text-[20px]/[35px] -tracking-[.5px]">
                        Collating Responses (Data)
                      </p>
                    </li>
                    <li className="flex gap-[7px]">
                      <p className="ml-[39px] font-bold text-[20px]/[35px] -tracking-[.5px] text-[#9E9E9E]">
                        Smart Matching
                      </p>
                    </li>
                    <li className="flex gap-[7px]">
                      <p className="ml-[39px] font-bold text-[20px]/[35px] -tracking-[.5px] text-[#9E9E9E]">
                        Verifying
                      </p>
                    </li>
                    <li className="flex gap-[7px]">
                      <p className="ml-[39px] font-bold text-[20px]/[35px] -tracking-[.5px] text-[#9E9E9E]">
                        Synthesising
                      </p>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
                <>
                </>
            )}
            {followIndex == 4 && <FoundMatch response={arbitratorResponse} />}

            {followIndex == null && (
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">
                  Smart Matcher Playbook
                </h3>

                <div className="w-32 h-32 bg-gray-50 rounded-2xl flex flex-col items-center justify-center border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
                  <FileText className="text-gray-400 mb-2" size={24} />
                  <span className="text-xs text-gray-400 font-medium">
                    20 MB
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-[40%] bg-[#020618] relative overflow-hidden flex flex-col justify-end px-16 py-3">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#E12AFB4D] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 ">
          <h2 className="font-instrument-serif text-[48px]/[66px] -tracking-[1.5px] text-white flex items-center gap-3">
            Hello there <span className="text-4xl">👋🏽</span>
          </h2>

          <p className="text-gray-400 text-[18px]/[28px] -tracking-[.5px] font-light mb-8">
            Can I meet you here yada, yada
          </p>

          {!started ? (
            <button
              onClick={() => setStarted(true)}
              className="bg-white text-[#020618] cursor-pointer mb-[82px] hover:bg-gray-300 px-5 py-[10px] rounded-lg text-[14px]/[20px] font-medium hover:bg-gray-100 transition-colors"
            >
              Get Started
            </button>
          ) : (
            <SmartChat />
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartMatcher;
