'use client'
import { createContext, useState } from "react";

export const AuthContext = createContext<{auth?:any,setAuth?:any}>({});


export function AuthProvider({children}:any) {

    const [auth, setAuth] = useState({})
    return (
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}