'use client'
import { AuthContext } from "@/context/auth.context";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function RootLayout({children}:any){
    const { push } = useRouter();
    const { auth } = useContext(AuthContext);

  useEffect(() => {
    if(auth.username){
        push('/home');
    }
  }, []);
  
    return (
        <>{!auth.username && children}</>
    )
}