import DriverDashboard from "@/pages/driver/driver-dashboard/DriverDashboard";
import DriverProfile from "@/pages/driver/driver-profile/DriverProfile";
import IncomingRequests from "@/pages/driver/incoming-requests/IncomingRequests";
import RideHistory from "@/pages/driver/ride-history/RideHistory";
import type { ISidebarItem } from "@/types";

export const driverSidebarMenus: ISidebarItem[] = [
  {
    title: "Main",
    items: [
      {
        title: "Dashboard",
        url: "/driver/dashboard",
        component: DriverDashboard,
      },
      {
        title: "Incoming Requests",
        url: "/driver/incoming-requests",
        component: IncomingRequests,
      },
      {
        title: "Ride History",
        url: "/driver/ride-history",
        component: RideHistory,
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "Profile",
        url: "/driver/my-profile",
        component: DriverProfile,
      }
    ]
  },
];