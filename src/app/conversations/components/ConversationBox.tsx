"use client"

import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns"
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import { FullConversationType } from '@/app/types';
import { useOtherUser } from '@/app/hooks/useOtherUser';
import Avatar from '@/app/components/sidebar/Avatar';

interface ConversationBoxProps{
  data: FullConversationType,
  selected?: boolean
}

const ConversationBox:React.FC<ConversationBoxProps> = ({data, selected}) => {
  const otherUser = useOtherUser(data)
  const session = useSession()
  const router = useRouter()

  const handleClick = useCallback(()=>{
    router.push(`/conversations/${data.id}`)
  }, [router, data.id])

  const lastMessage = useMemo(()=>{
    const messages = data.messages || []
    return messages[messages.length - 1] 
  },[data.messages])

  const userEmail = useMemo(()=>{
    return session?.data?.user?.email
  },[session.data?.user?.email])

  const hasSeen = useMemo(() => {
    if(!lastMessage){
      return false
    }

    const seenArray = lastMessage.seen  || []

    if(!userEmail){
      return false
    }

    return seenArray.filter((user)=>user.email === userEmail).length > 0
  }, [userEmail, lastMessage])

  const lastMessageText = useMemo(()=>{
    if(lastMessage?.image){
      return "Sent an Image"
    }
    if(lastMessage?.body){
      return lastMessage.body
    }
    return "Start a conversation"
  },[lastMessage])

  return (
    <div className={clsx(`
    w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3`, 
    selected? "bg-neutral-100": "bg-white"
    )} onClick={handleClick}>
      <Avatar user={otherUser} />
      <div className="flex-1 min-w-0">
      <div className='focus-outline-none'>
        <div className="flex items-center justify-between mb-1">
          <p className='font-medium text-gray-900 text-md'>
            {data.name || otherUser.name}
          </p>
          {lastMessage?.createdAt && (
            <p className="text-xs font-light text-gray-400">
              13.02.1222
              {format(new Date(lastMessage.createdAt), "p")}
            </p>
          )}
        </div>
      <p className={clsx(`text-xs font-light text-gray-400 truncate`,
      hasSeen? "text-gray-500" : "text-black font-medium"
      
      )}>
        {lastMessageText}
      </p>
      </div>
      </div>
    </div>
  )
}

export default ConversationBox