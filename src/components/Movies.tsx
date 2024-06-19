import { Grid, Typography } from "@mui/material";
import { AxiosInstance } from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";

// Components
import { Loader } from "./MuiCustoms";
import MovieSkeleton from "./MovieSkeleton";
import MoviesList from "./MoviesList";
import Aside from "./Aside";

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

  // MoviesAPI Params
  const [searchParams, setSearchParams] = useState(
    JSON.parse(localStorage.getItem("filterOptions") as string)
  );
  const getFilterOptions = (state: {}) => {
    setSearchParams(state);
  };

  // MoviesAPI Req
  const { data, isError, isFetching, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["moviesAPI"],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await api.get(`/3/discover/movie?page=${pageParam}`, {
          params: { ...searchParams },
        });
        return res?.data;
      },
      enabled: true,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length !== 0 ? allPages.length : undefined;
      },
    });
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

  // Side-Effects
  const loadingTarget = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (hasNextPage && entries[0].isIntersecting) {
        fetchNextPage();
      }
    });
    if (loadingTarget?.current) {
      observer.observe(loadingTarget?.current);
    }

    // console.log(data?.pages);
  }, [data, loadingTarget, hasNextPage, fetchNextPage]);

  // API Client Management
  if (isError) return <Typography>Connect Your VPN, Please.</Typography>;
  if (isFetching) return <MovieSkeleton />;
  

  return (
    <Grid container spacing={3}>
      <Grid item component={"aside"} xs={0} lg={2.5}>
        <Aside
          refetch={refetch}
          genreList={genreList}
          countriesList={countriesList}
          getFilterOptions={getFilterOptions}
        />
      </Grid>
      <Grid item component={"section"} xs={12} lg={9.5}>
        <MoviesList data={data} genresList={genresList} />
        <Loader ref={loadingTarget} />
      </Grid>
    </Grid>
  );
};

export default Movies;
