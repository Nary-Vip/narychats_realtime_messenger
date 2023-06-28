"use client"
import { User } from '@prisma/client'
import React from 'react'
import UserBox from './UserBox'

type Props = {}

interface UserListProps{
    items?: User[]
}

const UserList:React.FC<UserListProps> = ({items}) => {

  return (
    <aside className="fixed inset-y-0 left-0 block w-full pb-20 overflow-y-auto border-r border-gray-200 lg:pb-0 lg:left-20 lg:w-80 lg:block">
        <div className='px-5'>
            <div className='flex-col'>
                <div className='pt-4 pb-2 text-2xl font-bold text-neutral-800'>
                    People
                </div>
                <div className="mb-6 text-xs text-gray-400">
                    Tap on any user to start the conversation
                </div>
            </div>
            {items !== undefined && items?.length !== 0 ?
            items.map((item)=><UserBox key={item.id} data={item}/>) : <p>No Users</p>}
        </div>
    </aside>
  )
}

export default UserList