import { memo, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomTheme, DefaultTheme, ThemeContext } from "../context/Theme";
import { List, ListTypes } from "../context/List";
import {
  Box,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  IconButton,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { BsCardChecklist, BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";

// Components
import { Movie, GenresList } from "../pages/Movies";
import { Adult, GenreLabel, MCard, Rate } from "./MuiCustoms";

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
  const genreLabels = item.genre_ids.slice(0, 2);
  const { favlist, addToFavContext, addToWatchContext, deleteFromFavContext } =
    useContext<ListTypes>(List);
  const [isFav, setIsFav] = useState<boolean>(false);

  useEffect(() => {
    const val = favlist.find((movie) => movie.id === item.id);
    val ? setIsFav(true) : setIsFav(false);
  }, []);

  // Theme
  const defaultTheme = useContext<ThemeContext>(DefaultTheme)
    .theme as CustomTheme;

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
          alt={item.original_title}
        />

        {/* Movie Rate */}
        <Rate value={rateValue * 10} position="absolute" />
      </CardActionArea>

      <CardContent sx={{ position: "relative" }}>
        {/* Movie Title */}
        {item.original_title.length > 22 ? (
          <Tooltip
            title={item.original_title}
            TransitionComponent={Zoom}
            placement="top"
            arrow
          >
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ marginBottom: 1 }}
            >
              {item.original_title.slice(0, 20) + "..."}
            </Typography>
          </Tooltip>
        ) : (
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ marginBottom: 1 }}
          >
            {item.original_title}
          </Typography>
        )}

        {/* Movie Release Date */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            gutterBottom
            variant="body2"
            color={defaultTheme?.palette.grey[700]}
            sx={{ marginBottom: 0.75 }}
          >
            Release: {item.release_date}
          </Typography>
        </Box>

        {/* Movie Genres */}
        <Box sx={{ display: "flex", gap: 1.5 }}>
          {genreLabels.map((genre, idx) => {
            const genreIdx = genre.toString();
            return (
              <GenreLabel
                label={genres[genreIdx]}
                variant="outlined"
                key={idx}
              ></GenreLabel>
            );
          })}
        </Box>
      </CardContent>

      {/* Card Footer */}
      <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
        <IconButton
          // color="primary"
          disableRipple
          onClick={() => {
            addToList(item.id, "watchlist")
            addToWatchContext(item)
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
