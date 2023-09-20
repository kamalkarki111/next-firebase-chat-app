import { AuthContext } from "@/context/auth.context";
import { useContext } from "react";

export function useAuth(){
    const auth = useContext(AuthContext);
    return auth;
}