import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/services/database/prisma";
import NextAuth, {type NextAuthOptions} from "next-auth"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma), 
    providers:[
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "", 
        }),
    ],
}



const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };