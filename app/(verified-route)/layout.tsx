import { VerifyAuth } from "@/components/verifyAuth.component";

export default function RootLayout({children}:any){
    return (
        <VerifyAuth>{children}</VerifyAuth>
    )
}