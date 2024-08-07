import { useMutation } from "react-query";
import { moviesAPI } from "../App";
import { useMemo, useRef, useState } from "react";

// Types
interface Data {
  media_type: "movie";
  media_id: number;
  watchlist?: boolean;
  favorite?: boolean;
}
interface UserlistParams {
  api_key: string
  Authorization: string
}

export function useUserlist({api_key, Authorization}: UserlistParams) {
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const cancelListUpdate = useRef<() => void | null>();

  const accountID = useMemo(() => {
    return localStorage.getItem("account_id");
  }, []);

  // UserList API Req
  const { mutate } = useMutation({
    mutationKey: ["addList"],
    mutationFn: async (params: [Data, string]) => {
      return await moviesAPI.post(
        `3/account/${accountID}/${params[1]}`,
        params[0],
        {
          params: {
            api_key,
          },
          headers: {
            Authorization,
          } 
        }
      );
    },
  });

  // AddToList Fn
  const addToList = (id: number, list: string) => {
    const addTimeOut = setTimeout(
      () => {
        mutate([
          {
            media_type: "movie",
            media_id: id,
            watchlist: list === "watchlist" && true,
            favorite: list === "favorite" && true,
          },
          list,
        ]);
      },
      list === "watchlist" ? 3000 : 0
    );
    const cancelAddTimeOut = () => {
      clearTimeout(addTimeOut);
    };

    cancelListUpdate.current = cancelAddTimeOut;
    setOpenSnack(list === "watchlist" ? true : false);
  };

  // RemoveFromList Fn
  const RemoveFromList = (id: number, list: string) => {
    const addTimeOut = setTimeout(
      () => {
        mutate([
          {
            media_type: "movie",
            media_id: id,
            watchlist: list === "watchlist" && false,
            favorite: list === "favorite" && false,
          },
          list,
        ]);
      },
      list === "watchlist" ? 3000 : 0
    );
    const cancelAddTimeOut = () => {
      clearTimeout(addTimeOut);
    };

    cancelListUpdate.current = cancelAddTimeOut;
    setOpenSnack(list === "watchlist" ? true : false);
  };

  return {
    addToList,
    RemoveFromList,
    cancelListUpdate,
    openSnack,
    setOpenSnack,
  };
}
