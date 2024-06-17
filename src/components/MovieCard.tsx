import {
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { Movie } from "./Movies";
import { MCard } from "./MuiCustoms";

// Types
interface Props {
  item: Movie;
}

const MovieCard: React.FC<Props> = ({ item }) => {
  return (
    <MCard sx={{ width: 300 }}>
      <CardActionArea disableRipple>
        <CardMedia
          component="img"
          image={
            "https://image.tmdb.org/t/p/w600_and_h900_bestv2/" +
            item.poster_path
          }
          alt={item.original_title}
        />
      </CardActionArea>
      <CardContent>
        {item.original_title.length > 22 ? (
          <Tooltip title={item.original_title} TransitionComponent={Zoom} placement="top" arrow>
            <Typography gutterBottom variant="h6" component="div">
          {item.original_title.slice(0, 20) + '...'}
        </Typography>
          </Tooltip>
        ) : (
                  <Typography gutterBottom variant="h6" component="div">
                  {item.original_title}
                </Typography>
        )}
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
