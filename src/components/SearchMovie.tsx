import { memo, useMemo, useState } from "react";
import axios from "axios";
import { OutlinedInput, styled } from "@mui/material";
import { BsSearch } from "react-icons/bs";

// Components
import { Movie } from "./Movies";
import { SearchMovieOptions } from "./MuiCustoms";

interface Props {
  width: string
}

const SearchMovie: React.FC<Props> = ({width}) => {
  const [data, setData] = useState<Movie[]>();
  const [show, setShow] = useState<boolean>(false);

  // Styled Component
const SearchInput = useMemo(()=>{
  return styled(OutlinedInput)({
    width: "100%",
    borderRadius: "2.5rem !important",
  
    input: {
      height: "0.5rem",
    },
  });
},[])

    // SearchMovie API
  async function SearchOptions(value: string) {
    const res = await axios.get("https://api.themoviedb.org/3/search/movie", {
      params: {
        api_key: "78ab21f3a9e954c04f73cb439d32a5a8",
        query: value,
      },
    });
    const search: Movie[] = [];
    res?.data.results.map((item: Movie) => {
      if (item.original_title.toLowerCase().includes(value.toLowerCase())) {
        search.push(item);
      }
    });
    setData(search);
  }

  return (
    <div style={{width}}>
      <SearchInput
        id="outlined-basic"
        placeholder="Search"
        startAdornment={
          <BsSearch size="1.25rem" style={{ marginRight: "0.5rem" }} />
        }
        onChange={(event) => {
          event.target.value.trim() ? setShow(true) : setShow(false);
          SearchOptions(event.target.value);
        }}
      />
      <SearchMovieOptions
        show={show}
        data={data as Movie[]}
      ></SearchMovieOptions>
    </div>
  );
};

export default memo(SearchMovie);
