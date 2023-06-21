"use client"

import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'


interface MobileItemsProps {
  label: string,
  href: string,
  active?: boolean,
  icon: any,
  onClick?: () => void
}


const MobileItem: React.FC<MobileItemsProps> = ({
  label,
  href,
  active,
  icon: Icon,
  onClick
}) => {

  const handleClick = () => {
    if (onClick) {
      return onClick()
    }
  }


  return (
    <Link href={href} onClick={handleClick} className={clsx(`
      group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-gray-900 hover:bg-gray-100
    `, active && "bg-gray-100 text-gray-900",)}>
      <Icon className="w-6 h-6"/>
    </Link>
  )
}

export default MobileItem