import { signOut, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import EmptyState from '../components/EmptyState'

const Users = () => {
  return (
    <div className='hidden h-full lg:block lg:pl-80'>
        <EmptyState />
    </div>
  )
}

export default Users