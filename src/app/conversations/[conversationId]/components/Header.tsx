"use client"

import Avatar from '@/app/components/Avatar'
import { useOtherUser } from '@/app/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2'
import ProfileDrawer from './ProfileDrawer'
import AvatarGroup from '@/app/components/AvatarGroup'
import useActiveList from '@/app/hooks/useActiveList'

interface HeaderProps{
    conversation: Conversation & {
        users: User[]
    }
}

const Header:React.FC<HeaderProps> = ({conversation}) => {
    const otherUser = useOtherUser(conversation)
    const [drawer, setDrawer] = useState(false)
    const { members } = useActiveList()

    const isActive = members.indexOf(otherUser.email!) !== -1
    
    const statusText = useMemo(()=>{
        if(conversation.isGroup){
            return `${conversation.users.length} members`
        }
        return isActive? `Active`:'Offline'

    },[conversation, isActive])

  return (
    <>
        <ProfileDrawer data={conversation} isOpen={drawer} onClose={()=>{setDrawer(false)}} />
        <div className='flex w-full bg-white border-b-[1px] sm:px-4 py-3 px-4 justify-between items-center shadow-sm'>
        <div className='flex items-center gap-3'>
            <Link href="/conversations" className='block transition cursor-pointer lg:hidden text-sky-500 hover:text-sky-600'>
                <HiChevronLeft size={32}/>
            </Link>
            {conversation.isGroup ? (<AvatarGroup users={conversation.users} />):(<Avatar user={otherUser} />)}
            <div className='flex flex-col'>
                <div>
                    {conversation.name || otherUser.name}
                </div>
                <div className="text-xs font-light text-neutral-400">
                    {statusText}
                </div>
            </div>
        </div>
        <HiEllipsisHorizontal size={32} onClick={()=>{setDrawer(true)}} className='transition cursor-pointer text-sky-500 hover:text-sky-600' />
        </div>
        
    </>
  )
}

export default Header