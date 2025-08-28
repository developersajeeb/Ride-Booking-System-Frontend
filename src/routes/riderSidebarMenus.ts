import RideHistory from "@/pages/rider/ride-history/RideHistory";
import RideRequest from "@/pages/rider/ride-request/RideRequest";
import RiderDashboard from "@/pages/rider/rider-dashboard/RiderDashboard";
import RiderProfile from "@/pages/rider/rider-profile/RiderProfile";
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
      {
        title: "Ride Request",
        url: "/rider/ride-request",
        component: RideRequest,
      },
      {
        title: "Ride History",
        url: "/rider/ride-history",
        component: RideHistory,
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "Profile",
        url: "/rider/my-profile",
        component: RiderProfile,
      }
    ]
  },
];