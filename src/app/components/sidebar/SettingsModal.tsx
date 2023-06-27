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
                    <div className="pb-12 border-b border-gray-900/10">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Profile
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Edit your profile
                        </p>
                        <div className="flex flex-col mt-10 gap-y-8">
                            
                            
                                    {/* <label className='block text-sm font-medium leading-6 text-gray-900'>
                                    Photo
                                </label> */}
                                <div className="flex flex-col items-center mt-2 gap-x-3"> 
                                    <Image src={image || currentUser?.image || '/images/person.jpg'} className="rounded-full shadow" alt="Profile Image" height={80} width={80}/>
                                    <CldUploadButton options={{maxFiles:1}} onUpload={handleUpload} uploadPreset='s3eutor4'>
                                        <Button disabled={isLoading} secondary type="button">
                                            Change
                                        </Button>
                                    </CldUploadButton>
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