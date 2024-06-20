import { Grid } from "@mui/material";
import { AxiosInstance } from "axios";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";

// Components
import MoviesList from "./MoviesList";
import Aside from "./Aside";
import { CheckParamsProvider } from "../context/CheckParams";

// Types
export type GenresList = Record<string, string>;
interface Props {
  api: AxiosInstance;
}
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

const Movies: React.FC<Props> = ({ api }) => {
  const [genresList, setGenresList] = useState<GenresList>({});
  const [countriesList, setCountriesList] = useState<ListItem[]>([]);

  // GenreListAPI Req
  const { data: genreList } = useQuery({
    queryKey: ["genresAPI"],
    queryFn: async () => {
      const res = await api.get("/3/genre/movie/list");
      return res?.data.genres;
    },
  });
  // CountriesListAPI Req
  const { data: countries } = useQuery({
    queryKey: ["countriesAPI"],
    queryFn: async () => {
      const res = await api.get("/3/configuration/countries");
      return res?.data;
    },
  });

  // Genres Table
  let genreTemp: GenresList = {};
  useMemo(() => {
    genreList !== undefined &&
      genreList.map((item: ListItem) => {
        const idx = item.id.toString();
        genreTemp[idx] = item.name;
        setGenresList(genreTemp);
      });
  }, [genreList]);

  // Countries Table
  let countryTemp: ListItem[] = [];
  useMemo(() => {
    countries !== undefined &&
      countries.map((country: any) => {
        const temp = { id: country.english_name, name: country.english_name };
        countryTemp.push(temp);
      });
    setCountriesList(countryTemp);
  }, [countries]);

  return (
    <CheckParamsProvider>
      <Grid container spacing={3}>
        <Grid item component={"aside"} xs={0} lg={2.5}>
          <Aside genreList={genreList} countriesList={countriesList} />
        </Grid>
        <Grid item component={"section"} xs={12} lg={9.5}>
          <MoviesList api={api} genresList={genresList} />
        </Grid>
      </Grid>
    </CheckParamsProvider>
  );
};

export default Movies;
