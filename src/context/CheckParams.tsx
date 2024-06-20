import React, { ReactNode, createContext, useState } from "react";

// Types
interface Props {
    children: ReactNode
}
interface Search {
    checkFilter: string,
    changeCheckFilter: () => void
}

export const CheckParams = createContext<Search>({
    checkFilter: "",
    changeCheckFilter: () => {}
})

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