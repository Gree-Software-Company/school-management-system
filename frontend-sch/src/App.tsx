import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./providers/theme-provider";
import rootRoutes from "./routes/app.routes";
import { Toaster } from "./components/ui/toaster";

export default function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <RouterProvider router={rootRoutes} />
        <Toaster />
      </ThemeProvider>
    </>
  );
}
