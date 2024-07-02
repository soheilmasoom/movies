import { ReactNode, createContext, useState } from "react";

// Types
type CheckFilter = "on" | "off" | "";
interface CheckParamsProviderProps {
  children: ReactNode;
}
export interface CheckParamsType {
  checkFilter: CheckFilter;
  changeCheckFilter: () => void;
}

// Context
export const CheckParams = createContext<CheckParamsType>({
  checkFilter: "",
  changeCheckFilter: () => {},
});

// Context Provider
export const CheckParamsProvider: React.FC<CheckParamsProviderProps> = ({
  children,
}) => {
  const [checkFilter, setCheckFilter] = useState<CheckFilter>("off");

  const changeCheckFilter = () => {
    setCheckFilter(checkFilter === "on" ? "off" : "on");
  };

  const initial: CheckParamsType = {
    checkFilter,
    changeCheckFilter,
  };

  return (
    <CheckParams.Provider value={initial}>{children}</CheckParams.Provider>
  );
};
