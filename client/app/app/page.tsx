"use client"
import ChatBody from '@/components/chat_body'
import { useState, useRef, useContext, useEffect } from 'react'
import { WebSocketContext } from '@/modules/websocket_provider'
import { AuthContext } from '@/modules/auth_provider'
import { useRouter } from 'next/navigation'
import { API_URL } from '@/constants'

export type Message = {
    content: string
    client_id: string
    username: string
    room_id: string
    type: "recv" | "sent" | "system"
}

const index = () => {
    const [messages, setMessages] = useState<Array<Message>>([])
    const [users, setUsers] = useState<Array<{username: string}>>([])
    const { conn } = useContext(WebSocketContext)
    const { user } = useContext(AuthContext)
    const textarea = useRef<HTMLTextAreaElement>(null)
    const router = useRouter()

    useEffect(() => {
        if (conn == null) {
            router.push("/")
            return
        }

        const room_id = conn.url.split("/")[5]
        async function getUsers() {
            try {
                const res = await fetch(`${API_URL}/ws/getClients/${room_id}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await res.json()
                setUsers(data)
            } catch (err) {
                console.error(err)
            }
            getUsers()
            window.addEventListener('popstate', () => {
                if (conn) {
                    conn.close()
                  }})
        }
    })

    useEffect(() => {
        if (conn == null) {
            router.push("/")
            return
        }

        conn.onmessage = (message) => {
            const m: Message = JSON.parse(message.data)
            if (m.username === "system") {
                m.type = "system"
                if (m.content.includes("joined")) {
                    setUsers([...users, {username: m.content.split(" ")[0]}])
                } else if (m.content.includes("left")) {
                    setUsers(users.filter(u => u.username !== m.content.split(" ")[0]))
                }
            }
            if (m.type !== "system") {
                user?.username === m.username ? m.type = "sent" : m.type = "recv"
            }

            setMessages([...messages, m])
        }

        conn.onclose = () => {
            router.push("/")
        }
        conn.onerror = (err) => {
            console.error(err)
        }
        conn.onopen = () => {}
        window.scrollTo(0, document.querySelector("body")?.scrollHeight || 0)
    }, [textarea, messages, users, conn])

    const sendMessage = () => {
        if (!textarea.current?.value) {
            return
        }
        if (textarea.current.value.trim() === "") {
            textarea.current.value = ""
            return
        }
        if (conn == null) {
            router.push("/")
            return
        }

        conn.send(textarea.current.value)
        textarea.current.value = ""
    }
  return (
    <>
    <div className="flex flex-col w-full">
        <div className='p-4 md:mx-6 mb-14'>
            <ChatBody data={messages}/>
        </div>
        <div className="fixed bottom-0 mt-4 w-full">
            <div className="flex md:flex-row px-4 py-2 bg-grey md:mx-4 rounded-md">
                <div className="flex w-full mr-4 rounded-md border border-blue">
                    <textarea
                    ref={textarea}
                    placeholder='type your message here'
                    className='w-full h-10 p-2 rounded-md focus:outline-none'
                    rows={1}
                    style={{ resize: "none" }}
                    onKeyDown={e => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            sendMessage()
                        }
                    }}/>
                </div>
                <div className="flex items-center">
                    <button className="p-2 rounded-md bg-blue text-white" onClick={sendMessage}>
                        send
                    </button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default index