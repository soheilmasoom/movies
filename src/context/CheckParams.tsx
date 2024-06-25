import { ReactNode, createContext, useState } from "react";

// Types
interface Props {
    children: ReactNode
}
interface Search {
    checkFilter: string,
    changeCheckFilter: () => void
}

// Context
export const CheckParams = createContext<Search>({
    checkFilter: "",
    changeCheckFilter: () => {}
})

// Context Provider
export const CheckParamsProvider: React.FC<Props> = ({children}) => {
    const [checkFilter, setCheckFilter] = useState<string>("off")

    const changeCheckFilter = () => {
        setCheckFilter(checkFilter === "on" ? "off" : "on")
    }

    const initial = {
        checkFilter,
        changeCheckFilter
    }

    return <CheckParams.Provider value={initial}>{children}</CheckParams.Provider>
}