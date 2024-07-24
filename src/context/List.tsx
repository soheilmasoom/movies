import React, { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { moviesAPI } from "../App";

// Types
export interface ListTypes {
  watchlist: any[];
  favlist: any[];
  addToWatchContext: (movie: any) => void;
  deleteFromWatchContext: (movie: any) => void;
  addToFavContext: (movie: any) => void;
  deleteFromFavContext: (movie: any) => void;
}
interface ListProviderProps {
  children: ReactNode;
}

// Context
export const List = createContext<ListTypes>({
  watchlist: [],
  favlist: [],
  addToWatchContext: () => {},
  deleteFromWatchContext: () => {},
  addToFavContext: () => {},
  deleteFromFavContext: () => {},
});

// Context Provider
export const ListProvider: React.FC<ListProviderProps> = ({ children }) => {
  const accountID = useMemo(() => {
    return localStorage.getItem("account_id");
  }, []);

  const { data: watchData } = useQuery({
    queryKey: ["watchlist"],
    queryFn: async () => {
      const res = await moviesAPI.get(
        `/3/account/${accountID}/watchlist/movies`
      );
      return res?.data.results;
    },
  });  

  const { data: favData } = useQuery({
    queryKey: ["favlist"],
    queryFn: async () => {
      const res = await moviesAPI.get(
        `/3/account/${accountID}/favorite/movies`
      );
      return res?.data.results;
    },
  });

  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [favlist, setFavlist] = useState<any[]>([]);

  useEffect(()=>{
    if (watchData) {
        setWatchlist(watchData)
    }
    if (favData) {
        setFavlist(favData)
    }
  },[watchData, favData])
  

  const addToWatchContext = (movie: any) => {
    const isFound = watchlist.find((item: any) => item.id === movie.id);
    if (!isFound) {
      setWatchlist([...watchlist, movie]);
    } else {
      return;
    }
  };

  const deleteFromWatchContext = (movie: any) => {
    const newWatchlist = watchlist.filter((item: any) => item.id !== movie.id);
    setWatchlist(newWatchlist);
  };

  const addToFavContext = (movie: any) => {
    const isFound = favlist.find((item: any) => item.id === movie.id);
    if (!isFound) {
      setFavlist([...favlist, movie]);
    } else {
      return;
    }
  };

  const deleteFromFavContext = (movie: any) => {
    const newFavlist = favlist.filter((item: any) => item.id !== movie.id);
    setFavlist(newFavlist);
  };

  const initial = {
    watchlist,
    favlist,
    addToWatchContext,
    deleteFromWatchContext,
    addToFavContext,
    deleteFromFavContext,
  };

  return <List.Provider value={initial}>{children}</List.Provider>;
};
