import { Container } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";

// Components
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";

// HTTP Req Configuration
const moviesAPI = axios.create({
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
    }
  }
});


function App() {

  return (
    <QueryClientProvider client={client}>
        <Navbar></Navbar>
        <Container component={'main'}>
          <Movies api={moviesAPI}></Movies>
        </Container>
      </QueryClientProvider>
  );
}

export default App;
