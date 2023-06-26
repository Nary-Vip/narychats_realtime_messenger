"use client"

import useConversation from '@/app/hooks/useConversation'
import { FullConversationType } from '@/app/types'
import { Conversation, User } from '@prisma/client'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { MdOutlineGroupAdd } from 'react-icons/md'
import ConversationBox from './ConversationBox'
import GroupChatModal from './GroupChatModal'
import { useSession } from 'next-auth/react'
import { pusherClient } from '@/app/libs/pusher'
import { find } from 'lodash'

interface ConversationListProps{
    initialItems?: FullConversationType[]
    users?: User[]
}

const ConversationList:React.FC<ConversationListProps> = ({initialItems,users}) => {
    const [items, setItems] = useState(initialItems)
    const router = useRouter()
    const session = useSession()
    const { conversationId, isOpen } = useConversation()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const pusherKey = useMemo(()=>{
        return session.data?.user?.email
    },[session.data?.user?.email])

    

    useEffect(()=>{
        if(!pusherKey) return 

        const newHandler = (conversation: FullConversationType) =>{
            setItems((current)=>{
                if(find(current, { id: conversation.id})) return current
    
                return [conversation, ...current ??[]]
            })
        }
    
        const updateHandler = (conversation: FullConversationType)=>{
            setItems((current)=>current?.map((currConversation)=>{
                if(currConversation.id === conversation.id){
                    return {...currConversation, messages: conversation.messages}
                }
                return currConversation
            }))
        }
    
        const removeHandler = (conversation: FullConversationType)=>{
            setItems((current)=>{
                return [...current?.filter((currConversation)=>currConversation.id !== conversation.id) ??[]] 
            })
            if(conversationId === conversation.id) router.push('/conversations')
        }

        pusherClient.subscribe(pusherKey)
        pusherClient.bind("conversation:new", newHandler)
        pusherClient.bind("conversation:update", updateHandler)
        pusherClient.bind("conversation:remove", removeHandler)

        return()=>{
            pusherClient.unsubscribe(pusherKey)
            pusherClient.unbind("conversation:new", newHandler)
            pusherClient.unbind("conversation:update", updateHandler)
            pusherClient.unbind("conversation:remove", removeHandler)
        }
    },[pusherKey, conversationId, router])

  return (
    <>
        <GroupChatModal users={users} isOpen={isModalOpen} onClose={()=>{setIsModalOpen(false)}}/>
        <aside className={clsx(`
            fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200  
        `, isOpen? 'hidden': 'block')}>
            <div className='px-5'>
                <div className='flex justify-between pt-4 mb-4'>
                    <div className='text-2xl font-bold text-neutral-800'>
                        Message
                    </div>
                    <div onClick={()=>{setIsModalOpen(true)}} className='p-2 text-gray-600 transition bg-gray-100 rounded-full cursor-pointer hover:opacity-75'>
                        <MdOutlineGroupAdd size={20} />
                    </div>
                </div>
                {items?.map((item)=><ConversationBox key={item.id} data={item} selected={conversationId === item.id}/>)}
            </div>
        </aside>
    </>
  )
}

export default ConversationList