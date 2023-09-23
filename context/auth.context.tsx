'use client'
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<{auth?:any,setAuth?:any}>({});


export function AuthProvider({children}:any) {

    const [auth, setAuth] = useState({});
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(()=>{
        setDomLoaded(true)
    })
    return (
        <AuthContext.Provider value={{auth,setAuth}}>
            {domLoaded && children}
        </AuthContext.Provider>
    )
}