import { Route } from "@/types";

export const studentRoutes: Route[] = [
  {
    title: "Student",
    items: [
      {
        url: "/dashboard",
        title: "Dashboard",
      },
      {
        url: "/dashboard/bookings",
        title: "Booking history",
      },
      {
        url: "/dashboard/profile",
        title: "Edit Info",
      },
    ],
  },
];
