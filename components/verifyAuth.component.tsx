'use client'

import { AuthContext } from "@/context/auth.context"
import { useContext } from "react"
import InvalidRoute from "./InvalidRoute.component"

export function VerifyAuth({ children }: any) {

    const auth = useContext(AuthContext)

    return (
        <>
            {auth.auth.username && children}
            {!auth.auth.username && <InvalidRoute />}
        </>
    )
}