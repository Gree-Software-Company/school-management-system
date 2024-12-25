import { Outlet } from "react-router-dom";
import { AppWindow, Settings, User } from "lucide-react";
import { SettingsSidebar } from "../../components/sidebar/settings-sidebar";

const settingsPages = [
  {
    title: "Overview",
    href: "/admin/settings",
    icon: Settings,
  },
  {
    title: "Profile",
    href: "/admin/settings/profile",
    icon: User,
  },
  {
    title: "Appearance",
    href: "/admin/settings/appearance",
    icon: AppWindow,
  },
];

export default function SettingsLayout() {
  return (
    <div className="flex h-screen">
      <SettingsSidebar items={settingsPages} />
      <main className="flex-1 overflow-y-auto">
        <div className="container max-w-6xl p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
