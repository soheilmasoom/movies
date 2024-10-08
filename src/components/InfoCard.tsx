import {
  Box,
  Checkbox,
  Chip,
  Grid,
  IconButton,
  Rating,
  Typography,
  createStyles,
  useMediaQuery,
} from "@mui/material";
import { AddAlert, getCenter, Rate, userOption } from "./MuiCustoms";
import { GenresList } from "../pages/Movies";
import { commaSeperate } from "../main";
import { BsCardChecklist, BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { List, ListTypes } from "../context/List";
import { useUserlist } from "../hooks/useUserlist";
import { useMutation } from "react-query";
import { moviesAPI } from "../App";
import defaultPoster from "../assets/images/default-poster.jpg"
import { CheckAccount, CheckAccountType } from "../context/CheckAccount";

// Types
interface Props {
  detail: any;
  cast: any;
  movieRate: () => { rate: number; isRated: boolean };
}

// Styles
const movieInfo: Record<string, string | number> = createStyles({
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

const InfoCard: React.FC<Props> = ({ detail, cast, movieRate }) => {
  const sessionID = localStorage.getItem("session_id") as string;
  const {apiKey, authCode} = useContext<CheckAccountType>(CheckAccount);
  const { favlist, addToFavContext, addToWatchContext, deleteFromFavContext } =
    useContext<ListTypes>(List);

  // Check Favorite Items
  const [isFav, setIsFav] = useState<boolean>(false);
  useEffect(() => {
    const val = favlist.find((movie) => movie.id === detail.id);
    val ? setIsFav(true) : setIsFav(false);
  }, []);

  // Userlist Hook
  const {
    addToList,
    RemoveFromList,
    cancelListUpdate,
    openSnack,
    setOpenSnack,
  } = useUserlist({api_key: apiKey, Authorization: authCode});

  // Rate API
  const { mutate } = useMutation({
    mutationKey: ["rateMovie"],
    mutationFn: async (payload: string[]) => {
      return await moviesAPI.post(
        `3/movie/${payload[0]}/rating${
          sessionID ? `?session_id=${sessionID}` : ""
        }`,
        { value: Number(payload[1]) * 2 },
        {
          params: {
            api_key: apiKey
          },
          headers: {
            Authorization: authCode
          }
        }
      );
    },
  });

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
      {/* Title */}
      {md && !lg && (
        <Grid item xs={12} sx={{ marginBottom: "-1rem" }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3" fontWeight={700}>
              {detail?.original_title}
            </Typography>
          </Box>
        </Grid>
      )}

      {/* Poster */}
      <Grid
        item
        xs={12}
        md={6}
        lg={3}
        order={1}
        height={md ? "420px" : "180px"}
        sx={{
          position: "relative",
          "&:hover .user-options": {
            opacity: 0.9,
          },
        }}
      >
        {/* Image */}
        <Box
          component={"img"}
          src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${detail?.poster_path}`}
          onError={(event) => {
            if (event.type === "error") {
              event.currentTarget.src = defaultPoster
            }
          }}
          height="100%"
          width="100%"
          sx={{ objectFit: "contain" }}
        ></Box>

        {/* User Options */}
        <Box className="user-options" sx={{ ...userOption }}>
          <IconButton
            disableRipple
            onClick={() => {
              addToList(detail.id, "watchlist");
              addToWatchContext(detail);
            }}
          >
            <BsCardChecklist size="2.5rem" />
          </IconButton>
          <Checkbox
            icon={<BsSuitHeart size="2.5rem" />}
            checked={isFav}
            checkedIcon={<BsSuitHeartFill size="2.5rem" color="red" />}
            onChange={(e) => {
              setIsFav(!isFav);
              if (e.target.checked) {
                addToList(detail.id, "favorite");
                addToFavContext(detail);
              } else {
                RemoveFromList(detail.id, "favorite");
                deleteFromFavContext(detail);
              }
            }}
          />
        </Box>
      </Grid>

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
        <Grid container spacing={2} sx={{ maxWidth: "40rem" }}>
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
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Typography variant="h6" fontWeight={700}>
            Genres:
          </Typography>
          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
            {detail.genres.map((genre: GenresList) => {
              return <Chip label={genre.name}></Chip>;
            })}
          </Box>
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
        {/* Rate */}
        <Box>
          <Box sx={{ ...getCenter.flex, gap: 3 }}>
            <Rating
              name="size-large"
              defaultValue={movieRate().rate}
              precision={0.5}
              size="large"
              onChange={(_, newVal) => {
                mutate([detail?.id, newVal]);
              }}
            />
            <Rate value={detail?.vote_average * 10} position="relative" />
          </Box>

          {/* Subtitle */}
          {md && !lg && (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="subtitle2">
                {detail.status} -{" "}
                {detail.origin_country.map((country: string) => country)} (
                {detail.original_language})
              </Typography>
            </Box>
          )}
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

      {/* Snackbar */}
      <AddAlert
        openSnack={openSnack}
        closeSnack={() => setOpenSnack(false)}
        cancelAdding={() => {
          cancelListUpdate.current && cancelListUpdate.current();
        }}
      />
    </>
  );
};

export default InfoCard;
