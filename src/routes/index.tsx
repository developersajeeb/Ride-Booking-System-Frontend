import App from "@/App";
import RiderLayout from "@/components/layouts/RiderLayout";
import AboutUs from "@/pages/about-us/AboutUs";
import Contact from "@/pages/contact/Contact";
import Faq from "@/pages/faq/Faq";
import Features from "@/pages/features/Features";
import Home from "@/pages/home/Home";
import LoginPage from "@/pages/login/LoginPage";
import RegistrationPage from "@/pages/registration/RegistrationPage";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { riderSidebarMenus } from "./riderSidebarMenus";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import NoteFound from "@/pages/not-found/NoteFound";


export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            { path: "*", element: <NoteFound /> },
            {
                index: true,
                Component: Home,
            },
            {
                Component: AboutUs,
                path: "about-us",
            },
            {
                Component: Features,
                path: "features",
            },
            {
                Component: Contact,
                path: "contact",
            },
            {
                Component: Faq,
                path: "faq",
            },
            {
                Component: LoginPage,
                path: "login"
            },
            {
                Component: RegistrationPage,
                path: "registration"
            }
            //   {
            //     Component: withAuth(Booking),
            //     path: "booking/:slug",
            //   },
        ],
    },

      {
        Component: withAuth(RiderLayout, role.rider as TRole),
        path: "/rider",
        children: [
          { path: "*", element: <NoteFound /> },
          { index: true, element: <Navigate to="/rider/dashboard" /> },
          ...generateRoutes(riderSidebarMenus),
        ],
      },

    //   {
    //     Component: withAuth(AdminLayout, role.superAdmin as TRole),
    //     path: "/admin",
    //     children: [
    //       { index: true, element: <Navigate to="/admin/dashboard" /> },
    //       ...generateRoutes(adminSidebarMenus),
    //     ],
    //   },


]);