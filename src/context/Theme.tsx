import { Theme } from "@emotion/react";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { ReactNode, createContext, useState } from "react";

// Types
type Mode = string;
interface ThemeContext {
  theme: Theme;
  checkMode: (bool: boolean) => void;
}
interface Props {
  children: ReactNode;
}

// Context
export const DefaultTheme = createContext<ThemeContext>({
  theme: {},
  checkMode: () => {},
});

// Context Provider
export const ThemeProvide: React.FC<Props> = ({ children }) => {

  // DarkMode Management
  const darkMode = JSON.parse(
    localStorage.getItem("theme") as string
  )?.darkMode;
  const [mode, setMode] = useState<Mode>(darkMode);

  const checkMode = (bool: boolean) => {
    setMode(bool ? "dark" : "light");
  };

  // Initial Theme
  const initialValue = {
    theme: createTheme({
      palette: {
        mode: darkMode ? "dark" : "light",
        background: {
          default: darkMode ? '#121212' : '#b8bdb5',
          paper: darkMode ? '#1f1f1f' : '#e0e2db'
        }
      },
      components: {
        MuiCheckbox: {
          defaultProps: {
            disableRipple: true,
            size: "1.75rem",
          },
        },
        MuiCssBaseline: {
          styleOverrides: {
            
            // Scrollbar Customize
            html: {
              scrollBehavior: "smooth",
              "*::-webkit-scrollbar": {
                width: "0.75rem",
              },
              "*::-webkit-scrollbar-button": {
                display: "none",
              },
              "*::-webkit-scrollbar-thumb": {
                backgroundColor: darkMode ? "#434343" : "#8d8e90",
                height: "8px",
                borderRadius: "8px",
              },
              "*::-webkit-scrollbar-thumb:hover": {
                backgroundColor: darkMode ? "#8d8e90" : "#434343",
              },
              "*::-webkit-scrollbar-track": {
                boxShadow: darkMode
                  ? "inset 0 0 6px rgba(255,255,255,0.25)"
                  : "inset 0 0 6px rgba(0,0,0,0.25)",
                webkitBoxShadow: darkMode
                  ? "inset 0 0 6px rgba(255,255,255,0.25)"
                  : "inset 0 0 6px rgba(0,0,0,0.25)",
              },
            },
          },
        },
      },
    }),
    checkMode,
  };

  return (
    <DefaultTheme.Provider value={initialValue}>
      <ThemeProvider theme={initialValue.theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </DefaultTheme.Provider>
  );
};
