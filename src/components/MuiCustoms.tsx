import React, { ReactNode, SyntheticEvent, useContext, useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { CustomTheme, DefaultTheme, ThemeContext } from "../context/Theme";
import {
  Accordion,
  AccordionDetails,
  AccordionDetailsProps,
  AccordionProps,
  AccordionSummary,
  AccordionSummaryProps,
  Box,
  Card,
  Chip,
  CircularProgress,
  CircularProgressProps,
  Collapse,
  Divider,
  ListItem,
  ListItemText,
  Slider,
  Typography,
  createTheme,
  styled,
} from "@mui/material";
import { Movie } from "./Movies";

// Types
interface AccProps {
  title: string;
  children: ReactNode;
}
interface SearchMovieOptionsProps {
  show: boolean;
  data: Movie[];
}

// Theme
const theme = createTheme();

// Navbar Components
export const Nav = styled('nav')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 1.5rem',
  height: '3.5rem'
})

export const SearchMovieOptions: React.FC<SearchMovieOptionsProps> = ({
  show,
  data,
}) => {
  const defaultTheme = useContext<ThemeContext>(DefaultTheme).theme as CustomTheme;

  const OptionsList = styled(Collapse)({
    background: defaultTheme.palette.background.paper,
    position: "absolute",
    zIndex: "1005",
    width: "inherit",
    maxWidth: "442px",
    height: "auto",
    maxHeight: "20rem",
    borderRadius: "1.5rem",
    marginTop: "0.125rem",
    marginRight: "1rem",
    padding: "0.75rem",
  });
  

  return (
    <OptionsList in={show}>
      {(data && data.length === 0) && <Typography>Movie Not Found</Typography>}
      {data &&
        data.slice(0, 3).map((item) => {
          return (
            <ListItem key={item.id} sx={{ display: "flex", gap: "1rem" }}>
              <img
                src={
                  "https://image.tmdb.org/t/p/w600_and_h900_bestv2/" +
                  item.poster_path
                }
                style={{ height: "4rem" }}
              />
              <ListItemText
                primary={item.original_title}
                secondary={`Release: ${item.release_date}`}
              ></ListItemText>
            </ListItem>
          );        
        })}
    </OptionsList>
  );
};

// MoviesList Components
export const Loader = styled(CircularProgress)({
  display: "block",
  margin: "3rem auto 1.75rem auto",
});

// MovieCard
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
  const defaultTheme = useContext<ThemeContext>(DefaultTheme).theme as CustomTheme;
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
            (defaultTheme?.palette) && darkMode
              ? defaultTheme?.palette.background.default
              : "#fff",
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
            sx={{ fontWeight: "900" }}
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
  zIndex: 1,
  padding: 0,
  height: "auto",
  borderRadius: "25%",
  background: theme.palette.error.dark,
  color: theme.palette.error.contrastText,

  "& span": {
    padding: 5,
  },
});

export const GenreLabel = styled(Chip)({
  color: theme.palette.grey[600],
  height: 26,
});

// Aside Components
export const Accord: React.FC<AccProps> = ({ title, children }) => {
  const defaultTheme = useContext<ThemeContext>(DefaultTheme).theme as CustomTheme;
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleExpand =
    (panel: string) => (_: SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const MuiAccordion = styled((props: AccordionProps) => (
    <Accordion disableGutters elevation={0} {...props} />
  ))({
    border: `2.5px solid ${theme.palette.divider}`,
    borderRadius: "0.5rem !important",
    width: "100%",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&::before": {
      display: "none",
    },
  });

  const MuiAccordionSummary = styled((props: AccordionSummaryProps) => (
    <AccordionSummary {...props} />
  ))({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });

  const MuiAccordionDetails = styled((props: AccordionDetailsProps) => (
    <AccordionDetails {...props} />
  ))({
    backgroundColor: defaultTheme?.palette.background.default,
    boxShadow:
      theme.palette.mode === "light"
        ? "inset 0 0 6px rgba(65, 65, 65, 0.25)"
        : "inset 0 0 6px rgba(0,0,0,0.25)",
    borderTop: "1px solid rgba(0, 0, 0, .125)",
    borderRadius: "0.5rem",
    display: "flex",
    flexDirection: "column",
    gap: 15,
    padding: theme.spacing(2),
  });

  return (
    <MuiAccordion expanded={expanded === title} onChange={handleExpand(title)}>
      <MuiAccordionSummary
        aria-controls={`${title}-content`}
        id={`${title}-header`}
      >
        <Typography>{title}</Typography>
        {expanded ? <MdExpandLess /> : <MdExpandMore />}
      </MuiAccordionSummary>
      <MuiAccordionDetails>{children}</MuiAccordionDetails>
    </MuiAccordion>
  );
};

export const Sidebar = styled(Box)({
  width: "100%",
  height: "90vh",
});

export const OptionsDivider = styled(Divider)({
  span: {
    color: theme.palette.grey[800],
    fontSize: "0.95rem",
  },
});

// DateFilterItem Components
export const DateBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 5,
  ".MuiInputBase-root": {
    height: "2.5rem",
    maxWidth: "160px",
    "& input, input::placeholder": {
      fontSize: "0.8rem",
    },
  },
});

// RateFilterItem Components
export const MuiSlider = styled(Slider)({
  color: theme.palette.primary.dark,
  height: 6,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 10,
    background: "unset",
    padding: 0,
    width: 20,
    height: 20,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: theme.palette.primary.dark,
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -75%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

