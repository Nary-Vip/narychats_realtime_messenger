"use client"

import React from 'react'
import userActiveChannel from '../hooks/useActiveChannel'

type Props = {}

const ActiveStatus = (props: Props) => {
    userActiveChannel()
  return (
    <div className="">
        
    </div>
  )
}

export default ActiveStatus