import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { useContext, useMemo } from "react";
import { DefaultTheme } from "../context/Theme";

// Components
import { Genre, Movie, GenresList } from "./Movies";
import { Adult, GenreLabel, MCard, Rate } from "./MuiCustoms";

// Types
interface Props {
  item: Movie,
  genres: GenresList
}

const MovieCard: React.FC<Props> = ({ item, genres }) => {
  const rateValue = item.vote_average;
  const genreLabels = item.genre_ids.slice(0, 2)
  
  // Theme
  const theme = useContext(DefaultTheme)?.theme;

  // Genres Table
  // type GenresList = Record<string, string>
  // let genresList: GenresList = {}
  // useMemo(()=>{
  //   genres.map(item => {
  //     const idx = (item.id).toString()
  //     genresList[idx] = item.name
  //   })
  // }, [genres])
  // console.log(genresList);
  


  return (
    <MCard sx={{ width: 300 }}>
      <CardActionArea disableRipple>
        {item.adult && <Adult label={"+18"}></Adult>}
        <CardMedia
          component="img"
          image={
            "https://image.tmdb.org/t/p/w600_and_h900_bestv2/" +
            item.poster_path
          }
          alt={item.original_title}
        />
        <Rate value={rateValue * 10} />
      </CardActionArea>
      <CardContent sx={{ position: "relative" }}>
        {item.original_title.length > 22 ? (
          <Tooltip
            title={item.original_title}
            TransitionComponent={Zoom}
            placement="top"
            arrow
          >
            <Typography gutterBottom variant="h6" component="div" sx={{marginBottom: 1}}>
              {item.original_title.slice(0, 20) + "..."}
            </Typography>
          </Tooltip>
        ) : (
          <Typography gutterBottom variant="h6" component="div" sx={{marginBottom: 1}}>
            {item.original_title}
          </Typography>
        )}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            gutterBottom
            variant="body2"
            color={theme?.palette.grey[700]}
            sx={{marginBottom: 0.75}}
          >
            Release: {item.release_date}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          {genreLabels.map((genre, idx) => {
            const genreIdx = genre.toString()
            return <GenreLabel label={genres[genreIdx]} variant="outlined" key={idx}></GenreLabel>
          })}
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Watch Later
        </Button>
        <Button size="small" color="primary">
          Add to Fav
        </Button>
      </CardActions>
    </MCard>
  );
};

export default MovieCard;
