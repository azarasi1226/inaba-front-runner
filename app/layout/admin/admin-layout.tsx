import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "./sidebar"
import { Outlet } from "react-router";

export default function AdminLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <Outlet />
            </main>
        </SidebarProvider>
    )
}