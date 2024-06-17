import { Card, CircularProgress, createTheme, styled } from "@mui/material";

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
});
