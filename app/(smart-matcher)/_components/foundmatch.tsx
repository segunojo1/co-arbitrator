import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

const FoundMatch = () => {
  return (
    <div className="flex flex-col space-y-[43px] gap-[43px]">
        <div className="p-[23px] rounded-[28px]">
            <div className="w-[150px] h-[150px] rounded-[28px] bg-[#D9D9D9]" />

            <div>
                <h1 className="text-[32px]/[54px] -tracking-[.5px] font-instrument-serif">Sunita Shekhawat&apos;s</h1>
                <p className="text-[14px]/[25px] font-medium text-[#0A0A0AB2] -tracking-[.7px]">Arbitrator</p>
                <h2 className="text-[#0A0A0AB2] text-[15px]/[25px] font-bold -tracking-[.7px] py-2">Institution</h2>

                <ul className="text-[11px]/[25px] -tracking-[.7px] font-normal">
                    <li>London Court of International Arbitration</li>
                    <li>Singapore Institution</li>
                </ul>
            </div>

            <Button className="text-[14px]/[20px] font-medium -tracking-[.5px]">
                Download Profile
            </Button>
        </div>

        <div className="bg-[#8E51FF33] rounded-[16px] p-5 max-w-[670px] flex items-start gap-2 rounded-[16px]">
            <Image src="/assets/ai.svg" alt="ai" width={20} height={20} />
            <p className="text-[18px]/[28px] font-semibold"><span className="">AI Insights</span> Resolve dispute faster with AI-Assisted Arbitration.Transform dispute resolution with cutting-edge AI technology. Fast, fair, and transparent arbitration for the modern world. Resolve dispute faster with AI-Assisted Arbitration.Transform dispute resolution with cutting-edge AI technology. Fast, fair, and transparent arbitration for the modern world. </p>
        </div>

        <div className="flex items-center gap-2 text-[18px]/[28px] font-bold">
            <p>Other Smart Recommendations</p>
            <ChevronDown />
        </div>
    </div>
  )
}

export default FoundMatch