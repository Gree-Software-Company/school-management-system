import { ThemeProvider } from "./providers/theme-provider";

export default function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <h1>Hello, world!</h1>
      </ThemeProvider>
    </>
  );
}
