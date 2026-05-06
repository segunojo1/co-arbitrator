"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const isWorkspaceRoute = pathname.startsWith("/workspace");
  const title = isWorkspaceRoute ? "Workspace" : "Dashboard";
  const icon = isWorkspaceRoute ? "/assets/workspace.svg" : "/assets/home.svg";

  return (
    <header className="border-b border-[#F2F4F7] w-full">
      <div className="flex items-center gap-2 px-6 py-5">
        <Image src={icon} alt="Section icon" width={20} height={20} />
        <h1 className="text-[15px]/[20px] font-semibold">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
