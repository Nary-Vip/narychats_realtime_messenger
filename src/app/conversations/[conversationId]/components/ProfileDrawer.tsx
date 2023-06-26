"use client"

import Modal from '@/app/components/Modal'
import Avatar from '@/app/components/Avatar'
import { useOtherUser } from '@/app/hooks/useOtherUser'
import { Dialog, Transition } from '@headlessui/react'
import { Conversation, User } from '@prisma/client'
import { format } from 'date-fns'
import React, { Fragment, useMemo, useState } from 'react'
import { IoClose, IoTrash } from "react-icons/io5"
import ConfirmModal from './ConfirmModal'
import AvatarGroup from '@/app/components/AvatarGroup'
import useActiveList from '@/app/hooks/useActiveList'

interface ProfileDrawerProps {
    data: Conversation & {
        users: User[]
    }
    isOpen: boolean
    onClose: () => void
}


const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
    data, isOpen, onClose
}) => {

    const otherUser = useOtherUser(data)
    const [isModalOpen, setIsModalOpen] = useState(isOpen)
    const { members } = useActiveList()

    const isActive = members.indexOf(otherUser.email!) !== -1

    const joinedDate = useMemo(() => {
        return format(new Date(otherUser.createdAt), 'PP')
    }, [otherUser.createdAt])

    const title = useMemo(() => {
        return data.name || otherUser.name
    }, [data.name, otherUser.name])

    const statusText = useMemo(() => {
        if (data.isGroup)
            return `${data.users.length} members`
        return isActive ? "Active" : "Offline"
    }, [data, isActive])

    return (
        <>
            <ConfirmModal isOpen={isModalOpen} onClose={()=> setIsModalOpen(false)}/>
                
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog as='div' className="relative z-50" onClose={onClose}>
                    <Transition.Child as={Fragment}
                        enter="ease-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className='fixed inset-0 bg-black bg-opacity-40' />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
                                        <div className='flex flex-col h-full py-6 bg-white shadow-xl overflow-y-full'>
                                            <div className='px-4 sm:px-6'>
                                                <div className='flex items-center justify-end'>
                                                    <div className="flex items-center ml-3 h-7">
                                                        <button onClick={onClose} className="text-gray-400 bg-white rounded-md focus:outline-none hover:text-gray-500 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                                                            <span className='sr-only'>
                                                                close panel
                                                            </span>
                                                            <IoClose size={24} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='relative flex-1 px-4 mt-6 sm:px-6'>
                                                <div className="flex flex-col items-center">
                                                    <div className="mb-2">
                                                    {data.isGroup ? (<AvatarGroup users={data.users} />):(<Avatar user={otherUser} />)}
                                                    </div>
                                                    <div className="">
                                                        {title}
                                                    </div>
                                                    <div className="text-sm text-gray-500 ">
                                                        {statusText}
                                                    </div>
                                                    <div className="flex gap-10 my-8">
                                                        <button onClick={()=>{setIsModalOpen(true)}}
                                                            className="flex flex-col items-center gap-3 cursor-pointer felx-col hover:opacity-75">
                                                            <div className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-rose-400">
                                                                <IoTrash size={20}/>
                                                            </div>
                                                            <div className="text-sm font-light text-neutral-600">
                                                                Delete
                                                            </div>
                                                        </button>
                                                    </div>
                                                    <div className="w-full py-5 sm:px-0 sm:pt-0">
                                                        <dl className="px-4 space-y-8 sm:space-y-6 sm:px-6"> 
                                                        {data.isGroup &&(
                                                        <div>
                                                            <dt className='text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'>
                                                                Members
                                                            </dt>
                                                            {data.users.map((user)=>(  
                                                            <dt key={user.id} className="my-2 text-sm text-gray-900 sm:col-span-2">
                                                                {user.name}
                                                            </dt>
                                                            ))}
                                                        </div>
                                                        )}
                                                            {!data.isGroup && (
                                                                <div>
                                                                    <dt className='text-sm font-medium text-gray-400 sm:w-40 sm:flex-shrink-0'>
                                                                        Email
                                                                    </dt>    
                                                                    <dt className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                                        {otherUser.email}
                                                                    </dt>
                                                                </div>
                                                            )}
                                                            {!data.isGroup &&(
                                                                <>
                                                                    <hr />
                                                                    <div>
                                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                                                            Joined
                                                                        </dt>
                                                                        <dd className="mt-1 text-sm text-gray-500 sm:col-span-2">
                                                                            <time dateTime={joinedDate}>
                                                                                {joinedDate}
                                                                            </time>
                                                                        </dd>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </dl>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <ProfileDrawer data={data} isOpen={isOpen} onClose={onClose} /> */}
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>

            </Transition.Root>
        </>
    )
}

export default ProfileDrawer