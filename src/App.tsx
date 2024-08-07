import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import { FilterDataProvider } from "./context/MoviesData";
import { CheckParamsProvider } from "./context/CheckParams";
import { ListProvider } from "./context/List";
import "./main.css";

// Components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Info from "./pages/Info";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import ErrorPage from "./pages/ErrorPage";
import { Gradient } from "./components/MuiCustoms";

// HTTP Req Configuration
export const moviesAPI = axios.create({
  baseURL: "https://api.themoviedb.org",
  params: {
    api_key: "78ab21f3a9e954c04f73cb439d32a5a8",
  },
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OGFiMjFmM2E5ZTk1NGMwNGY3M2NiNDM5ZDMyYTVhOCIsInN1YiI6IjY2NWRkNzI3MzdlNmYzNjhkYzc5OTNmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.47csLb-ojIZN_riaBfO2f45rNP_XGhqEIn9PWbg9VFg",
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

  return (
    <QueryClientProvider client={client}>
      <FilterDataProvider>
        <CheckParamsProvider>
          <ListProvider>
            <Gradient />
            <Navbar />
            <Container
              component={"main"}
              maxWidth={"xxl"}
              sx={{ paddingTop: "1rem", marginTop: "3.5rem" }}
            >
              <Routes>
                <Route
                  path="/"
                  element={<Home />}
                />
                <Route
                  path="/movies"
                  element={<Movies />}
                />
                <Route
                  path="/movies/:id"
                  element={<Info />}
                />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<LogIn />} />
                <Route
                  path="/not-found"
                  element={<ErrorPage error="404 Error: Page Not Found" />}
                />
                <Route path="*" element={<Navigate to="/not-found" />} />
              </Routes>
            </Container>
          </ListProvider>
        </CheckParamsProvider>
      </FilterDataProvider>
    </QueryClientProvider>
  );
}

export default App;
