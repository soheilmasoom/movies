import { memo, useContext, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  createStyles,
  Divider,
  Drawer,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { BsList, BsSunFill, BsX } from "react-icons/bs";
import {
  CustomTheme,
  DefaultTheme,
  themeBorder,
  ThemeContext,
  themeGradient,
  themeTransition,
} from "../context/Theme";
import { CheckAccount, CheckAccountType } from "../context/CheckAccount";
import { moviesAPI } from "../App";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

// Components
import { AccountMenu, getCenter, Nav } from "./MuiCustoms";
import SearchMovie from "./SearchMovie";
import Aside from "./Aside";
import UserList from "./UserList";

// Types
interface Props {
  isNavScrolled: boolean;
}

const Navbar: React.FC<Props> = ({ isNavScrolled }) => {
  const [drawer, toggleDrawer] = useState<boolean>(false);
  const [accountMenu, setAccountMenu] = useState<null | HTMLElement>(null);
  const [openUserList, setOpenUserList] = useState<
    boolean | "watchlist" | "favorite"
  >(false);
  const toggleAccountMenu = Boolean(accountMenu);
  const navigate = useNavigate();

  // Mode Toggle Context
  const { checkMode } = useContext<ThemeContext>(DefaultTheme);

  // Context Data
  const { isLogged, apiKey } = useContext<CheckAccountType>(CheckAccount);

  // Breakpoints
  const sm = useMediaQuery("(min-width:480px)");
  const md = useMediaQuery("(min-width:768px)");
  const lg = useMediaQuery("(min-width:992px)");
  const showMenuSearch = useMediaQuery("(max-width:768px)");
  const showUserButton = useMediaQuery("(max-width:480px)");

  // NavScrolled Styles
  const styles = createStyles({
    "@keyframes showNav": {
      "0%": {
        height: "0"
      },
      "100%": {
        height: "3.5rem"
      }
    },
    background: (theme: CustomTheme) => theme.palette.secondary.main,
    zIndex: (theme: CustomTheme) => theme.zIndex.mobileStepper,
    position: "fixed",
    width: "100%",
    top: 0,
    borderBottom: themeBorder[0],
    borderColor: "divider",
    transition: `${themeTransition("position", "ease")}, ${themeTransition(
      "background",
      "ease"
    )}`,
    animation: "showNav 0.1s linear",
  });

  // Mui Props
  const label = { inputProps: { "aria-label": "Darkmode Checkbox" } };

  // isLogged Fn
  const session = useMemo(() => {
    return localStorage.getItem("session_id");
  }, [isLogged]);

  // Account Detail API
  const { data: accountDetail } = useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      const res = await moviesAPI.get("3/account", {
        params: {
          api_key: apiKey,
          session_id: session,
        },
      });
      localStorage.setItem("account_id", res.data.id);
      return res?.data;
    },
    enabled: isLogged,
  });

  return (
    <>
      {/* Header */}
      <Nav
        sx={
          !isNavScrolled
            ? {
                background: (theme) => theme.palette.secondary.main,
              }
            : styles
        }
      >
        {/* Webpage Title */}
        <Button
          disableRipple
          sx={{
            fontSize: "1.75rem",
            fontWeight: 700,
            background: (theme) =>
              theme.palette.mode === "dark"
                ? themeGradient.title.dark
                : themeGradient.title.light,
            backgroundClip: "text",
            color: "transparent",
          }}
          onClick={() => navigate("/")}
        >
          Movies
        </Button>

        {/* Search Box */}
        {md && <SearchMovie width="22rem" />}

        {/* Nav Buttons */}
        <Box sx={getCenter.flex}>
          {/* Account Setting */}
          {isLogged && (
            <Tooltip title="Account settings">
              <IconButton
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  setAccountMenu(event.currentTarget);
                }}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={toggleAccountMenu ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={toggleAccountMenu ? "true" : undefined}
              >
                <Avatar
                  src={accountDetail && accountDetail.avatar.tmdb.avatar_path}
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: "secondary.dark",
                  }}
                />
              </IconButton>
            </Tooltip>
          )}
          <AccountMenu
            accountMenu={accountMenu}
            setAccountMenu={() => setAccountMenu(null)}
            open={toggleAccountMenu}
            username={accountDetail && accountDetail.username}
            openUserList={(list: "watchlist" | "favorite") =>
              setOpenUserList(list)
            }
          />

          {/* Signing Buttons */}
          {sm && !isLogged && (
            <>
              <Button
                sx={{
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[400]
                      : theme.palette.secondary.dark,
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                sx={{
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[400]
                      : theme.palette.secondary.dark,
                }}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </>
          )}

          {/* Theme Toggle */}
          <Checkbox
            {...label}
            checked={
              JSON.parse(localStorage.getItem("theme") as string)?.darkMode
            }
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              checkMode(event.target.checked);
              localStorage.setItem(
                "theme",
                JSON.stringify({ darkMode: event.target.checked })
              );
            }}
            icon={
              <BsSunFill
                style={{
                  transition: themeTransition("all", "ease"),
                  fontSize: "1.5rem",
                }}
              />
            }
            checkedIcon={
              <BsSunFill
                style={{
                  transition: themeTransition("all", "ease"),
                  fontSize: "1.5rem",
                }}
              />
            }
            sx={{
              display: !lg ? "none" : "inline-block",
              lineHeight: 0,
              "& svg": {
                color: (theme) => theme.palette.secondary.dark,
                transition: themeTransition("color", "ease"),
              },
              "&:hover svg": {
                color: (theme) =>
                  theme.palette.getContrastText(
                    theme.palette.background.default
                  ),
              },
            }}
          />

          {/* Nav Menu Toggle */}
          {!lg && (
            <Button
              sx={{
                color: (theme) => theme.palette.secondary.dark,
                paddingX: "0.5rem",
                transition: themeTransition("transform"),
                minWidth: 0,
                "&:hover": {
                  transform: "scale(1.125)",
                },
              }}
            >
              <BsList size="1.5rem" onClick={() => toggleDrawer(true)} />
            </Button>
          )}
        </Box>
      </Nav>

      {/* Navbar Menu */}
      <Drawer
        open={drawer}
        onClose={() => toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: md ? "30vw" : sm ? "50vw" : "100vw",
            padding: "0 1rem",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          },
        }}
      >
        {/* Menu Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Checkbox
            {...label}
            sx={{
              marginLeft: "-0.5rem",
              transition: themeTransition("opacity", "ease"),
              "& svg": {
                color: (theme) => theme.palette.secondary.dark,
                transition: themeTransition("color", "ease"),
              },
              "&:hover svg": {
                color: (theme) =>
                  theme.palette.getContrastText(
                    theme.palette.background.default
                  ),
              },
            }}
            checked={
              JSON.parse(localStorage.getItem("theme") as string)?.darkMode
            }
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              theme.checkMode(event.target.checked);
              localStorage.setItem(
                "theme",
                JSON.stringify({ darkMode: event.target.checked })
              );
            }}
            icon={
              <BsSunFill
                size={"1.75rem"}
                style={{
                  transition: themeTransition("all", "ease"),
                }}
              />
            }
            checkedIcon={
              <BsSunFill
                size={"1.75rem"}
                style={{
                  transition: themeTransition("all", "ease"),
                }}
              />
            }
          />
          <IconButton
            disableRipple
            onClick={() => toggleDrawer(false)}
            sx={{
              padding: 0,
              marginRight: "-0.5rem",
              "& svg": {
                color: (theme) => theme.palette.secondary.dark,
                transition: themeTransition("color", "ease"),
              },
              "&:hover svg": {
                color: (theme) => theme.palette.error.main,
              },
            }}
          >
            <BsX size="2.5rem" />
          </IconButton>
        </Box>

        {/* Menu Search */}
        {showMenuSearch && <SearchMovie width="auto" />}

        {/* Menu Login */}
        {showUserButton && (
          <>
            <Divider textAlign="left" sx={{ fontSize: "1.5rem" }}>
              User Account
            </Divider>
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Button href="#" variant="outlined" sx={{ flex: "1 1 50%" }}>
                Login
              </Button>
              <Button href="#" variant="outlined" sx={{ flex: "1 1 50%" }}>
                Sign Up
              </Button>
            </Box>
          </>
        )}

        {/* Menu FilterOptions */}
        <Aside />
      </Drawer>

      {/* Dashboard & Watchlist */}
      <UserList
        openUserList={openUserList}
        closeUserList={() => setOpenUserList(false)}
      />
    </>
  );
};

export default memo(Navbar);
