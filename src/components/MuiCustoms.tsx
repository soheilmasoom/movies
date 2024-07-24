import React, {
  ReactNode,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
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
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  CircularProgressProps,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Slider,
  Snackbar,
  Typography,
  createStyles,
  createTheme,
  styled,
  useMediaQuery,
} from "@mui/material";
import { Movie } from "../pages/Movies";
import { commaSeperate } from "../main";
import { BsCardChecklist, BsHeartFill, BsX } from "react-icons/bs";
import { CheckAccount, CheckAccountType } from "../context/CheckAccount";
import { useNavigate } from "react-router-dom";
import { BiSolidLogOut } from "react-icons/bi";
import { Theme } from "@emotion/react";

// Types
interface SectionProps {
  backgroundColor?: string;
  paddingX?: boolean;
  children: ReactNode;
}
interface ArticleBoxProps {
  title: string;
  xs: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  children: ReactNode;
}
interface AddAlertProps {
  openSnack: boolean;
  setOpenSnack: () => void;
  cancelAdding: () => void;
}
interface AccountMenuProps {
  accountMenu: null | HTMLElement;
  setAccountMenu: () => void;
  open: boolean;
  username: string;
  openUserList: (list: "watchlist"|"favorite") => void;
}
interface AccProps {
  title: string;
  children: ReactNode;
}
interface SearchMovieOptionsProps {
  show: boolean;
  data: Movie[];
  isLoading: boolean;
  handleClose: () => void;
}
interface CastCardProps {
  item: any;
}

// Theme
const theme = createTheme();

//General Components
export const Section: React.FC<SectionProps> = ({
  paddingX = false,
  backgroundColor,
  children,
}) => {
  return (
    <Box
      sx={{
        backgroundColor,
        width: "100%",
        height: "auto",
        paddingTop: "2rem",
        paddingRight: paddingX ? "2rem" : "0",
        paddingBottom: "2rem",
        paddingLeft: paddingX ? "2rem" : "0",
      }}
    >
      <Grid container sx={{ gap: 5 }}>
        {children}
      </Grid>
    </Box>
  );
};

export const ArticleBox: React.FC<ArticleBoxProps> = ({
  title,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  children,
}) => {
  const defaultTheme = useContext<ThemeContext>(DefaultTheme)
    .theme as CustomTheme;

  return (
    <Grid
      item
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      xxl={xxl}
      sx={{
        position: "relative",
        border: `1px solid ${defaultTheme.palette.divider}`,
        borderRadius: "0.5rem",
        padding: "0.5rem",
        paddingTop: "1.5rem",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          background: defaultTheme.palette.background.default,
          paddingX: 1,
          position: "absolute",
          top: -18,
          left: 40,
        }}
      >
        {title}
      </Typography>

      {children}
    </Grid>
  );
};

export const Loader = styled(CircularProgress)({
  display: "block",
  margin: "3rem auto 1.75rem auto",
});

export const AddAlert: React.FC<AddAlertProps> = ({
  openSnack,
  setOpenSnack,
  cancelAdding,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 3
      );
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const action = (
    <Box sx={{ width: "2.5rem", height: "2.5rem", position: "relative" }}>
      <CircularProgress
        variant="determinate"
        value={progress}
        sx={{ position: "absolute" }}
      />
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)"}}
        onClick={cancelAdding}
      >
        <BsX />
      </IconButton>
    </Box>
  );

  return (
    <Snackbar
      open={openSnack}
      autoHideDuration={3000}
      onClose={setOpenSnack}
      message="Movie Added"
      sx={{
        "& .MuiSnackbarContent-message": {
          userSelect: "none",
        },
      }}
      action={
        action
      }
    />
  );
};

// Navbar Components
export const Nav = styled("nav")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 1.5rem",
  height: "3.5rem",
});

export const SearchMovieOptions: React.FC<SearchMovieOptionsProps> = ({
  show,
  data,
  isLoading,
  handleClose,
}) => {
  const navigate = useNavigate();
  const defaultTheme = useContext<ThemeContext>(DefaultTheme)
    .theme as CustomTheme;

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
      {isLoading && <Loader />}
      {!isLoading && data && data.length === 0 && (
        <Typography>Movie Not Found</Typography>
      )}
      {!isLoading &&
        data &&
        data.slice(0, 3).map((item) => {
          return (
            <ListItem
              key={item.id}
              onClick={() => {
                navigate(`/movies/${item.id}`);
                handleClose();
              }}
              sx={{
                display: "flex",
                gap: "1rem",
                cursor: "pointer",
                "&:hover": {
                  border: `1px solid ${defaultTheme.palette.divider}`,
                },
              }}
            >
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

export const AccountMenu: React.FC<AccountMenuProps> = ({
  accountMenu,
  setAccountMenu,
  open,
  username,
  openUserList
}) => {
  const { changeIsLogged } = useContext<CheckAccountType>(CheckAccount);

  return (
    <Menu
      anchorEl={accountMenu}
      id="account-menu"
      open={open}
      onClose={setAccountMenu}
      onClick={setAccountMenu}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          width: "12rem",
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&::before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Typography textAlign="center" marginY="0.5rem">
        {username}
      </Typography>
      <Divider />
      <MenuItem onClick={()=>{
        openUserList("watchlist")
        setAccountMenu()
      }}>
        <ListItemIcon>
          <BsCardChecklist />
        </ListItemIcon>
        Watchlist
      </MenuItem>
      <MenuItem onClick={()=>{
        openUserList("favorite")
        setAccountMenu()
      }}>
        <ListItemIcon>
          <BsHeartFill />
        </ListItemIcon>
        Favourite
      </MenuItem>
      <MenuItem
        onClick={() => {
          localStorage.removeItem("session_id");
          localStorage.removeItem("account_id");
          changeIsLogged(false);
          setAccountMenu();
        }}
      >
        <ListItemIcon>
          <BiSolidLogOut />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

// MovieCard
export const MCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.025)",
    boxShadow: theme?.shadows[5],
  },
  "& button": {
    position: "relative",
    "& img": {
      objectFit: "cover",
      height: 320,
    },
  },
  "& .MuiCardContent-root": {
    paddingBottom: 5,
    height: "min(100%, 9rem)"
  }
 
});

export const Rate = (
  props: CircularProgressProps & { value: number; position: string }
) => {
  const defaultTheme = useContext<ThemeContext>(DefaultTheme)
    .theme as CustomTheme;
  const darkMode = JSON.parse(
    localStorage.getItem("theme") as string
  )?.darkMode;
  const position = props.position;

  return (
    <Box
      component={"span"}
      sx={{
        position,
        bottom: 0,
        right: position === "absolute" ? 15 : 0,
        transform: position === "absolute" ? "translate(0, 50%)" : "none",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          backgroundColor:
            defaultTheme?.palette && darkMode
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
  const defaultTheme = useContext<ThemeContext>(DefaultTheme)
    .theme as CustomTheme;
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

// Info Components
export const CastCard: React.FC<CastCardProps> = ({ item }) => {
  const sm = useMediaQuery("(min-width:500px)");
  return (
    <Card
      sx={{
        position: "relative",
        width: sm ? "12rem" : "8rem",
        height: sm ? "18rem" : "12rem",
        borderRadius: "1rem",
      }}
    >
      <CardMedia
        component={"img"}
        image={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item?.profile_path}`}
      ></CardMedia>
      <CardContent
        sx={{
          position: "absolute",
          bottom: 0,
          width: sm ? "12rem" : "8rem",
          backgroundColor: theme.palette.grey[900],
          opacity: 0.8,
          padding: "1rem 0 !important",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography fontWeight={700} textAlign={"center"}>
          {item?.name}
        </Typography>
        <Typography variant="subtitle2" textAlign={"center"}>
          {item?.character}
        </Typography>
      </CardContent>
    </Card>
  );
};

export const RecomCard: React.FC<CastCardProps> = ({ item }) => {
  const sm = useMediaQuery("(min-width:500px)");

  return (
    <Card
      sx={{
        position: "relative",
        width: sm ? "12rem" : "8rem",
        height: sm ? "18rem" : "12rem",
        borderRadius: "1rem",
      }}
    >
      {/* Card Image */}
      <CardMedia
        component={"img"}
        image={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item?.poster_path}`}
      ></CardMedia>

      {/* Card Content */}
      <CardContent
        sx={{
          position: "absolute",
          bottom: 0,
          width: sm ? "12rem" : "8rem",
          height: sm ? "16rem" : "10rem",
          backgroundColor: theme.palette.grey[900],
          opacity: 0,
          padding: "1rem 0 !important",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          transition: "opacity 0.2s linear",
          "&:hover": {
            opacity: 0.8,
            transition: "opacity 0.2s linear",
          },
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          fontWeight={700}
          textAlign={"center"}
          margin="0.5rem"
          marginTop={2.5}
        >
          {item?.original_title}
        </Typography>

        {/* Release Date */}
        <Typography variant="subtitle2" textAlign={"center"}>
          {item?.release_date.split("-").join("/")}
        </Typography>

        {/* Popularity */}
        <Typography variant="subtitle2" textAlign={"center"}>
          {commaSeperate(Math.floor(item?.popularity * 1000))}
        </Typography>

        {/* Rate */}
        <Box sx={{ textAlign: "center" }}>
          <Chip label={`${Math.floor(item?.vote_average * 10)}%`} />
        </Box>

        {/* More Button */}
        <Box
          sx={{
            position: "absolute",
            bottom: "1.5rem",
            left: "50%",
            transform: "translate(-50%, 0)",
          }}
        >
          <Button variant="outlined" href={`/movies/${item?.id}`}>
            More
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

// User Options Style
export const userOption: Record<string, string|number> = createStyles({
  position: "absolute",
  width: "4rem",
  height: "8rem",
  top: "50%",
  left: "50%",
  opacity: 0,
  zIndex: 1000,
  transform: "translate(-50%,-50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly",
  background: (theme: Theme) => theme.palette.background.paper,
  borderRadius: "0.5rem",
  transition: "opacity 0.2s ease",
})

// Sign Page Components
export function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
