import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Modal from '../Modal'
import Input from '../inputs/Inputs'
import Image from 'next/image'
import { CldUploadButton } from 'next-cloudinary'
import Button from '../buttons'
import { AiOutlineEdit } from "react-icons/ai"

interface SettingsModalsProps{
    isOpen: boolean
    onClose: () => void
    currentUser: User
}

const SettingsModal:React.FC<SettingsModalsProps> = ({
    isOpen,
    onClose,
    currentUser
}) => {

    const router = useRouter()   
    const [isLoading, setIsLoading] = useState(false)
    const {
        register, handleSubmit, setValue, watch, formState:{errors}
    } = useForm<FieldValues>({
        defaultValues:{
            name: currentUser.name,
            image: currentUser.image
        }
    })

    const image = watch('image')

    const handleUpload = (result:any)=>{
        setValue('image', result?.info?.secure_url, {shouldValidate: true})
    }

    const onSubmit: SubmitHandler<FieldValues> = data => {
        setIsLoading(true)
        axios.post("/api/settings", data)
        .then(()=>{
            router.refresh()
            onClose()
        })
        .catch(()=>{
            toast.error("Something went wrong!")
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }

  return (
    <div>
        <Modal onClose={onClose} isOpen={isOpen}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="mt-4">
                        <h2 className="text-base font-semibold leading-7 text-center text-gray-900">
                            Edit your profile
                        </h2>
                        <div className="flex flex-col mt-6 gap-y-8 ">
                                <div className="flex items-center justify-center pb-6 border-b border-gray-900/10"> 
                                    <CldUploadButton options={{maxFiles:1}} onUpload={handleUpload} uploadPreset='s3eutor4'>
                                        <Image src={image || currentUser?.image || '/images/person.jpg'} className="transition rounded-full shadow hover:opacity-80" alt="Profile Image" height={90} width={90}/>
                                    </CldUploadButton>
                                    {/* <AiOutlineEdit className='absolute bottom-0 right-0' size={20}/> */}
                                </div> 
                            <Input label="Name" id="name" register={register} errors={errors} disabled={isLoading} required/>   
                        </div>
                    </div>
                    <div className="flex items-center justify-end mt-6 gap-x-6">
                        <Button disabled={isLoading} secondary type="button" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button disabled={isLoading} type="submit" onClick={onClose}>
                            Update
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    </div>
  )
}

export default SettingsModal