import Prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getUsers = async()=>{
    const session = await getSession()

    if(!session?.user?.email){
        return []
    }

    try {
        const users = await prisma?.user.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where:{
                NOT: {
                    email: session.user.email
                }
            }
        })
        console.log("checking for people === ", users)
        return users

    } catch (error) {
        return []
    }

}


export default getUsers