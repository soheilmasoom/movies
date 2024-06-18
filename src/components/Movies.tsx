import { Grid, Typography } from "@mui/material";
import { AxiosInstance } from "axios";
import { useEffect, useMemo, useRef } from "react";
import { useInfiniteQuery, useQuery } from "react-query";

// Components
import MovieCard from "./MovieCard";
import { Loader } from "./MuiCustoms";
import MovieSkeleton from "./MovieSkeleton";

// Types
export type GenresList = Record<string, string>
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
export interface Genre {
  id: number,
  name: string
}

const Movies: React.FC<Props> = ({ api }) => {

  // MoviesAPI Req
  const {
    data,
    isError,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["moviesAPI"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get(`/3/trending/movie/day?page=${pageParam}`);
      return res?.data;
    },
    enabled: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length !== 0 ? allPages.length : undefined;
    },
  });
  // GenreListAPI Req
  const {data: genreList} = useQuery({
    queryKey: ['genresAPI'],
    queryFn: async () => {
      const res = await api.get('/3/genre/movie/list')
      return res?.data.genres
    }
  })


  // Genres Table
  let genresList: GenresList = {}
  useMemo(()=>{
    (genreList !== undefined) && genreList.map((item: Genre) => {
      const idx = (item.id).toString()
      genresList[idx] = item.name
    })
  }, [genreList])
  console.log(genresList);


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
  if (isError) return (<Typography>Connect Your VPN, Please.</Typography>)
  if (isFetching) return <MovieSkeleton />;

  return (
    <>
      <Grid container spacing={3}>
        {data?.pages &&
          data.pages.map((page) => {
            return page.results.map((item: Movie, idx: number) => {
              return (
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={3}
                  key={idx}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <MovieCard item={item} genres={genresList}></MovieCard>
                </Grid>
              );
            });
          })}
      </Grid>
      <Loader ref={loadingTarget} />
    </>
  );
};

export default Movies;
