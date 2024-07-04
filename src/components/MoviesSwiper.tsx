import { useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Section } from "./MuiCustoms";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { CustomTheme, DefaultTheme, ThemeContext } from "../context/Theme";
import { useNavigate } from "react-router-dom";

// Types
interface Props {
  data: any;
}

const MoviesSwiper: React.FC<Props> = ({ data }) => {
  const [centeredSlide, setCenteredSlide] = useState<number>(0);
  const navigate = useNavigate()

  // Theme
  const defaultTheme = useContext<ThemeContext>(DefaultTheme)
    .theme as CustomTheme;

  // Breakpoints
  const sm = useMediaQuery("(min-width:502px)");

  return (
    <Box
      sx={{
        backgroundImage: `url("https://image.tmdb.org/t/p/w600_and_h900_bestv2/${data[centeredSlide]?.poster_path}")`,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          background:
            defaultTheme.palette.mode === "dark"
              ? "linear-gradient(to top , rgba(18,18,18,1) 20%, rgba(18,18,18,0))"
              : "linear-gradient(to top , rgba(184, 189, 181, 1) 20%, rgba(184, 189, 181, 0))",
        }}
      >
        <Section
          backgroundColor={
            defaultTheme.palette.mode === "dark"
              ? "rgba(18,18,18,0.7)"
              : "rgba(184, 189, 181, 0.2)"
          }
        >
          {data && (
            <Grid item xs={12}>
              <Button
                onClick={()=>navigate(`/movies/${data[centeredSlide].id}`)}
                sx={{
                  display: "block !important",
                  width: '100%',
                  color: defaultTheme.palette.text.primary,
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight={700}
                  textAlign={"center"}
                  sx={{ paddingX: "1rem" }}
                >
                  {data[centeredSlide].original_title}
                  <span
                    style={{ fontWeight: "100", fontSize: "2rem" }}
                  >{` (${data[centeredSlide].release_date.slice(0, 4)})`}</span>
                </Typography>
              </Button>

              <Swiper
                effect={sm ? "coverflow" : ""}
                slidesPerView={sm ? 8 : 3}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                autoplay={{
                  delay: 5000,
                  pauseOnMouseEnter: true,
                }}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                }}
                onSlideChange={(e) => setCenteredSlide(e.realIndex)}
                modules={[EffectCoverflow, Autoplay]}
                className="swiper_container"
                style={{ transform: "translate(-6%, 25%)" }}
              >
                {data.map((movie: any) => {
                  return (
                    <SwiperSlide>
                      <img
                        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie?.poster_path}`}
                        alt={movie?.original_title}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Grid>
          )}
        </Section>
      </Box>
    </Box>
  );
};

export default MoviesSwiper;
