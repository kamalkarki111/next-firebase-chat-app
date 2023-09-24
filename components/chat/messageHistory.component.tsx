'use client'
import { AuthContext } from "@/context/auth.context";
import { db } from "@/lib/firebase"
import { getAvatarName } from "@/lib/utils";
import { Key } from "@mui/icons-material";
import { Avatar } from "@mui/joy";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react"

export default function MessageHistory() {

    const [messages, setMessages] = useState<Array<any>>([])
    const auth = useContext(AuthContext)
    const params = useSearchParams();

    useEffect(() => {

        const unsub = db.collection('messages').doc(params.get('id') as string).collection('msg-data').orderBy('createdAt').onSnapshot((querySnapshot) => {
            console.log(querySnapshot.docs)
            const data = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            // Update state
            setMessages(data);
        })

        return ()=>{
            unsub()
        }
    },[])

    return (
        <>
            <div
                id="messages"
                className="flex flex-col-reverse h-full space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
            >

                <div className="chat-message">
                    {messages.map((msg) => <div key={msg.id}>
                        {msg.username !== auth.auth.username && <div className="flex items-end">
                            
                            <div key={msg.id} className="m-2 flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                <div className="flex">
                                    <Avatar>{getAvatarName(msg.fname || msg.username)}</Avatar>
                                    <span className="mx-3 px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                                        {msg.text}
                                    </span>
                                </div>
                                <div>
                                    {msg.createdAt}
                                </div>
                            </div>
                        </div>}
                        {msg.username === auth.auth.username && <div className="chat-message">
                            
                            <div key={msg.id} className="flex items-end justify-end">
                                <div className="m-2 flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                                    <div className="flex flex-row-reverse">
                                        <Avatar>{getAvatarName(msg.fname || msg.username)}</Avatar>
                                        <span className="mx-3 px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                                            {msg.text}
                                        </span>
                                    </div>
                                    <div>
                                    {msg.createdAt}
                                </div>
                                </div>
                            </div>
                        </div>}
                    </div>)}

                </div>
            </div>
        </>
    )

}