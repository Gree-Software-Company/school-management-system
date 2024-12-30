import { Bot, GraduationCap, Settings2, SquareTerminal } from "lucide-react";

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
    // Administration
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
        {
          title: "Class",
          url: "/admin/class",
        },
      ],
    },
    // Academics
    {
      title: "Academics",
      url: "#",
      icon: GraduationCap,
      items: [
        {
          title: "Subjects",
          url: "/admin/subjects",
        },
        {
          title: "Exams",
          url: "/admin/exams",
        },
        {
          title: "Results",
          url: "/admin/results",
        },
        {
          title: "Attendance",
          url: "/admin/attendance",
        },
      ],
    },
    // Settings
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/admin/settings",
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
