import { memo, useContext, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { BsList, BsSunFill, BsX } from "react-icons/bs";
import { CustomTheme, DefaultTheme, ThemeContext } from "../context/Theme";
import { useNavigate } from "react-router-dom";

// Components
import { AccountMenu, Nav } from "./MuiCustoms";
import SearchMovie from "./SearchMovie";
import Aside from "./Aside";
import { moviesAPI } from "../App";
import { useQuery } from "react-query";
import { CheckAccount, CheckAccountType } from "../context/CheckAccount";

// Types
interface Props {
  isNavScrolled: boolean;
}

const Navbar: React.FC<Props> = ({ isNavScrolled }) => {
  const [drawer, toggleDrawer] = useState<boolean>(false);
  const [accountMenu, setAccountMenu] = useState<null | HTMLElement>(null);
  const toggleAccountMenu = Boolean(accountMenu);
  const navigate = useNavigate();

  // Context Data
  const theme = useContext<ThemeContext>(DefaultTheme);
  const { isLogged, apiKey } =
    useContext<CheckAccountType>(CheckAccount);

  // Breakpoints
  const sm = useMediaQuery("(min-width:480px)");
  const md = useMediaQuery("(min-width:768px)");
  const lg = useMediaQuery("(min-width:992px)");
  const showMenuSearch = useMediaQuery("(max-width:768px)");
  const showUserButton = useMediaQuery("(max-width:480px)");

  // NavScrolled Styles
  const styles = {
    position: "fixed",
    zIndex: "1009",
    width: "100%",
    background: (theme.theme as CustomTheme)?.palette.background.default,
    borderBottom: `1px solid ${(theme.theme as CustomTheme)?.palette.divider}`,
    boxShadow: `0 10px 10px ${
      (theme.theme as CustomTheme)?.palette.background.default
    },
     0 5px 5px ${
       (theme.theme as CustomTheme)?.palette.background.default
     } !important`,
    transition: "position 0.2s ease, background 0.2s ease",
  };

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
      return res?.data;
    },
    enabled: isLogged,
  });

  // console.log(accountDetail)

  return (
    <>
      {/* Header */}
      <Nav sx={!isNavScrolled ? {} : { ...styles }}>
        {/* Webpage Title */}
        <Button
          disableRipple
          sx={{
            fontSize: "1.75rem",
            fontWeight: 700,
            background: "none !important",
            color: (theme.theme as CustomTheme).palette.text.primary,
          }}
          onClick={() => navigate("/")}
        >
          Movies
        </Button>

        {/* Search Box */}
        {md && <SearchMovie width="22rem" />}

        {/* Nav Buttons */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Account Setting */}
          {isLogged && accountDetail && (
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
                  src={accountDetail.avatar.tmdb.avatar_path}
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
            </Tooltip>
          )}
          <AccountMenu
            accountMenu={accountMenu}
            setAccountMenu={()=>setAccountMenu(null)}
            open={toggleAccountMenu}
            username={accountDetail && accountDetail.username}
          />

          {/* Signing Buttons */}
          {sm && !isLogged && (
            <>
              <Button onClick={() => navigate("/login")}>Login</Button>
              <Button onClick={() => navigate("/signup")}>Sign Up</Button>
            </>
          )}

          {/* Theme Toggle */}
          <Checkbox
            {...label}
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
                style={{ color: "#121212", transition: "all 0.3s ease" }}
              />
            }
            checkedIcon={
              <BsSunFill
                style={{ color: "#fff", transition: "all 0.3s ease" }}
              />
            }
            sx={{ marginX: 0.5, display: !lg ? "none" : "inline-block" }}
          />

          {/* Nav Menu Toggle */}
          {!lg && (
            <Button>
              <BsList size="1.5rem" onClick={() => toggleDrawer(true)} />
            </Button>
          )}
        </Box>
      </Nav>

      <Divider sx={{ width: "95%", marginX: "auto" }} />

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
            sx={{ marginLeft: "-0.5rem" }}
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
                style={{ color: "#121212", transition: "all 0.3s ease" }}
              />
            }
            checkedIcon={
              <BsSunFill
                size={"1.75rem"}
                style={{ color: "#fff", transition: "all 0.3s ease" }}
              />
            }
          />
          <IconButton
            disableRipple
            onClick={() => toggleDrawer(false)}
            sx={{ padding: 0, marginRight: "-0.5rem" }}
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
    </>
  );
};

export default memo(Navbar);
