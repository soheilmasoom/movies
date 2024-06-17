import { Grid, Typography } from "@mui/material";
import { AxiosInstance } from "axios";
import { useEffect, useRef } from "react";
import { isError, useInfiniteQuery } from "react-query";

// Components
import MovieCard from "./MovieCard";
import { Loader } from "./MuiCustoms";
import MovieSkeleton from "./MovieSkeleton";

// Types
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
}

const Movies: React.FC<Props> = ({ api }) => {
  // API Req
  const {
    data,
    status,
    error,
    isError,
    isFetching,
    isFetchingNextPage,
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

    console.log(data?.pages);
  }, [data, loadingTarget, hasNextPage, fetchNextPage]);

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
                  <MovieCard item={item}></MovieCard>
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
