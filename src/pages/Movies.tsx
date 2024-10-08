import { memo, useContext, useMemo, useState } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { FilterData } from "../context/MoviesData";

// Components
import MoviesList from "../components/MoviesList";
import Aside from "../components/Aside";

// Types
export type GenresList = Record<string, string>;
export interface Movie {
  adult: boolean;
  poster_path: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  overview: string;
  popularity: number;
  vote_average: number;
  release_date: string;
}
export interface ListItem {
  id: number | string;
  name: string;
}

const Movies = () => {
  const [genresTable, setGenresTable] = useState<GenresList>({});
  const genreList: ListItem[] = useContext(FilterData).genreList

  // Breakpoints
  const lg = useMediaQuery("(min-width:992px)");

  // Genres Table
  let genreTemp: GenresList = {};
  useMemo(() => {
    genreList !== undefined &&
      genreList.map((item: ListItem) => {
        const idx = item.id.toString();
        genreTemp[idx] = item.name;
        setGenresTable(genreTemp);
      });
  }, [genreList]);

  return ( 
      <Grid container spacing={3}>
        <Grid item component={"aside"} xs={0} lg={2.5}>
          {lg && <Aside />}
        </Grid>
        <Grid item component={"section"} xs={12} lg={9.5}>
          <MoviesList genresTable={genresTable} />
        </Grid>
      </Grid>
  );
};

export default memo(Movies);
