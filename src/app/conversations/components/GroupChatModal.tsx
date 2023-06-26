"use client"

import Modal from '@/app/components/Modal'
import Button from '@/app/components/buttons'
import Input from '@/app/components/inputs/Inputs'
import Select from '@/app/components/inputs/Select'
import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface GroupChatProps{
  isOpen?: boolean
  onClose: () => void
  users?: User[]
}

const GroupChatModal:React.FC<GroupChatProps> = ({
  isOpen,
  onClose,
  users
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const { 
    register, handleSubmit, setValue, watch, formState:{ errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: [],
    }
  })

  const members = watch('members')

  const onSubmit:SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    axios.post('/api/conversations', {
      ...data,
      isGroup: true
    })
    .then(() => {
      router.refresh()
      onClose()
    })
    .catch((err) => {
      toast.error(err.message)
    })
    .finally(() => {
      setIsLoading(false)
    })
  }
  return (
    <div>
      <Modal onClose={onClose} isOpen={isOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-12'>
            <div className="pb-12 border-t border-gray-900/10">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Create a group chat
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Have a group chat with your friends?
              </p>
              <div className='flex flex-col mt-10 gap-y-8'>
                <Input register={register} id="name" label="name" disabled={isLoading} required errors={errors} />
                <Select isDisabled={isLoading} label="members" options={users!.map((users)=>({value:users.id, label:users.name}))} onChange={(value)=>setValue('members', value,{
                  shouldValidate: true
                })} value={members}/>

                
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end mt-6 gap-x-6">
                <Button disabled={isLoading} onClick={onClose} type="button" secondary>
                  Cancel
                </Button>
                <Button disabled={isLoading} type="submit">
                  Create
                </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default GroupChatModal