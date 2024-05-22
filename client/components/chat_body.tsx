"use client"
import { Message } from '@/app/app/page'
import React from 'react'

const ChatBody = ({ data }: { data: Array<Message>}) => {
    return (
        <>
        {data.map((message: Message, index: number) => {
            if (message.type === "sent") {
                return (
                    <div className="mt-2 w-full text-right justify-end"
                    key={index}>
                        <div className="text-sm">{message.username}</div>
                        <div className="bg-blue text-white px-4 py-1 rounded-md inline-block mt-1">
                            {message.content}
                        </div>
                    </div>
                )
            } else if (message.type === "recv") {
                return (
                    <div className="mt-2" key={index}>
                        <div className="text-sm">{message.username}</div>
                        <div className="bg-grey text-dark-secondary px-4 py-1 rounded-md inline-block mt-1">
                            {message.content}
                        </div>
                    </div>
                )
            } else if (message.type === "system") {
                return (
                <div className="mt-2 w-full text-center justify-center" key={index}>
                    <div className="text-dark-primary bg-gray px-3 py-1 rounded-lg inline-block mt-1">
                        {message.content}
                    </div>
                </div>
                )
            }
        })}
    </>
    )
}

export default ChatBody