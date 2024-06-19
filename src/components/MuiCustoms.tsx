import {
  Box,
  Card,
  Chip,
  CircularProgress,
  CircularProgressProps,
  Palette,
  Typography,
  createTheme,
  styled,
} from "@mui/material";
import { useContext } from "react";
import { DefaultTheme } from "../context/Theme";

// Theme
const theme = createTheme();

// Custom Components
export const Loader = styled(CircularProgress)({
  display: "block",
  margin: "3rem auto 1.75rem auto",
});

export const MCard = styled(Card)({
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.025)",
    boxShadow: theme?.shadows[5],
  },
  "& button": {
    position: "relative",
    "& img": {
      objectFit: "cover",
      height: 220,
      // position: 'relative',
      // '&::after': {
      //     content: '""',
      //     width: 100 ,
      //     height: 100,
      //     position: 'absolute',
      //     top: 0,
      //     zIndex: 1000,
      //     display: 'block'
      // }
    },
  },
  "& .MuiCardContent-root": {
    paddingBottom: 5,
  },
});

export const Rate = (props: CircularProgressProps & { value: number }) => {
  const rateTheme = useContext(DefaultTheme)?.theme;
  const darkMode = JSON.parse(
    localStorage.getItem("theme") as string
  )?.darkMode;

  return (
    <Box
      component={"span"}
      sx={{
        position: "absolute",
        bottom: 0,
        right: 15,
        transform: "translate(0, 50%)",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          backgroundColor:
            (rateTheme.palette as Palette) && darkMode ? 
            rateTheme?.palette.background.default : '#fff',
          borderRadius: "50%",
        }}
      >
        <CircularProgress
          variant="determinate"
          color={
            props.value <= 60
              ? "error"
              : props.value > 60 && props.value < 90
              ? "warning"
              : "info"
          }
          {...props}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color={
              props.value <= 60
                ? "#f44336"
                : props.value > 60 && props.value < 90
                ? "#ffa726"
                : "#29b6f6"
            }
            sx={{fontWeight: '900'}}
          >{`${Math.round(props.value)}`}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const Adult = styled(Chip)({
  position: "absolute",
  top: 0,
  right: 0,
  // transform: "translate(0, 50%)",
  zIndex: 1,
  padding: 0,
  height: "auto",
  borderRadius: '25%',
  background: theme.palette.error.dark,
  color: theme.palette.error.contrastText,

  "& span": {
    padding: 5,
  }
});

export const GenreLabel = styled(Chip)({
  color: theme.palette.grey[600],
  height: 26,
})

export const Sidebar = styled(Box)({
  width: '16rem',
  // border: `2px solid`,
  // borderColor: theme.palette.grey[700],
  // borderRadius: '8px',
  position: 'fixed',
})
