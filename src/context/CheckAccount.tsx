import React, { createContext, ReactNode, useState } from "react";

// Types
export interface CheckAccountType {
  isLogged: boolean;
  apiKey: string;
  changeIsLogged: (bool: boolean) => void;
  changeApiKey: (api: string) => void;
}
interface CheckAccountProviderProps {
  children: ReactNode;
}

// Context
export const CheckAccount = createContext<CheckAccountType>({
  isLogged: false,
  apiKey: "",
  changeIsLogged: () => {},
  changeApiKey: () => {},
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

  const changeIsLogged = (bool: boolean) => {
    setIsLogged(bool);
  };

  const changeApiKey = (api: string) => {
    setApiKey(api);
  };

  const initial: CheckAccountType = {
    isLogged,
    apiKey,
    changeIsLogged,
    changeApiKey,
  };

  return (
    <CheckAccount.Provider value={initial}>{children}</CheckAccount.Provider>
  );
};
