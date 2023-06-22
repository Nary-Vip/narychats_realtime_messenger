import getConversastionList from '@/app/actions/getConversation'
import getConversationById from '@/app/actions/getConversationById'
import getMessages from '@/app/actions/getMessages'
import EmptyState from '@/app/components/EmptyState'
import React from 'react'
import Header from './components/Header'
import Body from './components/Body'
import Form from './components/Form'


interface Iparams{
    conversationId: string
}



const ConversationId = async({params}: {params: Iparams}) => {
  
    const conversation = await getConversationById(params.conversationId)
    const messages = await getMessages(params.conversationId)

    if(!conversation){
        return <div className='h-full lg:pl-80'>
            <div className="flex flex-col h-full">
                <EmptyState />
            </div>
        </div>
    }


    return (
    <div className='h-full lg:pl-80'>
        <div className="flex flex-col h-full">
            <Header conversation={conversation} />
            <Body />
            <Form />
        </div>
    </div>
  )
}

export default ConversationId