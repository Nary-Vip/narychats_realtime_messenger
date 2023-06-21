import React from 'react'
import SideBar from '../components/sidebar/SideBar'

const layout = async ({ children } : {children: React.ReactNode}) => {
  return (
    <SideBar>
        <div className='h-full'>
            {children}
        </div>
    </SideBar>
  )
}

export default layout