import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from "@/app/libs/prismadb"


interface IParams{
    conversationId: string
}

export async function POST(req: Request, { params }:{ params:IParams}){
    try {
        const currentUser = await getCurrentUser()
        const { conversationId } = params

        if(!currentUser?.id || !currentUser?.email){
            return new NextResponse("Unauthorized", {status: 401})
        }

        // Find existing convo
        const existingConvo = await prisma.conversation.findUnique({
            where:{
                id: conversationId
            },
            include:{
                messages: {
                    include: {
                        seen: true
                    }
                },
                users: true
            }
        })

        if(!existingConvo){
            return new NextResponse("Invalid ID", {status: 404})
        }

        // Find last message
        const lastMessage = existingConvo.messages[existingConvo.messages.length-1]

        if(!lastMessage){
            return NextResponse.json(existingConvo)
        }

        // Update the seen of last message

        const updateMessage = await prisma.message.update({
            where:{
                id: lastMessage.id
            },
            include:{
                sender: true,
                seen: true
            },
            data:{
                seen: {
                    connect:{
                        id: currentUser.id
                    }
                }
            }
        })
        return NextResponse.json(updateMessage)
        
    } catch (error) {
        console.log(error, "Seen API")
        return new NextResponse("Internal Error", { status: 500 })
    }
}