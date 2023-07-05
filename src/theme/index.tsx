import { deepOrange, amber } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ChildrenProps } from "../types";

const theme = createTheme({
  palette: {
    primary: {
      main: "#712B75",
    },
    secondary: {
      main: "#F2F0EB",
      dark: "#e8e2d3",
    },
    error: {
      main: amber[900],
      light: deepOrange[700],
    },
  },
  typography: {
    fontFamily: ["Rubik", "sans-serif"].join(","),
    h6: {
      "@media (max-width: 600px)": {
        fontSize: "1rem",
      },
      "@media (max-width: 375px)": {
        fontSize: "0.7rem",
      },
    },
    h3: {
      "@media (max-width: 600px)": {
        fontSize: "1.5rem",
      },
      "@media (max-width: 375px)": {
        fontSize: "1rem",
      },
    },
    h4: {
      "@media (max-width: 600px)": {
        fontSize: "1.125rem",
      },
      "@media (max-width: 375px)": {
        fontSize: "0.85rem",
      },
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            "@media (max-width: 600px)": {
              color: "#F2F0EB",
            },
            "@media (min-width: 600px)": {
              color: "#712B75",
            },
            position: "absolute",
            top: -7,
          },
        },
      },
    },
  },
});

export default function ThemeComponent({ children }: ChildrenProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
