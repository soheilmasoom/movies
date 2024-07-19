import { memo, useContext, useState } from "react";
import { useQuery } from "react-query";
import { moviesAPI } from "../App";
import { Box, SpeedDial, SpeedDialAction, Stack } from "@mui/material";
import MoviesSwiper from "../components/MoviesSwiper";

// Swiper Styled
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import { CustomTheme, DefaultTheme, ThemeContext } from "../context/Theme";
import { sortList } from "../components/Aside";
import { ListItem } from "./Movies";
import { useNavigate } from "react-router-dom";
import TopSkeleton from "../components/TopSkeleton";
import ErrorPage from "./ErrorPage";

// Types
interface Props {
  isNavScrolled: boolean;
}

// SpeedDial Actions
const actions = ["Vote Rate", "Release", "Title", "Trends"];

const Home: React.FC<Props> = ({ isNavScrolled }) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  // Theme
  const defaultTheme = useContext<ThemeContext>(DefaultTheme)
    .theme as CustomTheme;

  // Top Movies API
  const { data, isLoading, isError } = useQuery({
    queryKey: ["TopAPI"],
    queryFn: async () => {
      const res = await moviesAPI.get("/3/movie/popular");
      return res?.data.results;
    },
  });

  // Navigatation
  function handleClick(sort: string) {
    const sortQuery = sortList.filter(
      (item: ListItem) => item.name === `${sort} Descending`
    );

    localStorage.setItem(
      "filterOptions",
      JSON.stringify({ sort_by: sortQuery.length > 0 ? sortQuery[0].id : "" })
    );
    navigate("/movies");
  }

  if (isLoading) return <TopSkeleton />;
  if (isError) return <ErrorPage error={"Error! Please Try Later"} />;

  return (
    <Stack sx={isNavScrolled ? { marginTop: "50px" } : {}}>
      {data && <MoviesSwiper data={data}></MoviesSwiper>}

      <Box
        sx={{
          height: 330,
          transform: "translateZ(0px)",
          flexGrow: 1,
          position: "absolute",
          right: "1rem",
          bottom: "0.5rem",
          zIndex: 1010,
        }}
      >
        <SpeedDial
          ariaLabel="SpeedDial Movies"
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
            "& button": {
              transition: "all 0.3s ease",
              width: "5rem",
              height: "5rem",
              outline: `2px solid ${defaultTheme.palette.primary.main}`,
              outlineOffset: "0.25rem",
            },
            "& button:hover": {
              transition: "all 0.3s ease",
            },
            "& .speed-action": {
              width: "7rem",
              outline: "none",
            },
          }}
          icon={open ? "Sort by" : "Movies"}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action}
              icon={action}
              onClick={(e) => handleClick(e.target.childNodes[0].data)}
              className="speed-action"
            />
          ))}
        </SpeedDial>
      </Box>
    </Stack>
  );
};

export default memo(Home);
