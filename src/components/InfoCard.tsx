import {
  Box,
  Chip,
  Grid,
  Rating,
  Typography,
  createStyles,
  useMediaQuery,
} from "@mui/material";
import { Rate } from "./MuiCustoms";
import { GenresList } from "../pages/Movies";
import { commaSeperate } from "../main";

// Types
interface Props {
  detail: any;
  cast: any;
}

// Styles
const movieInfo: Record<string, string | number> = createStyles({
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

const InfoCard: React.FC<Props> = ({ detail, cast }) => {
  // Mediaqueries
  const sm = useMediaQuery("(min-width:480px)");
  const md = useMediaQuery("(min-width:768px)");
  const lg = useMediaQuery("(min-width:992px)");

  //   Crew Info
  const director = cast.crew
    .filter(({ job }: any) => job === "Director")
    .slice(0, 2);

  const producer = cast.crew
    .filter(({ job }: any) => job === "Producer")
    .slice(0, 2);

  const writer = cast.crew
    .filter(({ job }: any) => job === "Story")
    .slice(0, 2);

  const sound = cast.crew
    .filter(({ job }: any) => job === "Supervising Sound Editor")
    .slice(0, 2);

  return (
    <>
      {/* Poster */}
      <Grid
        item
        xs={12}
        md={6}
        lg={3}
        order={1}
        component={"img"}
        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${detail?.poster_path}`}
        height={md ? "420px" : "180px"}
        sx={{ objectFit: "contain" }}
      ></Grid>

      {/* Main Info */}
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        order={lg ? 2 : md ? 3 : 2}
        sx={{ ...movieInfo, gap: 4 }}
      >
        {/* Title */}
        <Box
          sx={{
            textAlign: md ? "left" : "center",
            display: md && !lg ? "none" : "block",
          }}
        >
          <Typography variant="h3" fontWeight={700}>
            {detail?.original_title}
          </Typography>

          {/* Subtitle */}
          <Typography variant="subtitle2">
            {detail.status} -{" "}
            {detail.origin_country.map((country: string) => country)} (
            {detail.original_language})
          </Typography>
        </Box>

        {/* Credits */}
        <Grid container spacing={2}>
          {/* Director */}
          <Grid item xs={6} sm={3} sx={{ textAlign: sm ? "start" : "center" }}>
            <Typography variant="body1" fontWeight={700}>
              Director
            </Typography>
            {director.length > 0
              ? director.map((item: any, idx: number) => {
                  return (
                    <Typography variant="body2" key={idx}>
                      {item.name}
                    </Typography>
                  );
                })
              : "---"}
          </Grid>

          {/* Producer */}
          <Grid item xs={6} sm={3} sx={{ textAlign: sm ? "start" : "center" }}>
            <Typography variant="body1" fontWeight={700}>
              Producer
            </Typography>
            {producer.length > 0
              ? producer.map((item: any, idx: number) => {
                  return (
                    <Typography variant="body2" key={idx}>
                      {item.name}
                    </Typography>
                  );
                })
              : "---"}
          </Grid>

          {/* Writer */}
          <Grid item xs={6} sm={3} sx={{ textAlign: sm ? "start" : "center" }}>
            <Typography variant="body1" fontWeight={700}>
              Writer
            </Typography>
            {writer.length > 0
              ? writer.map((item: any, idx: number) => {
                  return (
                    <Typography variant="body2" key={idx}>
                      {item.name}
                    </Typography>
                  );
                })
              : "---"}
          </Grid>

          {/* Sound */}
          <Grid item xs={6} sm={3} sx={{ textAlign: sm ? "start" : "center" }}>
            <Typography variant="body1" fontWeight={700}>
              Sound
            </Typography>
            {sound.length > 0
              ? sound.map((item: any, idx: number) => {
                  return (
                    <Typography variant="body2" key={idx}>
                      {item.name}
                    </Typography>
                  );
                })
              : "---"}
          </Grid>
        </Grid>

        {/* Overview */}
        <Box>
          <Typography variant="h6" fontWeight={700}>
            Overview
          </Typography>
          <Typography variant="body1">{detail?.overview}</Typography>
        </Box>

        {/* Genres */}
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
          <Typography variant="h6" fontWeight={700}>
            Genres:
          </Typography>
          {detail.genres.map((genre: GenresList) => {
            return <Chip label={genre.name}></Chip>;
          })}
        </Box>
      </Grid>

      {/* Aside Info */}
      <Grid
        item
        xs={12}
        md={5}
        lg={1}
        order={lg ? 3 : md ? 2 : 3}
        sx={{ ...movieInfo, paddingTop: "0.6rem", alignItems: "center" }}
      >
        {/* Title */}
        {md && !lg && (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3" fontWeight={700}>
              {detail?.original_title}
            </Typography>

            {/* Subtitle */}
            <Typography variant="subtitle2">
              {detail.status} -{" "}
              {detail.origin_country.map((country: string) => country)} (
              {detail.original_language})
            </Typography>
          </Box>
        )}

        {/* Rate */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Rating
            name="size-large"
            defaultValue={2.5}
            precision={0.5}
            size="large"
          />
          <Rate value={detail?.vote_average * 10} position="relative" />
        </Box>

        {/* Popularity */}
        <Box sx={{ textAlign: "center", marginTop: "1rem" }}>
          <Typography variant="subtitle1" fontWeight={700} lineHeight="1.25rem">
            Popularity
          </Typography>
          <Typography variant="subtitle1" fontSize="0.98rem">
            {commaSeperate(Math.floor(detail.popularity * 1000))}
          </Typography>
        </Box>

        {/* Release */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="subtitle1" fontWeight={700} lineHeight="1.25rem">
            Release
          </Typography>
          <Typography variant="subtitle1" fontSize="0.98rem">
            {detail?.release_date.split("-").join("/")}
          </Typography>
        </Box>

        {/* Runtime */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="subtitle1" fontWeight={700} lineHeight="1.25rem">
            Runtime
          </Typography>
          <Typography variant="subtitle1" fontSize="0.98rem">
            {`${Math.floor(detail?.runtime / 60)}h ${detail?.runtime % 60}m`}
          </Typography>
        </Box>

        {/* Budget */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="subtitle1" fontWeight={700} lineHeight="1.25rem">
            Budget
          </Typography>
          <Typography variant="subtitle1" fontSize="0.98rem">
            {"$" + commaSeperate(detail?.budget)}
          </Typography>
        </Box>

        {/* Revenue */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="subtitle1" fontWeight={700} lineHeight="1.25rem">
            Revenue
          </Typography>
          <Typography variant="subtitle1" fontSize="0.98rem">
            {"$" + commaSeperate(detail?.revenue)}
          </Typography>
        </Box>
      </Grid>
    </>
  );
};

export default InfoCard;
