import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/shared/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavbar from "@/components/shared/navbar/dashboard-navbar";
export default function AdminLayout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DashboardNavbar />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
