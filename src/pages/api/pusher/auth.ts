import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { pusherServer } from "@/app/libs/pusher";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)

    if(!session){
        return res.status(401).json({message: "Unauthorized"})
    }

    const socketId = req.body.socket_id
    const channel_id = req.body.channel_name

    const data = {
        user_id: session.user?.email ?? ""
    }

    const authResponse = pusherServer.authorizeChannel(socketId, channel_id, data)

    return res.status(200).json(authResponse)
}