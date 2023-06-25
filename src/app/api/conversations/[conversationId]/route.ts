import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from "@/app/libs/prismadb"

interface IParams{
    conversationId?: string
}

export async function DELETE(req: Request, {params}: {params : IParams}) {
    
    try {
        const { conversationId } = params
        const currentUser = await getCurrentUser()

        if(!currentUser?.id){
            return new NextResponse("Unauthorized", {status: 401})
        }

        const existingConvo = await prisma.conversation.findUnique({
            where:{
                id: conversationId
            },
            include:{
                users: true
            }
        })

        if(!existingConvo){
            return new NextResponse("Invalid ID", {status: 400})
        }

        const deleteConversaton = await prisma.conversation.deleteMany({
            where:{
                id: conversationId,
                userIds:{
                    hasSome: [currentUser.id]
                }
            }
        })

        return NextResponse.json(deleteConversaton)


    } catch (error) {
        console.log(error, "DELETE api error")
        return new NextResponse("Internal Error", { status: 500 })
    }
    
}