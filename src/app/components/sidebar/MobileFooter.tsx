"use client"

import useConversation from '@/app/hooks/useConversation'
import useRoutes from '@/app/hooks/useRoutes'
import React from 'react'
import MobileItem from './MobileItem'

type Props = {}

const MobileFooter = (props: Props) => {
    const routes = useRoutes()
    const { isOpen } = useConversation()

    if(isOpen){
        return null
    }

  return (
    <div className="fixed bottom-0 z-40 flex items-center w-full bg-white justify-between lg:hidden border-t-[1px]">
        {routes.map((item)=>(<MobileItem key={item.label} label={item.label} href={item.href} icon={item.icon} active={item.active} onClick={item.onClick}/>))}
    </div>
  )
}

export default MobileFooter