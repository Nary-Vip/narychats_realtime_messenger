'use client'

import clsx from 'clsx'
import React from 'react'
import { FieldValues, UseFormRegister, FieldErrors } from 'react-hook-form'

type Props = {}

interface InputProps {
    label: string,
    id: string,
    type?: string,
    requried?: boolean,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>,
    disabled?: boolean
}

const Input: React.FC<InputProps> = ({ 
    label,
    id,
    type ,
    requried,
    register,
    errors,
    disabled
}) => {
    return (
        <div>
            <label 
                className='block text-sm font-medium leading-6 text-gray-900' 
                htmlFor={id}>
            {label}
            </label>
            <div className='mt-2'>
                <input 
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    {...register(id, { required: requried })}
                    className={clsx(
                        `form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-sky-600 focus:ring-inset sm:text-sm sm:leading-6`,
                        errors[id] && "focus:ring-rose-500",
                        disabled && "opacity-50 cursor-default"
                    )}
                />
            </div>
        </div>
    )
}

export default Input