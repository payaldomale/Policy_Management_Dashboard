import { ThemeProvider } from "@material-tailwind/react";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
