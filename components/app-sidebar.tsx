"use client";

import * as React from "react";
import {
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send
} from "lucide-react";
import Home from "@/public/assets/home.svg";
import Workspace from "@/public/assets/workspace.svg";
import Settings from "@/public/assets/settings.svg";
import Recordings from "@/public/assets/recordings.svg";


import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: Home,
      isActive: true,
    },
    {
      title: "Workspace",
      url: "/workspace",
      icon: Workspace
    },
    {
      title: "Recordings",
      url: "#",
      icon: Recordings
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings
    },
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Image src="/assets/logo.png" alt="Logo" width={135} height={26} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
