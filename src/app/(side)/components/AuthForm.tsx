'use client'

import Button from '@/app/components/buttons'
import Inputs from '@/app/components/inputs/Inputs'
import React, { useCallback, useEffect, useState } from 'react'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import AuthSocialButton from './AuthSocialButton'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import axios from 'axios'
import { toast } from "react-hot-toast"
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import LoadingModal from './LoadingModal'
import Modal from '@/app/components/Modal'
import Image from 'next/image'

type Props = {}

type Variant = "LOGIN" | "REGISTER"

export default function AuthForm({}: Props) {
    const [variant, setvariant] = useState<Variant>('LOGIN')
    const [isLoading, setIsLoading] = useState(false)
    const session = useSession()
    const router = useRouter()

    useEffect(() => {
      if(session?.status === "authenticated"){
        console.log(session)
        router.push("/user")
      }
    }, [session?.status, router, session])
    

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setvariant('REGISTER')
        } else {
            setvariant('LOGIN')
        }
    }, [variant])

    const {register, handleSubmit, formState:{
        errors
    }} = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true)

        if(variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false,
            })
            .then((callback)=>{
                if (callback?.error) {
                    toast.error("Invalid Credentials")
                }
                if(callback?.ok && !callback?.error){
                    toast.success("Logged in successfully")
                    router.push("/user")
                }
            })
            .finally(()=>{
                setIsLoading(false)
            })
        
        }

        else {
            axios.post('/api/register', data)
            .then(()=>{signIn("credentials", data)})
            .catch((err)=>{
                toast.error("Something went wrong")
            })
            .finally(()=>{
                setIsLoading(false)
            })
        }
        console.log(data)
    } 

    const socialAction = (action: string)=>{
        setIsLoading(true)
        // Social Auth

        signIn(action, { redirect: false })
        .then((callback)=>{
            if(callback?.error){
                toast.error("Something went wrong")
            }
            if(callback?.ok && !callback?.error){
                toast.success("Logged in successfully")
                router.push("/user")
            }
        })
        .finally(()=>{
            setIsLoading(false)
        })

    }

  return (
  <>
  {isLoading && <Modal isOpen={isLoading} onClose={() =>{}} closeButton={false}>
    <div className="flex items-center justify-center bg-black">
        <Image src={"/images/fox_loading.gif"} height={200} width={200} alt="Loading GIF"/>
    </div>
    </Modal>}
    <div className='mt-8 sm:mx-auto sm:max-w-md sm:w-full'>
        <div className='px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10'>
            <form 
                className='space-y-6'
                onSubmit={handleSubmit(onSubmit)}
            >
                {variant === 'REGISTER' && (
                <Inputs disabled={isLoading} id="name" label="name" register={register} errors={errors}/>
                )}

                <Inputs disabled={isLoading} id="email" label="email" type='email' register={register} errors={errors}/>
                
                <Inputs disabled={isLoading} id="password" label="password" type='password ' register={register} errors={errors}/>
                
                <div>
                    <Button
                        disabled={isLoading}
                        fullWidth={true}
                        type='submit'
                    >
                        {variant === 'LOGIN' ? 'Login' : 'Register'}
                    </Button>
                </div>
                
            </form>
            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"/>
                    </div>    
                    
                    <div className='relative flex justify-center text-sm'>
                        <span className="px-2 text-gray-500 bg-white">
                            Or Continue with
                        </span>
                    </div>
                </div>
                <div className='flex gap-2 mt-6'>
                    <AuthSocialButton 
                        icon={BsGithub}
                        onClick={()=>socialAction('github')}
                    />
                    <AuthSocialButton 
                        icon={BsGoogle}
                        onClick={()=>socialAction('google')}
                    />
                </div>
            </div>
            <div className='flex justify-center gap-2 px-2 mt-6 text-sm text-gray-500'>
                <div>
                    {variant === "LOGIN"? "New to NaryChats":"Already have an account?"}
                </div>
                <div onClick={toggleVariant} className="underline cursor-pointer">
                    {variant === "LOGIN"? "Register":"Login"}
                </div>
            </div>
            
            
        </div>
    </div>
    </>
  )
}