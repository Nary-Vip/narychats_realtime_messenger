"use client"

import { User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import useActiveList from '../hooks/useActiveList'
import clsx from 'clsx'

interface AvatarProps{
  user?: User
  profile?: boolean
}

const Avatar:React.FC<AvatarProps> = (user, profile) => {
  const { members } = useActiveList()
  const isActive = members.indexOf(user.user!.email!) !== -1
  return (
    <div className='relative'>
      <div className={clsx('relative inline-block overflow-hidden rounded-full h-9 w-9',
     profile? 'md:h-11 md:w-11':'md:h-16 md:w-10')
    }>
        <Image src={user.user?.image ?? "/images/person.jpg"} alt="Avatar" fill/>
      </div>
      {isActive &&
      <span className='absolute bottom-0 right-0 block w-2 h-2 bg-green-500 rounded-full bottom ring-2 ring-white md:h-3 md:w-3 '/>
}
    </div>
  )
}

export default Avatar