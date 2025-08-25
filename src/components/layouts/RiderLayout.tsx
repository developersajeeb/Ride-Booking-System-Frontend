import { Outlet } from "react-router";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { RiderSidebar } from "../shared/RiderSidebar";
import { Separator } from "../ui/separator";
import { ModeToggle } from "../shared/ModeToggler";

const RiderLayout = () => {
  return (
    <SidebarProvider>
      <RiderSidebar />
      <SidebarInset>
        <header className="h-16 flex items-center shrink-0 justify-between gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>

          <ModeToggle />
        </header>

        <main className="px-5 py-5 bg-[#F1F5FF] dark:bg-black min-h-full">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default RiderLayout;
