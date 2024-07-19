import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvide } from "./context/Theme.tsx";
import { BrowserRouter } from "react-router-dom";
import { CheckAccountProvider } from "./context/CheckAccount.tsx";

// Number Formatter
export function commaSeperate(number: number) {
  return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvide>
        <CheckAccountProvider>
          <App />
        </CheckAccountProvider>
      </ThemeProvide>
    </BrowserRouter>
  </React.StrictMode>
);
