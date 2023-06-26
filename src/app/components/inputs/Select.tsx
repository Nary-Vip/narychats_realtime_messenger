"use client"

import React from 'react'
import ReactSelect from "react-select"

interface SelectProps{
    isDisabled?: boolean
    label: string
    value?: Record<string, any>
    onChange: (value: Record<string,any>)=> void
    options: Record<string, any>[]
}

const Select:React.FC<SelectProps> = ({
    isDisabled,
    label,
    value,
    onChange,
    options
}) => {
  return (
    <div className="z-[100]"> 
        <label className="block text-sm font-medium leading-6 text-gray-900">
            {label}
        </label>
        <div className="mt-2">
            <ReactSelect isDisabled={isDisabled} value={value} onChange={onChange} isMulti options={options} menuPortalTarget={document.body} styles={{
                menuPortal:(base)=>({
                    ...base,
                    zIndex: 999
                })
            }} classNames={{
                control: ()=> "text-sm"
            }}/>
        </div>
    </div>
  )
}

export default Select