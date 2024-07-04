import React, { useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { Box, Stack, useMediaQuery } from "@mui/material";
import { moviesAPI } from "../App";

// Components
import {
  ArticleBox,
  CastCard,
  Loader,
  RecomCard,
  Section,
} from "../components/MuiCustoms";
import MovieError from "./ErrorPage";
import InfoCard from "../components/InfoCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { CustomTheme, DefaultTheme, ThemeContext } from "../context/Theme";

// Types
interface Props {
  isNavScrolled: boolean;
}

const Info: React.FC<Props> = ({ isNavScrolled }) => {

  // Page Param
  const param = useLocation();
  const pageParam = useMemo(() => {
    const id = param.pathname.split("/").at(-1);
    return id;
  }, [param]);

  // Movie Info API
  const {
    data: detailData,
    isError: isErrorDetail,
    isLoading: isLoadingDetail,
  } = useQuery({
    queryKey: ["MovieAPI"],
    queryFn: async () => {
      const res = await moviesAPI.get(
        `/3/movie/${pageParam}?external_source=imdb_id`
      );
      return res?.data;
    },
  });
  const {
    data: castData,
    isError: isErrorCast,
    isLoading: isLoadingCast,
  } = useQuery({
    queryKey: ["CastAPI"],
    queryFn: async () => {
      const res = await moviesAPI.get(`/3/movie/${pageParam}/credits`);
      return res?.data;
    },
  });
  const {
    data: recomData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["RecomAPI"],
    queryFn: async () => {
      const res = await moviesAPI.get(`/3/movie/${pageParam}/recommendations`);
      return res?.data.results;
    },
  });

  // Theme
  const defaultTheme = useContext<ThemeContext>(DefaultTheme)
    .theme as CustomTheme;

  // Breakpoints
  const md = useMediaQuery("(min-width:768px)");
  const lg = useMediaQuery("(min-width:992px)");
  const xl = useMediaQuery("(min-width:1280px)");

  if (isLoadingDetail || isLoadingCast) return <Loader />;
  if (isErrorDetail || isErrorCast)
    return <MovieError error="Movie Not Found" />;

  if (castData && detailData && recomData)
    return (
      <Stack sx={isNavScrolled ? { marginTop: "50px" } : {}}>
        {/* Info Banner */}
        <Box
          id="info_banner"
          sx={{
            backgroundImage: `url("https://image.tmdb.org/t/p/w600_and_h900_bestv2/${detailData?.poster_path}")`,
          }}
        >
          <Section
            paddingX
            backgroundColor={
              defaultTheme.palette.mode === "dark"
                ? "rgba(18,18,18,0.7)"
                : "rgba(184, 189, 181, 0.7)"
            }
          >
            <InfoCard detail={detailData} cast={castData} />
          </Section>
        </Box>

        {/* Cast List */}
        <Section>
          <ArticleBox title="cast" xs={12}>
            <Swiper
              slidesPerView={xl ? 6 : lg ? 5 : md ? 4 : 3}
              grabCursor={true}
            >
              {castData.cast.map((item: any) => {
                return (
                  <SwiperSlide>
                    <CastCard item={item} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </ArticleBox>
        </Section>

        {/* Recommendation List */}
        <Section>
          <ArticleBox title="Recommended Movies" xs={12}>
            <Swiper slidesPerView={6} grabCursor={true}>
              {recomData.map((item: any) => {
                return (
                  <SwiperSlide>
                    <RecomCard item={item} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </ArticleBox>
        </Section>
      </Stack>
    );
};

export default Info;
