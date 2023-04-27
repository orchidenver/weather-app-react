import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThemeComponent from "./theme";
import Container from "@material-ui/core/Container";

import { MainPage, Page404 } from "./pages";

function App() {
  return (
    <Container component="main" maxWidth="lg" disableGutters={true}>
      <ThemeComponent>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Router>
      </ThemeComponent>
    </Container>
  );
}

export default App;
