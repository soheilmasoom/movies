import { useState } from "react";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { Container } from "@mui/material";
import { FilterDataProvider } from "./context/MoviesData";

// Components
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";

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
        <Navbar isNavScrolled={isNavScrolled} />
        <Container
          component={"main"}
          maxWidth={"xxl"}
          sx={{ marginTop: "1rem" }}
        >
          <Movies isNavScrolled={isNavScrolled}></Movies>
        </Container>
      </FilterDataProvider>
    </QueryClientProvider>
  );
}

export default App;
