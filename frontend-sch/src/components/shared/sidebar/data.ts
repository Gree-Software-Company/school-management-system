import { Bot, Settings2, SquareTerminal } from "lucide-react";

export const data = {
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/admin",
        },
        // {
        //   title: "",
        //   url: "#",
        // },
        // {
        //   title: "Settings",
        //   url: "#",
        // },
      ],
    },
    {
      title: "Administration",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Users",
          url: "/admin/users",
        },
        {
          title: "Staff",
          url: "/admin/staff",
        },
        {
          title: "Students",
          url: "/admin/students",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/admin/settings",
        },
        {
          title: "Profile",
          url: "/admin/profile",
        },
        // {
        //   title: "Billing",
        //   url: "#",
        // },
        // {
        //   title: "Limits",
        //   url: "#",
        // },
      ],
    },
  ],
};