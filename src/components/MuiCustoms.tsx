import React, {
  ReactNode,
  SyntheticEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import {
  CustomTheme,
  themeBorder,
  themeGradient,
  themeRadius,
  themeShadows,
  themeTransition,
} from "../context/Theme";
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
  styled,
  useMediaQuery,
} from "@mui/material";
import { Movie } from "../pages/Movies";
import { commaSeperate } from "../main";
import { BsCardChecklist, BsHeartFill, BsX } from "react-icons/bs";
import { CheckAccount, CheckAccountType } from "../context/CheckAccount";
import { useNavigate } from "react-router-dom";
import { BiSolidLogOut } from "react-icons/bi";
import { Variant } from "@mui/material/styles/createTypography";

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
interface GradientProps {
  isNavScrolled: boolean;
}
interface AddAlertProps {
  openSnack: boolean;
  setOpenSnack: () => void;
  cancelAdding: () => void;
}
interface TextSlideProps {
  width: string;
  variant?: Variant;
  fontWeight?: number;
  textAlign?: "left" | "right" | "center";
  sx?: Record<string, any>;
  children: string;
}
interface AccountMenuProps {
  accountMenu: null | HTMLElement;
  setAccountMenu: () => void;
  open: boolean;
  username: string;
  openUserList: (list: "watchlist" | "favorite") => void;
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

// General Styles
export const getCenter = {
  static: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

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
  const breakpoint = useMediaQuery("(min-width:480px)");

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
        border: themeBorder[0],
        borderColor: "divider",
        borderRadius: themeRadius[0],
        minHeight: "5rem",
        padding: "0.5rem",
        paddingTop: "1.5rem",
        boxShadow: (theme) =>
          theme.palette.mode === "light" ? themeShadows[2] : themeShadows[3],
      }}
    >
      {/* Article Title */}
      <Typography
        variant={breakpoint ? "h5" : "h6"}
        sx={{
          background: (theme) => theme.palette.background.default,
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

export const Gradient: React.FC<GradientProps> = ({ isNavScrolled }) => {
  return (
    <Box
      sx={{
        position: isNavScrolled ? "fixed" : "absolute",
        zIndex: -1,
        bottom: 0,
        width: "100%",
        height: "calc(100% - 3.5rem)",
        background: (theme) =>
          theme.palette.mode === "light"
            ? themeGradient.back.light
            : themeGradient.back.dark,
      }}
    >
      {/* Divider */}
      {!isNavScrolled && (
        <Divider
          sx={{
            width: (theme) => (theme.palette.mode === "dark" ? "95%" : "100%"),
            marginX: "auto",
          }}
        />
      )}
    </Box>
  );
};

export const Loader = styled(CircularProgress)({
  display: "block",
  margin: "3rem auto 1.75rem auto",
});

export const TextSlide: React.FC<TextSlideProps> = ({
  width,
  variant,
  fontWeight,
  textAlign,
  sx,
  children,
}) => {
  const text = useRef<HTMLParagraphElement | null>(null);
  const [isOver, setIsOver] = useState<boolean>();

  // Check Overflow
  useEffect(() => {
    const overflow =
      text.current && text.current?.offsetWidth < text.current?.scrollWidth;

    overflow ? setIsOver(true) : setIsOver(false);
  }, []);

  return (
    <Box
      ref={text}
      sx={{
        ...sx,
        width,
        overflow: "hidden",
      }}
    >
      <Typography
        variant={variant}
        fontWeight={fontWeight}
        textAlign={textAlign}
        sx={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          transform: "translateX(0)",
          "&:hover": {
            animation: isOver ? "textSlide 20s linear infinite" : "none",
          },
          "@keyframes textSlide": {
            form: {
              transform: "translateX(0)",
            },
            to: {
              transform: "translateX(-100%)",
            },
          },
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export const AddAlert: React.FC<AddAlertProps> = ({
  openSnack,
  setOpenSnack,
  cancelAdding,
}) => {
  const [progress, setProgress] = useState(0);

  // Timer Interval
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

  // Alert Actions
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
        sx={{
          ...getCenter.static,
        }}
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
      action={action}
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

  // Options List Style
  const OptionsList = styled(Collapse)(({ theme }) => ({
    background:
      theme.palette.mode === "light"
        ? theme.palette.grey[400]
        : theme.palette.background.paper,
    zIndex: theme.zIndex.mobileStepper + 5,
    position: "absolute",
    width: "inherit",
    maxWidth: "442px",
    height: "auto",
    maxHeight: "20rem",
    borderRadius: "1.5rem",
    marginTop: "0.125rem",
    marginRight: "1rem",
    padding: "0.75rem",
  }));

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
                  border: themeBorder[0],
                  borderRadius: themeRadius[0],
                  borderColor: "divider",
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
  openUserList,
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
      <MenuItem
        onClick={() => {
          openUserList("watchlist");
          setAccountMenu();
        }}
      >
        <ListItemIcon>
          <BsCardChecklist />
        </ListItemIcon>
        Watchlist
      </MenuItem>
      <MenuItem
        onClick={() => {
          openUserList("favorite");
          setAccountMenu();
        }}
      >
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
export const MCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backdropFilter: "blue(5px)",
  boxShadow: theme.palette.mode === "light" ? themeShadows[0] : "none",
  transition: themeTransition("all", "ease"),
  "&:hover": {
    transform: "scale(1.025)",
    boxShadow: theme.palette.mode === "light" && themeShadows[1],
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
    height: "min(100%, 9rem)",
  },
}));

export const Rate = (
  props: CircularProgressProps & { value: number; position: string }
) => {
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
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[800]
              : "background.default",
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
            ...getCenter.flex,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
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
  background: "error.dark",
  color: "error.contrastText",

  "& span": {
    padding: 5,
  },
});

export const GenreLabel = styled(Chip)(({ theme }) => ({
  color: theme.palette.grey[600],
  height: 26,
}));

// Aside Components
export const Accord: React.FC<AccProps> = ({ title, children }) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleExpand =
    (panel: string) => (_: SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const MuiAccordion = styled((props: AccordionProps) => (
    <Accordion disableGutters elevation={0} {...props} />
  ))(({ theme }) => ({
    border: themeBorder[1],
    borderColor: theme.palette.divider,
    borderRadius: `${themeRadius[0]} !important`,
    width: "100%",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&::before": {
      display: "none",
    },
  }));

  const MuiAccordionSummary = styled((props: AccordionSummaryProps) => (
    <AccordionSummary {...props} />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(0,0,0, .03)"
        : "rgba(255,255,255,.05)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  }));

  const MuiAccordionDetails = styled((props: AccordionDetailsProps) => (
    <AccordionDetails {...props} />
  ))(({ theme }) => ({
    backgroundColor: "background.default",
    boxShadow:
      theme.palette.mode === "light" ? themeShadows[2] : themeShadows[3],
    borderTop: themeBorder[0],
    borderRadius: themeRadius[0],
    borderColor: "rgba(0, 0, 0, 0.125)",
    display: "flex",
    flexDirection: "column",
    gap: 15,
    padding: theme.spacing(2),
  }));

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

export const OptionsDivider = styled(Divider)(({ theme }) => ({
  span: {
    color: theme.palette.grey[800],
    fontSize: "0.95rem",
  },
}));

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
export const MuiSlider = styled(Slider)(({ theme }) => ({
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
}));

// Info Components
export const CastCard: React.FC<CastCardProps> = ({ item }) => {
  const sm = useMediaQuery("(min-width:500px)");

  return (
    <Card
      sx={{
        position: "relative",
        width: sm ? "12rem" : "8rem",
        height: sm ? "18rem" : "12rem",
        borderRadius: themeRadius[1],
      }}
    >
      <CardMedia
        component={"img"}
        image={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item?.profile_path}`}
      ></CardMedia>
      <CardContent
        sx={{
          backgroundColor: (theme) => theme.palette.grey[900],
          color: (theme) => theme.palette.grey[200],
          position: "absolute",
          bottom: 0,
          width: sm ? "12rem" : "8rem",
          opacity: 0.8,
          padding: "1rem 0 !important",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextSlide width="min(100%, 12rem)" fontWeight={700} textAlign="center">
          {item?.name}
        </TextSlide>
        <TextSlide
          width="min(100%, 12rem)"
          variant="subtitle2"
          textAlign="center"
        >
          {item?.character}
        </TextSlide>
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
        borderRadius: themeRadius[1],
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
          backgroundColor: (theme) => theme.palette.grey[900],
          color: (theme) => theme.palette.grey[200],
          position: "absolute",
          bottom: 0,
          width: sm ? "12rem" : "8rem",
          height: sm ? "16rem" : "10rem",
          opacity: 0,
          padding: "1rem 0 !important",
          transition: themeTransition("opacity"),
          "&:hover": {
            opacity: 0.9,
            transition: themeTransition("opacity"),
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: sm ? "75%" : "65%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Title */}
          <Typography
            variant="h6"
            fontWeight={700}
            textAlign="center"
            margin="0.5rem"
            sx={{
              textOverflow: "ellipsis",
            }}
          >
            {item?.original_title}
          </Typography>

          {sm && (
            <>
              {/* Release Date */}
              <Typography variant="subtitle2" textAlign={"center"}>
                {item?.release_date.split("-").join("/")}
              </Typography>

              {/* Popularity */}
              <Typography variant="subtitle2" textAlign={"center"}>
                {`${commaSeperate(Math.floor(item?.popularity * 1000))} votes`}
              </Typography>

              {/* Rate */}
              <Box sx={{ textAlign: "center" }}>
                <Chip
                  label={`${Math.floor(item?.vote_average * 10)}%`}
                  variant="outlined"
                  color="primary"
                />
              </Box>
            </>
          )}

          {/* More Button */}
          <Box
            sx={{
              position: "absolute",
              bottom: "1.5rem",
              left: "50%",
              transform: "translate(-50%, 0)",
            }}
          >
            <Button variant="contained" href={`/movies/${item?.id}`}>
              More
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// User Options Style
export const userOption: Record<string, string | number> = createStyles({
  background: (theme: CustomTheme) => theme.palette.background.paper,
  zIndex: (theme: CustomTheme) => theme.zIndex.mobileStepper,
  ...getCenter.static,
  width: "4rem",
  height: "8rem",
  opacity: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly",
  borderRadius: themeRadius[0],
  transition: themeTransition("opacity"),
});

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
      <Link color="inherit" href="/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
