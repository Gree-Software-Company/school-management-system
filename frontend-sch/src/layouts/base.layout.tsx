import { ModeToggle } from "@/components/theme/mode-toggle";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <main className="relative">
      <Outlet />

      {/* Theme toggle on bottom-right */}
      <div className="fixed bottom-4 right-4">
        <ModeToggle />
      </div>
    </main>
  );
}
