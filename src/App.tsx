import { useState } from "react";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import { FilterDataProvider } from "./context/MoviesData";
import { CheckParamsProvider } from "./context/CheckParams";
import "./main.css";

// Components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Info from "./pages/Info";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import ErrorPage from "./pages/ErrorPage";

// HTTP Req Configuration
export const moviesAPI = axios.create({
  baseURL: "https://api.themoviedb.org",
  params: {
    api_key: "78ab21f3a9e954c04f73cb439d32a5a8",
  },
  headers: {
    Authorization:
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OGFiMjFmM2E5ZTk1NGMwNGY3M2NiNDM5ZDMyYTVhOCIsInN1YiI6IjY2NWRkNzI3MzdlNmYzNjhkYzc5OTNmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.47csLb-ojIZN_riaBfO2f45rNP_XGhqEIn9PWbg9VFg",
  },
  // timeout: 5000,
});
const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [isNavScrolled, setIsNavScrolled] = useState<boolean>(false);

  // Nav Scroll Check
  document.addEventListener("scroll", () => {
    if (window.pageYOffset > 60) {
      setIsNavScrolled(true);
    } else {
      setIsNavScrolled(false);
    }
  });

  return (
    <QueryClientProvider client={client}>
      <FilterDataProvider>
        <CheckParamsProvider>
          <Navbar isNavScrolled={isNavScrolled} />
          <Container
            component={"main"}
            maxWidth={"xxl"}
            sx={{ marginTop: "1rem" }}
          >
            <Routes>
              <Route
                path="/"
                element={<Home isNavScrolled={isNavScrolled} />}
              />
              <Route
                path="/movies"
                element={<Movies isNavScrolled={isNavScrolled} />}
              />
              <Route
                path="/movies/:id"
                element={<Info isNavScrolled={isNavScrolled} />}
              />
              <Route
                path="/signup"
                element={<SignUp />}
              />
              <Route
                path="/login"
                element={<LogIn />}
              />
              <Route
                path="/not-found"
                element={<ErrorPage error="404 Error: Page Not Found" />}
              />
              <Route path="*" element={<Navigate to="/not-found" />} />
            </Routes>
          </Container>
        </CheckParamsProvider>
      </FilterDataProvider>
    </QueryClientProvider>
  );
}

export default App;
