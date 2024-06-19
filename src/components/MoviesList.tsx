import { Grid } from "@mui/material";
import MovieCard from "./MovieCard";
import { GenresList, Movie } from "./Movies";
import { InfiniteData } from "react-query";

// Types
interface Props {
    data: InfiniteData<any> | undefined,
    genresList: GenresList
}

const MoviesList:React.FC<Props> = ({data, genresList}) => {
    return ( 
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
     );
}
 
export default MoviesList;