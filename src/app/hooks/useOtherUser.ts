import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types"
import { User } from "@prisma/client";

export const useOtherUser = (conversation: FullConversationType | {
    users:User[]
}) => {
    const session = useSession();
    const OtherUser = useMemo(() => {
        const currentUser = session?.data?.user?.email
        const otherUser = conversation.users.filter((user) => user.email !== currentUser)
        return otherUser
    },[session.data?.user?.email, conversation.users])

    return OtherUser[0]
}