import App from "@/App";
import AboutUs from "@/pages/about-us/AboutUs";
import Contact from "@/pages/contact/Contact";
import Faq from "@/pages/faq/Faq";
import Features from "@/pages/features/Features";
import Home from "@/pages/home/Home";
import LoginPage from "@/pages/login/LoginPage";
import RegistrationPage from "@/pages/registration/RegistrationPage";
import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
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

    //   {
    //     Component: withAuth(UserLayout, role.user as TRole),
    //     path: "/user",
    //     children: [
    //       { index: true, element: <Navigate to="/user/dashboard" /> },
    //       ...generateRoutes(userSidebarMenus),
    //     ],
    //   },

    //   {
    //     Component: withAuth(AdminLayout, role.superAdmin as TRole),
    //     path: "/admin",
    //     children: [
    //       { index: true, element: <Navigate to="/admin/dashboard" /> },
    //       ...generateRoutes(adminSidebarMenus),
    //     ],
    //   },


]);