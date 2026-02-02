import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const Dashboard = () => {
  return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <h1>Hello dashboard</h1>
            </SidebarInset>
        </SidebarProvider>
  )
}

export default Dashboard