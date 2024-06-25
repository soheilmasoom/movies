import { useContext, useEffect, useMemo, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { AxiosInstance } from "axios";
import { Grid } from "@mui/material";
import { CheckParams } from "../context/CheckParams";
import { GenresList, Movie } from "./Movies";

// Components
import MovieCard from "./MovieCard";
import MovieSkeleton from "./MovieSkeleton";
import { Loader } from "./MuiCustoms";
import MovieError from "./MovieError";

// Types
interface Props {
  genresList: GenresList;
  api: AxiosInstance;
}

const MoviesList: React.FC<Props> = ({ api, genresList }) => {
  const params = useContext(CheckParams);
  const searchParams = useMemo(() => {
    return localStorage.getItem("filterOptions")
      ? JSON.parse(localStorage.getItem("filterOptions") as string)
      : {};
  }, [params]);

  
  // MoviesAPI Req
  const { data, isError, isFetching, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["moviesAPI"],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await api.get(`/3/discover/movie?page=${pageParam}`, {
          params: {
            ...searchParams,
            "vote_average.gte": Number(searchParams["vote_average.gte"]) / 10,
            "vote_average.lte": Number(searchParams["vote_average.lte"]) / 10,
          },
        });
        return res?.data;
      },
      enabled: true,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length !== 0 ? allPages.length : undefined;
      },
    });

  // API Refetch
  useEffect(() => {
    if (params?.checkFilter === "on") {
      refetch();
      params.changeCheckFilter();
    }
  }, [params?.checkFilter]);

  // Loading Observer
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
  }, [data, loadingTarget, hasNextPage, fetchNextPage]);

  // // API Client Management
  if (isError) return <MovieError error={"Error! Please Try Later"} />;
  if (isFetching) return <MovieSkeleton />;
  if (data?.pages && data?.pages[0].results.length === 0)
    return <MovieError error={"There Are No Movies"} />;

  return (
    <>
      <Grid container spacing={3}>
        {data?.pages &&
          data.pages.map((page) => {
            return page?.results.map((item: Movie, idx: number) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  xl={3}
                  key={idx}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <MovieCard item={item} genres={genresList}></MovieCard>
                </Grid>
              );
            });
          })}
      </Grid>

      <Loader
        ref={loadingTarget}
        sx={{ display: data?.pages[0].results.length > 0 ? "block" : "none" }}
      />
    </>
  );
};

export default MoviesList;
