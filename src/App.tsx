import { useState, useEffect, CSSProperties } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import { deepOrange, amber } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@material-ui/core/Container";

import { MainPage, Page404 } from "./pages";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  backgroundColor: "#712B75",
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#712B75",
    },
    secondary: {
      main: "#F2F0EB",
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
        shrink: {
          "@media (max-width: 600px)": {
            color: "#F2F0EB !important",
          },
          "@media (min-width: 600px)": {
            fontSize: "#712B75 !important",
          },
          position: "absolute",
          top: -7,
        },
      },
    },
  },
});

function App() {
  const [starterPageLoading, setStarterPageLoading] = useState<boolean>(true);

  const loader: JSX.Element = (
    <CircleLoader
      color="white"
      cssOverride={override}
      size={"100vh"}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );

  useEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setStarterPageLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container component="main" maxWidth="lg" disableGutters={true}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Container>
  );
}

export default App;
