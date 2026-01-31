import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Admin",
    items: [
      {
        url: "/admin/users",
        title: "Manage Users",
      },
      {
        url: "/admin/bookings",
        title: "All Bookings",
      },
      {
        url: "/admin/categories",
        title: "Manage Categories",
      },
    ],
  },
];
