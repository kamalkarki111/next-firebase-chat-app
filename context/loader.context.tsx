'use client'
import { createContext, useState } from "react";

export const LoaderContext = createContext<{setShowLoader:any,showLoader:boolean}>({setShowLoader:null, showLoader:false});

export function LoaderProvider({children}:any) {

    const [showloader, setShowLoader] = useState(false)
    return (
        <LoaderContext.Provider value={{setShowLoader:setShowLoader, showLoader:showloader}}>
            {children}
        </LoaderContext.Provider>
    )
}