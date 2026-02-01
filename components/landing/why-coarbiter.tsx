import Link from "next/link"

const WhyCoArbiter = () => {
  return (
    <section className="bg-[url(/assets/why-arbiter.png)] bg-[#000000D1] bg-blend-color bg-cover bg-center min-h-screen flex flex-col text-white justify-center items-center ">
        <h2 className="text-[14.1px]/[18px] mb-[14px]">WHY CO-ARBITRATOR</h2>
        <p className="text-[40px]/[64px] font-instrument-serif mb-[19px] max-w-[1060px] text-center">According to the 2025 International Arbitration Survey, over 90% of arbitration practitioners anticipate using AI for legal research, document review, and case management within the next five years</p>
        <p className="text-[14.1px]/[18px] text-[#FFFFFF9C]">SOURCE: <Link href="https://www.whitecase.com/insight-our-thinking/2025-international-arbitration-survey-arbitration-and-ai">WhiteCase 2025 International Arbitration Survey</Link></p>
    </section>
  )
}

export default WhyCoArbiter