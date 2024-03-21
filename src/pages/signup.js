import Navbar from "@/components/navbar";
import Image from 'next/image';
import { useState } from "react";
import axios from "axios"
import styles from  "@/styles/signin.module.css"
export default function Signup(){
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmpassword,setConfirmpassword]=useState("")
    
    async function signupHandler(){
        let response=(await axios.post("/api/auth/signup",
        {
            name:name,
            email:email,
            password:password
        })).data
        alert(response.message)
        if(response.message==="success"){
            window.location.href="/signin"

        }
    }
    return(
        <div className="flex flex-col items-center justify-center">
            <Navbar/>

            <div className="w-full bg-gray-700 flex items-center justify-center">
                <div className="flex items-center justify-center flex-col h-screen w-1/2">
                    <h1 className=" text-cyan-500 font-bold" >MANAGE</h1>
                    <h1 className=" text-white font-bold text-xl" >ALL YOUR EMPLOYESS USING EMS</h1>
                    <a href="/signin" className="text-white font-bold">/Login Account</a>

                    {/*about us container  */}
                    <div className={`flex items-center justify-evenly w-1/2 mt-10 ${styles.maincontainer} `}>
                        <h1 className="text-white font-bold w-1/2" >ABOUT US</h1>

                    </div>
                </div>
                <div className={` ${styles.maincontainerone} flex items-center justify-center flex-col w-1/2`}>
                    <div className=" flex w-full flex-col justify-center items-center bg-white rounded-lg ">
                        <div className="m-5">
                            <p>Enter name</p>
                            <input placeholder="" className="w-full bg-gray-500 h-6 rounded-lg " value={name} onChange={e=>setName(e.target.value)}   ></input>
                        </div>
                        <div className="m-5">
                            <p>Enter email id</p>
                            <input placeholder="" className="w-full bg-gray-500 h-6 rounded-lg" value={email} onChange={e=>setEmail(e.target.value)} ></input>
                        </div>
                        <div className="m-5">
                            <p>Enter password</p>
                            <input type="password" placeholder="" className="w-full bg-gray-500 h-6 rounded-lg" value={password} onChange={e=>setPassword(e.target.value)} ></input>
                        </div>
                        <div className="m-5">
                            <p>confirm password</p>
                            <input type="password" placeholder="" className="w-full bg-gray-500 h-6 rounded-lg" value={confirmpassword}  onChange={e=>setConfirmpassword(e.target.value)} ></input>
                        </div>

                        <button className="mb-5 border border-black p-1 rounded-lg" onClick={signupHandler} >Signup</button>


                    </div>
                </div>


                

            </div>
        </div>
    )
}