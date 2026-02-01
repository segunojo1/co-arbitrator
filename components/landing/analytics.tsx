import Image from "next/image"

const Analytics = () => {
  return (
    <section>
        <h2 className="text-[14px]/[18px] text-[#2563EB]">ANALYTICS & REPORTING</h2>
        <p className="text-[54px]/[64px] -tracking-[1.2px] font-instrument-serif">Not Just Reports, Actionable AI Insights </p>
        <ul className="flex gap-8 items-center mt-6">
            <li className="flex items-center">
                <Image src="/assets/dashboard.svg" alt="dashboard" width={12} height={12} />
                <span className="ml-2 text-[13.9px]/[28px]">Interactive dashboards</span>
            </li>
            <li className="flex items-center">
                <Image src="/assets/report.svg" alt="report" width={12} height={12} />
                <span className="ml-2 text-[13.9px]/[28px]">Custom reports</span>
            </li>
            <li className="flex items-center">
                <Image src="/assets/insights.svg" alt="insights" width={12} height={12} />
                <span className="ml-2 text-[13.9px]/[28px]">Continuous Learning</span>
            </li>
            <li>
                <Image src="/assets/integration.svg" alt="integration" width={12} height={12} />
                <span className="ml-2 text-[13.9px]/[28px]">Privacy-First Architecture</span>
            </li>
        </ul>
    </section>
  )
}

export default Analytics