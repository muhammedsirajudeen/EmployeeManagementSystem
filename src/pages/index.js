import Navbar from "@/components/navbar";
import { useState } from "react";
import styles from  "@/styles/background.module.css"

export default function Indexname(){
    const [name,setName]=useState("")
    function companyName(){
        window.localStorage.setItem('name',name)
        window.location.href="/signin"
    }
    return(
        <div className={`${styles.maincontainer} bg-gray-500 h-screen flex flex-col w-full items-center justify-start`}>
            <Navbar/>

            <h1 className="text-white font-bold mt-10" >MANAGE YOUR EMPLOYEES USING EMS</h1>
            <div className="flex flex-col items-center justify-center bg-white w-96 rounded-lg  ">
                <input type="text" className="bg-gray-500 m-5 rounded-sm" onChange={(e)=>setName(e.target.value)}   placeholder="enter company name"></input> 
                <button className="p-1 border border-black rounded-lg" onClick={companyName}>submit</button>
            </div>
        </div>
    )
}