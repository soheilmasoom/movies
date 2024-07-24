import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItem,
  ListItemText,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { forwardRef, memo, useContext, useMemo } from "react";
import { BsTrash, BsX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { CustomTheme, DefaultTheme, ThemeContext } from "../context/Theme";
import { AddAlert } from "./MuiCustoms";
import { useUserlist } from "../hooks/useUserlist";
import { List } from "../context/List";

// Types
interface UserListProps {
  openUserList: boolean | "watchlist" | "favorite";
  closeUserList: () => void;
}

// Dialog Effect
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const UserList: React.FC<UserListProps> = ({ openUserList, closeUserList }) => {
  const { watchlist, favlist, deleteFromFavContext, deleteFromWatchContext } =
    useContext(List);

  const navigate = useNavigate();
  const defaultTheme = useContext<ThemeContext>(DefaultTheme)
    .theme as CustomTheme;

  // List Data
  const data = useMemo(() => {
    if (openUserList === "watchlist" && watchlist.length !== 0) {
      return watchlist;
    }
    if (openUserList === "favorite" && favlist.length !== 0) {
      return favlist;
    }
  }, [openUserList, watchlist, favlist]);

  // Userlist Hook
  const { RemoveFromList, cancelListUpdate, openSnack, setOpenSnack } =
    useUserlist();

  return (
    <>
      <Dialog
        open={Boolean(openUserList)}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeUserList}
        aria-describedby={`${openUserList}-list-description`}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id={`${openUserList}-list-title`}>
          {openUserList}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={closeUserList}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <BsX />
        </IconButton>
        <DialogContent
          dividers
          sx={{ height: "45rem", width: "30rem", overflowY: "scroll" }}
        >
          {data &&
            data.map((item: any) => {
              return (
                <ListItem
                  key={item.id}
                  sx={{
                    display: "flex",
                    gap: "1rem",
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
                    onClick={() => {
                      navigate(`/movies/${item.id}`);
                      closeUserList();
                    }}
                    style={{ height: "6rem", cursor: "pointer" }}
                  />
                  <ListItemText
                    primary={item.original_title}
                    secondary={`Release: ${item.release_date}`}
                  ></ListItemText>
                  <IconButton
                    disableRipple
                    onClick={() => {
                      RemoveFromList(item.id, openUserList as string);
                      openUserList === "favorite" && deleteFromFavContext(item);
                      openUserList === "watchlist" &&
                        deleteFromWatchContext(item);
                    }}
                  >
                    <BsTrash size="1.5rem" />
                  </IconButton>
                </ListItem>
              );
            })}
        </DialogContent>
      </Dialog>

      {/* Snackbar */}
      <AddAlert
        openSnack={openSnack}
        setOpenSnack={() => setOpenSnack(false)}
        cancelAdding={() => {
          cancelListUpdate.current && cancelListUpdate.current();
        }}
      />
    </>
  );
};

export default memo(UserList);
