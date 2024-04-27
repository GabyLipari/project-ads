"use client"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export default function ButtonLogout(){
    return(
        <div>
        <Button onClick={() => signOut()}>
           Logout</Button>
        </div>
    )
}

