"use client"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export default function Home() {
    return (
        <main className="flex justify-center items-center h-screen">
           <Button onClick={() => signIn('github',{callbackUrl:"/app"})}>Login com GitHub</Button>
        </main>
    )
}
