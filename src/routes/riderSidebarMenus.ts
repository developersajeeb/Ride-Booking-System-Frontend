
import RiderDashboard from "@/pages/rider/rider-dashboard/RiderDashboard";
import type { ISidebarItem } from "@/types";


export const riderSidebarMenus: ISidebarItem[] = [
  {
    title: "Main",
    items: [
      {
        title: "Dashboard",
        url: "/rider/dashboard",
        component: RiderDashboard,
      },
    ],
  },
];