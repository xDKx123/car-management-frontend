// Light mode theme
import { createTheme, CssBaseline, Theme, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";

const lightTheme: Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
    text: {
      primary: "#000",
      secondary: "#000",
    },
  },
});

interface LightThemeComponentProps {
  children: ReactNode;
}

const LightThemeComponent = ({ children }: LightThemeComponentProps) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default LightThemeComponent;
