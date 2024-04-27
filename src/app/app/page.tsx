import { Prisma } from "@prisma/client";
import { Session } from "inspector";
import { getServerSession } from "next-auth"
import ButtonLogout from "./ButtonLogout";
import { redirect } from "next/navigation";
import Image from "next/image";
import { authOptions } from "@/api/auth/[...nextauth]/route";



export default async function Home() {
    const session = await getServerSession(authOptions)
    if(!session) {
        redirect("/");
    }

    return (        
        <div>
            {session.user?.image && (<div className="w-[150px]">
            <Image src={session.user?.image} 
            alt="Avatar"
            width={150} 
            height={150}
            />
        </div>)}
        <div>Olá {session?.user?.name}</div>
       
        <div>Dashboard</div> 
        <div><ButtonLogout/>
        </div>
        </div>
    );
}
