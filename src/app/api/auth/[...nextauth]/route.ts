import bcrypt from "bcrypt"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import Googleprovider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/app/libs/prismadb" 

export const authOptions:AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        }),
        Googleprovider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email : { label: "Email", type: "text"},
                password: { label: "Password", type: "password"},
            },
            async authorize(credentials) { 
                if(!credentials?.email || !credentials?.password) throw new Error("Required field is missing")

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                })

                if(!user || !user?.hashedPassword) throw new Error("Invalid credentials")

                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.hashedPassword)

                // incorrect password
                if(!isPasswordCorrect) throw new Error("Invalid credentials")

                return user
            }
})
    ],
    debug: process.env.NODE_ENV === "development", 
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET as string,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }