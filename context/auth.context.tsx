'use client'
import { getAvatarName } from "@/lib/utils";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<{ auth?: any, setAuth?: any }>({});

export function AuthProvider({ children }: any) {

    useEffect(()=>{
        const cachedAuth = (window as any).localStorage.getItem('authDetails');
        if(cachedAuth){
            setAuth(JSON.parse(cachedAuth))
        }
    },[])

    const [auth, setAuth] = useState({});

    return (
        <>
            <AuthContext.Provider value={{
                auth, setAuth: (data: any) => {
                    window.localStorage.setItem('authDetails', JSON.stringify(data));
                    setAuth(data);
                }
            }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}