"use client"

import Avatar from '@/app/components/sidebar/Avatar'
import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'

interface UserBoxProps{
    data: User
}

const UserBox:React.FC<UserBoxProps> = ({data}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = useCallback(
    () => {
      setIsLoading(true)

      axios.post("/api/conversations", {
        userId: data.id
      })
      .then((data)=>{
        router.push(`/conversations/${data.data.id}`)
      })
      .finally(()=>{
        setIsLoading(false)
      })
    },
    [data, router],
  )
  
  return (
    <div className='relative flex items-center w-full p-3 space-x-3 text-gray-800 transition bg-white rounded-lg cursor-pointer hover:bg-neutral-100 hover:text-gray-900' onClick={handleClick}>
        <Avatar user={data}/>
        <div className='flex-1 min-w-0'>
            <div className="focus-outline-none">
                <div className='flex items-center mb-1 justify-normal'>
                    <p className='font-medium text-md'>
                        {data.name}
                    </p>
                </div>
            </div>
            
        </div>
        
    </div>
  )
}

export default UserBox