import { ReactNode, createContext, useState } from "react";
import { Theme } from "@emotion/react";
import {
  CssBaseline,
  PaletteOptions,
  ThemeProvider,
  createTheme,
  ZIndex,
} from "@mui/material";
import GupterFont from "../assets/fonts/Gupter-Regular.ttf"

// Types
type Mode = "dark" | "light";
interface CustomePalette extends PaletteOptions {
  mode: Mode;
  background: {
    default: string;
    paper: string;
  };
}
export interface CustomTheme extends Theme {
  palette: CustomePalette;
  divider: string;
  shadows: string[];
  grey: Record<number, string>;
  text: Record<string, string>;
  zIndex: ZIndex;
}
export interface ThemeContext {
  theme: CustomTheme | {};
  checkMode: (bool: boolean) => void;
}
interface Props {
  children: ReactNode;
}
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}

// Global Css Variables
export const themeBorder = ["1px solid black", "2.5px solid black"]
export const themeRadius = ["0.5rem", "1rem", "1.5rem", "2rem","2.5rem"]
export const themeGradient = {
  back: {
    light: "linear-gradient(30deg, rgba(255,255,255,1) 60%, rgba(220,237,255,1) 100%)",
    dark: "linear-gradient(30deg, rgba(26,27,31,1) 60%, rgba(22,41,63,1) 100%)"
  },
  banner: {
    light: "linear-gradient(to top , rgba(255,255,255) 15%, rgba(255,255,255,0))",
    dark: "linear-gradient(to top , rgba(26, 27, 31, 1) 15%, rgba(26, 27, 31, 0))",
  },
  title: {
    light: "radial-gradient(circle, rgba(26,27,31,1) 0%, rgba(98,105,114,1) 65%, rgba(220,237,255,1) 100%)",
    dark: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(87,101,117,1) 72%, rgba(22,41,63,1) 100%)",
  }
}
export const themeShadows = [
  "-6px 8px 10px rgba(0,0,0,0.1)",
  "inset -5px -8px 8px rgba(0,0,0,0.1)",
  "inset 0 0 6px rgba(65,65,65,0.25)",
  "inset 0 0 6px rgba(0,0,0,0.25)",
  "inset -4px 6px 10px rgba(0,0,0,0.1), -8px 12px 6px rgba(0,0,0,0.1)",
]
export const themeTransition = (animation: string, timing: string = "linear") => {
  return `${animation} 0.2s ${timing}`
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
  const [_, setMode] = useState<Mode>(darkMode);

  const checkMode = (bool: boolean) => {
    setMode(bool ? "dark" : "light");
  };

  // DarkMode Palette
  const darkModePalette: CustomePalette = {
    mode: "dark",
    background: {
      default: "#1a1b1f",
      paper: "#21242a",
    },
    primary: {
      light: "#16293f",
      main: "#0080ff",
    },
    secondary: {
      main: "#1a1b1f",      // Navbar Background
      dark: "#757575",      // Navbar Buttons
    },
  };

  // LightMode Palette
  const lightModePalette: CustomePalette = {
    mode: "light",
    background: {
      default: "#fff",
      paper: "#f0f3fc",
    },
    primary: {
      light: "#dcedff",
      main: "#0080ff",
    },
    secondary: {
      main: "#e9eefa",          // Navbar Background
      dark: "#424242",          // Navbar Buttons
    },
  };

  // Initial Theme
  const initialValue: ThemeContext = {
    theme: createTheme({
      breakpoints: {
        keys: ["xs", "sm", "md", "lg", "xl", "xxl"],
        values: { xs: 0, sm: 480, md: 768, lg: 992, xl: 1280, xxl: 1530 },
      },
      typography: {
        fontFamily: "'Gupter', 'sans-serif'"
      },
      palette: darkMode ? { ...darkModePalette } : { ...lightModePalette },
      components: {
        MuiCheckbox: {
          defaultProps: {
            disableRipple: true,
            size: "large",
          },
        },
        MuiCssBaseline: {
          styleOverrides: {
            "@global": {
              "@font-face": {
                fontFamily: "Gupter",
                src: `url("${GupterFont}")`
              },
            },
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
