'use client'
import { createContext, useState } from "react"

export const ErrorContext = createContext<{error?:any,setError?:any}>({});

export default function ErrorProvider({children}:any){

    const [error, setError] = useState()
    
    return (
        <>
            <ErrorContext.Provider value={{error,setError}}>
                {children}
            </ErrorContext.Provider>
        </>
    )
}