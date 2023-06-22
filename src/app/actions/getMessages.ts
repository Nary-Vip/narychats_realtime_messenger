import prisma from "@/app/libs/prismadb"
import getCurrentUser from "./getCurrentUser"

const getConversationById = async(conversationById: string)=>{
    try {
        const messages = await prisma.message.findMany({
            where:{
                conversationId: conversationById
            },
            include:{
                sender: true,
                seen: true
            },
            orderBy:{
                createdAt: 'asc'
            }
        })

        return messages

    } catch (error) {
        return []
    }
}

export default getConversationById