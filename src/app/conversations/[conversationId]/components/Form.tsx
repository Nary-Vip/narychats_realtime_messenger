"use client"

import useConversation from '@/app/hooks/useConversation'
import axios from 'axios'
import React from 'react'
import { FieldValue, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { HiPhoto } from 'react-icons/hi2'
import MessageInput from './MessageInput'
import { HiPaperAirplane } from 'react-icons/hi2'

type Props = {}

const Form = (props: Props) => {
    const { conversationId } = useConversation()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = data => {
        setValue('message', '', {shouldValidate: true})
        
        console.log(data)
        axios.post('/api/messages', {
            ...data, conversationId
        })
    }
  return (
    <div className='flex items-center w-full gap-2 p-4 bg-white border-t lg:gap-4'>
        <HiPhoto size={30} className='transition text-sky-500 hover:text-sky-600'/>
        <form onSubmit={handleSubmit(onSubmit)} className='flex items-center w-full gap-2 lg:gap-4'>
            <MessageInput id={"message"} register={register}errors={errors} required={true} placeholder="Write a message"/>
        
            <button type="submit" className='p-2 transition rounded-full cursor-pointer bg-sky-500 hover:bg-sky-600'>
                <HiPaperAirplane size={18} className='text-white' />
            </button>
        </form>
    </div>
  )
}

export default Form