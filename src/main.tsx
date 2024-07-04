import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvide } from "./context/Theme.tsx";
import { BrowserRouter } from "react-router-dom";

// Number Formatter
export function commaSeperate(number: number) {
  return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvide>
        <App />
      </ThemeProvide>
    </BrowserRouter>
  </React.StrictMode>
);
