"use client"


import Modal from '@/app/components/Modal'
import Image from 'next/image'
import React from 'react'

interface ImageModalProps{
    src?: string | null
    onClose: () => void
    isOpen?: boolean
}

const ImageModal:React.FC<ImageModalProps> = ({
    src,
    onClose,
    isOpen
}) => {

    if(!src)return null


  return (
    <Modal isOpen={isOpen} onClose={onClose} closeButton={true}>
        <div className='w-80 h-80'>
            <Image alt="Image" src={src} fill className="object-cover" /> 
        </div>
    </Modal>
  )
}

export default ImageModal