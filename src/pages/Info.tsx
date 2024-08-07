import React, { useContext, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { moviesAPI } from "../App";

// Components
import {
  ArticleBox,
  CastCard,
  getCenter,
  RecomCard,
  Section,
} from "../components/MuiCustoms";
import MovieError from "./ErrorPage";
import InfoCard from "../components/InfoCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { CustomTheme, DefaultTheme, ThemeContext } from "../context/Theme";
import InfoSkeleton from "../components/InfoSkeleton";

// Types
interface Props {
  isNavScrolled: boolean;
}

const Info = () => {
  const sessionID = localStorage.getItem("session_id") as string;
  const accountID = localStorage.getItem("account_id") as string;

  // Page Param
  const param = useLocation();
  const pageParam = useMemo(() => {
    const path = param.pathname.split("/");
    const id = path.at(-1);
    return id;
  }, [param]);

  // Movie Info API
  const {
    data: detailData,
    isError: isErrorDetail,
    isLoading: isLoadingDetail,
    refetch: refetchDetail,
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
    refetch: refetchCast,
  } = useQuery({
    queryKey: ["CastAPI"],
    queryFn: async () => {
      const res = await moviesAPI.get(`/3/movie/${pageParam}/credits`);
      return res?.data;
    },
  });
  const {
    data: recomData,
    isLoading: isLoadingRecom,
    isError: isErrorRecom,
    refetch: refetchRecom,
  } = useQuery({
    queryKey: ["RecomAPI"],
    queryFn: async () => {
      const res = await moviesAPI.get(`/3/movie/${pageParam}/recommendations`);
      return res?.data.results;
    },
  });
  const { data: rateData } = useQuery({
    queryKey: ["rateValue"],
    queryFn: async () => {
      const res = await moviesAPI.get(
        `https://api.themoviedb.org/3/account/${accountID}/rated/movies?session_id=${sessionID}`
      );
      return res?.data.results;
    },
    enabled: Boolean(sessionID),
  });

  // Initial Rate Value
  const movieRate = () => {
    const output = {
      rate: 2.5,
      isRated: false,
    };
    rateData &&
      rateData.find((item: any) => {
        if (item.id === detailData.id) {
          output.rate = item.rating;
          output.isRated = true;
        }
      });
    return output;
  };

  // Movie Refetch
  useEffect(() => {
    refetchDetail();
    refetchCast();
    refetchRecom();
  }, [pageParam]);

  // Theme
  const mode = (useContext<ThemeContext>(DefaultTheme).theme as CustomTheme)
    .palette.mode;

  // Breakpoints
  const sm = useMediaQuery("(min-width:600px)");
  const md = useMediaQuery("(min-width:768px)");
  const lg = useMediaQuery("(min-width:992px)");
  const xl = useMediaQuery("(min-width:1280px)");

  if (isLoadingDetail) return <InfoSkeleton />;
  if (isErrorDetail) return <MovieError error="Movie Not Found" />;

  if (castData && detailData && recomData)
    return (
      <Stack 
      // sx={isNavScrolled ? { marginTop: "50px" } : {}}
      >
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
              mode === "dark" ? "rgba(26,27,31,0.7)" : "rgba(255,255,255,0.7)"
            }
          >
            <InfoCard
              detail={detailData}
              cast={castData}
              movieRate={movieRate}
            />
          </Section>
        </Box>

        {/* Cast List */}
        <Section>
          <ArticleBox title="cast" xs={12}>
            {castData.cast.length === 0 && (
              <Typography sx={{ ...getCenter.static }}>
                No Casts Found!
              </Typography>
            )}
            <Swiper
              slidesPerView={xl ? 6 : lg ? 5 : md ? 4 : sm ? 3 : 2}
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
          <ArticleBox title="Recommendations" xs={12}>
            {recomData.length === 0 && (
              <Typography sx={{ ...getCenter.static }}>
                No Recommendations Found!
              </Typography>
            )}
            <Swiper
              slidesPerView={xl ? 6 : lg ? 5 : md ? 4 : sm ? 3 : 2}
              grabCursor={true}
            >
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
