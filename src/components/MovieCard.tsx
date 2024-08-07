import { memo, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, ListTypes } from "../context/List";
import {
  Box,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import { BsCardChecklist, BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import defaultPoster from "../assets/images/default-poster.jpg"

// Components
import { Movie, GenresList } from "../pages/Movies";
import { Adult, GenreLabel, MCard, Rate, TextSlide } from "./MuiCustoms";

// Types
interface Props {
  item: Movie;
  genres: GenresList;
  addToList: (id: number, list: string) => void;
  RemoveFromList: (id: number, list: string) => void;
}

const MovieCard: React.FC<Props> = ({
  item,
  genres,
  addToList,
  RemoveFromList,
}) => {
  const rateValue = item.vote_average;
  const genreLabels = item.genre_ids ? item.genre_ids.slice(0, 2) : [];
  const { favlist, addToFavContext, addToWatchContext, deleteFromFavContext } =
    useContext<ListTypes>(List);
  const [isFav, setIsFav] = useState<boolean>(false);

  // Set Favorite Movies
  useEffect(() => {
    const val = favlist.find((movie) => movie.id === item.id);
    val ? setIsFav(true) : setIsFav(false);
  }, []);

  // Redirection
  const navigate = useNavigate();
  const handleClick = (id: number) => {
    navigate(`/movies/${id}`);
  };

  return (
    <MCard sx={{ width: 300 }}>
      <CardActionArea disableRipple onClick={() => handleClick(item.id)}>
        {/* Adults Chip */}
        {item.adult && <Adult label={"+18"}></Adult>}

        {/* Card Image */}
        <CardMedia
          component="img"
          image={
            "https://image.tmdb.org/t/p/w600_and_h900_bestv2/" +
            item.poster_path
          }
          onError={(event) => {
            if (event.type === "error") {
              event.currentTarget.src = defaultPoster
            }
          }}
          alt={item.original_title}
        />

        {/* Movie Rate */}
        <Rate value={rateValue * 10} position="absolute" />
      </CardActionArea>

      {/* Card Content */}
      <CardContent sx={{ position: "relative" }}>
        {/* Movie Title */}
        <TextSlide
          width="min(100%, 18rem)"
          variant="h6"
          sx={{ marginBottom: 1 }}
        >
          {item?.original_title}
        </TextSlide>

        {/* Movie Release Date */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            gutterBottom
            variant="body2"
            sx={{
              marginBottom: 0.75,
              color: (theme) => theme.palette.grey[700],
            }}
          >
            Release: {item.release_date ? item.release_date : "---"}
          </Typography>
        </Box>

        {/* Movie Genres */}
        <Box sx={{ display: "flex", gap: 1.5 }}>
          {genreLabels.length > 0 ? (
            genreLabels.map((genre, idx) => {
              const genreIdx = genre.toString();
              return (
                <GenreLabel
                  key={idx}
                  label={genres[genreIdx]}
                  variant="outlined"
                />
              );
            })
          ) : (
            <GenreLabel label={"No Genres"} variant="outlined" />
          )}
        </Box>
      </CardContent>

      {/* Card Footer */}
      <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
        <IconButton
          disableRipple
          onClick={() => {
            addToList(item.id, "watchlist");
            addToWatchContext(item);
          }}
        >
          <BsCardChecklist size="1.5rem" />
        </IconButton>

        <Checkbox
          icon={<BsSuitHeart size="1.5rem" />}
          checked={isFav}
          checkedIcon={<BsSuitHeartFill color="red" size="1.5rem" />}
          onChange={(e) => {
            setIsFav(!isFav);
            if (e.target.checked) {
              addToList(item.id, "favorite");
              addToFavContext(item);
            } else {
              RemoveFromList(item.id, "favorite");
              deleteFromFavContext(item);
            }
          }}
        />
      </CardActions>
    </MCard>
  );
};

export default memo(MovieCard);
