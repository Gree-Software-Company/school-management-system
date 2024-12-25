import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/providers/theme-provider";

export default function Appearance() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="max-w-3xl space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Appearance</h1>
        <p className="text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-medium">Theme</h2>
        <p className="text-sm text-muted-foreground">
          Select the theme for the dashboard.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Card
            className={`cursor-pointer border-2 ${
              theme === "light" ? "border-primary" : "border-transparent"
            }`}
            onClick={() => setTheme("light")}
          >
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="bg-gray-100 h-2 w-[80%] rounded" />
                <div className="bg-gray-100 h-2 w-[60%] rounded" />
                <div className="bg-gray-100 h-2 w-[70%] rounded" />
              </div>
            </CardContent>
            <div className="border-t p-4 text-center font-medium">Light</div>
          </Card>
          <Card
            className={`cursor-pointer border-2 bg-slate-950 ${
              theme === "dark" ? "border-primary" : "border-transparent"
            }`}
            onClick={() => setTheme("dark")}
          >
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="bg-slate-800 h-2 w-[80%] rounded" />
                <div className="bg-slate-800 h-2 w-[60%] rounded" />
                <div className="bg-slate-800 h-2 w-[70%] rounded" />
              </div>
            </CardContent>
            <div className="border-t border-slate-800 p-4 text-center font-medium text-white">
              Dark
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
