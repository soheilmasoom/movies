import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvide } from "./context/Theme.tsx";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvide>
      <App />
    </ThemeProvide>
  </React.StrictMode>
);
