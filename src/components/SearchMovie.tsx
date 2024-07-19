import { memo, useState } from "react";
import axios from "axios";
import { OutlinedInput, styled } from "@mui/material";
import { BsSearch } from "react-icons/bs";

// Components
import { Movie } from "../pages/Movies";
import { SearchMovieOptions } from "./MuiCustoms";

// Styled Component
const SearchInput = styled(OutlinedInput)({
  width: "100%",
  borderRadius: "2.5rem !important",

  input: {
    height: "0.5rem",
  },
});

interface Props {
  width: string;
}

const SearchMovie: React.FC<Props> = ({ width }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<Movie[] | undefined>();
  const [show, setShow] = useState<boolean>(false);

  // SearchMovie API
  async function SearchOptions(value: string) {
    const res = await axios.get("https://api.themoviedb.org/3/search/movie", {
      params: {
        api_key: "78ab21f3a9e954c04f73cb439d32a5a8",
        query: value,
      },
    });
    if (res.status === 200) {
      setIsLoading(false);
    }
    const search: Movie[] = [];
    res?.data.results.map((item: Movie) => {
      if (item.original_title.toLowerCase().includes(value.toLowerCase())) {
        search.push(item);
      }
    });

    setData(search);
  }

  return (
    <div style={{ width }}>
      <SearchInput
        id="search"
        placeholder="Search"
        startAdornment={
          <BsSearch size="1.25rem" style={{ marginRight: "0.5rem" }} />
        }
        onChange={(event) => {
          event.target.value.trim() ? setShow(true) : setShow(false);
          setIsLoading(true);
          SearchOptions(event.target.value);
        }}
      />
      <SearchMovieOptions
        show={show}
        data={data as Movie[]}
        isLoading={isLoading}
        handleClose={() => setShow(false)}
      ></SearchMovieOptions>
    </div>
  );
};

export default memo(SearchMovie);
