import { Link, Outlet } from "react-router";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { DriverSidebar } from "../shared/DriverSidebar";
import { Separator } from "../ui/separator";
import { ModeToggle } from "../shared/ModeToggler";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { FaRegUser } from "react-icons/fa";

const RiderLayout = () => {
  const { data } = useUserInfoQuery(undefined);

  return (
    <SidebarProvider>
      <DriverSidebar />
      <SidebarInset>
        <header className="h-16 flex items-center shrink-0 justify-between gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>

          <div className="flex gap-3">
            {data?.data?.email && (
              <Link to="/driver/my-profile" className="w-9 h-9 flex items-center justify-center bg-gray-50 dark:bg-[#1b1b1d] bg border rounded-md"><FaRegUser /></Link>
            )}
            <ModeToggle />
          </div>
        </header>

        <main className="px-5 py-5 bg-[#F1F5FF] dark:bg-black min-h-full">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default RiderLayout;