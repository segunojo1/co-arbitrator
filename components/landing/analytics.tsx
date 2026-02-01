import Image from "next/image"

const Analytics = () => {
  return (
    <section className="flex flex-col mt-20 items-center">
        <h2 className="text-[14px]/[18px] text-[#2563EB] mb-[15px]">ANALYTICS & REPORTING</h2>
        <p className="text-[54px]/[64px] -tracking-[1.2px] font-instrument-serif mb-[24px]">Not Just Reports, Actionable AI Insights </p>
        <ul className="flex gap-8 items-center mt-6 mb-12">
            <li className="flex items-center">
                <Image src="/assets/dashboard.svg" alt="dashboard" width={12} height={12} />
                <span className="ml-2 text-[13.9px]/[28px]">Interactive dashboards</span>
            </li>
            <li className="flex items-center">
                <Image src="/assets/reports.svg" alt="report" width={12} height={12} />
                <span className="ml-2 text-[13.9px]/[28px]">Custom reports</span>
            </li>
            <li className="flex items-center">
                <Image src="/assets/learning.svg" alt="learning" width={12} height={12} />
                <span className="ml-2 text-[13.9px]/[28px]">Continuous Learning</span>
            </li>
            <li className="flex items-center">
                <Image src="/assets/architecture.svg" alt="integration" width={12} height={12} />
                <span className="ml-2 text-[13.9px]/[28px]">Privacy-First Architecture</span>
            </li>
        </ul>

        <Image src="/assets/analytics.svg" alt="analytics image" width={903} height={495} />
    </section>
  )
}

export default Analytics