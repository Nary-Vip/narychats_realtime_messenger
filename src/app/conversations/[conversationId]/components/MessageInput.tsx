import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface MessageInputProps{
    id: string,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    required?: boolean,
    placeholder?: string,
    type?: string
}

const MessageInput:React.FC<MessageInputProps> = ({
    id,
    register,
    errors,
    required,
    placeholder,
    type
}) => {
  return (
    <div className='relative w-full'>
        <input id={id} type={type} autoComplete={id} className="w-full px-4 py-2 font-light text-black rounded-full bg-neutral-100 focus:outline-none"
        {...register(id, {required})} placeholder={placeholder}/>
    </div>
  )
}

export default MessageInput