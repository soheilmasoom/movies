import { Theme } from "@emotion/react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
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
  const darkMode = JSON.parse(
    localStorage.getItem("theme") as string
  )?.darkMode;
  const [mode, setMode] = useState<Mode>(darkMode);

  const checkMode = (bool: boolean) => {
    setMode(bool ? "dark" : "light");
  };

  const initialValue = {
    theme: createTheme({
      palette: {
        mode: darkMode ? "dark" : "light",
      },
      components: {
        MuiCheckbox: {
          defaultProps: {
            disableRipple: true,
            size: "1.75rem",
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
