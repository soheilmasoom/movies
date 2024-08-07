import React, { createContext, ReactNode, useState } from "react";

// Types
export interface CheckAccountType {
  isLogged: boolean;
  apiKey: string;
  authCode: string;
  changeIsLogged: (bool: boolean) => void;
  changeApiKey: (api: string) => void;
  changeAuthCode: (auth: string) => void
}
interface CheckAccountProviderProps {
  children: ReactNode;
}

// Context
export const CheckAccount = createContext<CheckAccountType>({
  isLogged: false,
  apiKey: "",
  authCode: "",
  changeIsLogged: () => {},
  changeApiKey: () => {},
  changeAuthCode: () => {}
});

// Context Provider
export const CheckAccountProvider: React.FC<CheckAccountProviderProps> = ({
  children,
}) => {
  const session = localStorage.getItem("session_id")
  const [isLogged, setIsLogged] = useState<boolean>(session ? true : false);
  const [apiKey, setApiKey] = useState<string>(
    "78ab21f3a9e954c04f73cb439d32a5a8"
  );
  const [authCode, setAuthCode] = useState<string>(
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OGFiMjFmM2E5ZTk1NGMwNGY3M2NiNDM5ZDMyYTVhOCIsInN1YiI6IjY2NWRkNzI3MzdlNmYzNjhkYzc5OTNmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.47csLb-ojIZN_riaBfO2f45rNP_XGhqEIn9PWbg9VFg"
  );

  const changeIsLogged = (bool: boolean) => {
    setIsLogged(bool);
  };

  const changeApiKey = (api: string) => {
    setApiKey(api);
  };

  const changeAuthCode = (auth: string) => {
    setAuthCode(auth)
  }

  const initial: CheckAccountType = {
    isLogged,
    apiKey,
    authCode,
    changeIsLogged,
    changeApiKey,
    changeAuthCode,
  };

  return (
    <CheckAccount.Provider value={initial}>{children}</CheckAccount.Provider>
  );
};
