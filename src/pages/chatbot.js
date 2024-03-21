import axios from "axios"
import Navbar from "@/components/navbar"
import { useState } from "react"
import styles from "@/styles/signin.module.css"

export default function chatbot(){
    const [chat,setChat]=useState("")
    const [chats,setChats]=useState([])
    async function chatHandler(){
        setChats(prevChats => [...prevChats, {from:"user",chat:chat}])

        let response=(await axios.post("http://localhost:5000/chat",
        {
            user_input:chat
        })).data
        console.log(response)
        setChats(prevChats => [...prevChats, {from:"bot",chat:response.response}])
        setChat("")
        
    }
    return(
        <div className={`flex flex-col justify-start items-center ${styles.employeecontainer} bg-boxcolor overflow-x-hidden `} >
            <Navbar/>
            <h1 className="font-bold text-xl mt-10"  >CHAT WITH OUR BOT</h1>
            <div className=" bg-boxcolor mt-10 w-96 overflow-y-scroll h-96 border border-black flex flex-col items-center justify-center">
                <div>
                    {chats.map((chat)=>{
                        if(chat.from==="user"){
                            return(
                                <div className="text-black w-64 mt-5 bg-white ">USER:{chat.chat}</div>

                            )
                        }else{
                            return(
                                <div className=" text-white mt-5 w-64 bg-green-900">BOT:{chat.chat}</div>

                            )
                        }
                    })}
                    <input type="text" className="border border-black" placeholder="enter query" value={chat} onChange={(e)=>{
                        setChat(e.target.value)
                    }
                        }   ></input>
                    <button className="bg-black text-white p-1 rounded-lg mt-1" onClick={chatHandler} >chat</button>

                </div>
            </div>
        </div>
    )
}