import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import { driverSidebarMenus } from "@/routes/driverSidebarMenus";
import Logo from '../../assets/rideup-logo.png';
import { IoMdLogOut } from "react-icons/io";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/features/hook";

const menuItems = {
  navMain: driverSidebarMenus,
};

export function DriverSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  return (
    <Sidebar {...props} className="fixed">
      <SidebarHeader>
        <Link
          to="/"
          aria-label="home"
          className="w-full max-w-32 py-2"
        >
          <img src={Logo} alt="RideUp" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {menuItems.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <button className='w-full flex items-center justify-center gap-1 text-sm font-semibold bg-gray-50 dark:bg-gray-800 text-gray-400 border border-gray-100 dark:border-gray-800 px-3 py-3 rounded-full duration-300 cursor-pointer' onClick={handleLogout}>Log Out <IoMdLogOut size={16} /></button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
