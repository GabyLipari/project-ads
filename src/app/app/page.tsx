import { Prisma } from "@prisma/client";
import { Session } from "inspector";
import { getServerSession } from "next-auth"


export default async function Page() {
    const session = await getServerSession();
    
    return (
        
        <div>
        <div>Olá {session?.user?.name}</div>
        <div>Dashboard</div> 
        </div>
    );
}
