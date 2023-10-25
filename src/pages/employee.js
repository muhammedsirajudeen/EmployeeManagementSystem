"use client"
import Navbar from "@/components/navbar"
import axios from "axios"
import { useState } from "react"

export default function employee(){
    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [contact,setContact]=useState()
    const [date,setDate]=useState()
    const [experience,setExperice]=useState()
    async function addHandler(){
        let response=await axios.post("/api/employee/createEmployee",
        {
            EmployeeName:name,
            EmployeeEmail:email,
            EmployeeContact:contact,
            DateOfJoining:date,
            Experience:experience
        })
    }
    return(
        <div className="flex flex-col justify-start items-center" >
            <Navbar/>

            <div className="flex justify-evenly items-center w-screen mt-20 ">
                <div className="flex flex-col justify-evenly items-center border border-white w-96 text-black ">
                    <div className=" font-bold text-2xl">ADD EMPLOYEES</div>
                    <input type="text" placeholder="employee name" className="m-5"  value={name} onChange={(e)=>setName(e.target.value)} ></input>
                    <input type="email" placeholder="employee email" className="m-5" value={email} onChange={(e)=>setEmail(e.target.value)}  ></input>
                    <input type="number" placeholder="employee contact" className="m-5"  value={contact} onChange={(e)=> setContact(e.target.value)} ></input>

                    <input type="date"   pattern="\d{4}-\d{2}-\d{2}" placeholder="employee joining date" className="m-5" value={date} onChange={(e)=>setDate(e.target.value)}  ></input>
                    <input type="number" placeholder="employee experience" className="m-5" value={experience} onChange={(e)=>setExperice(e.target.value)} ></input>
                    <button className="border border-white font-bold w-16 m-5   text-white " onClick={addHandler} >ADD</button>
                </div>
                <div className="flex flex-col justify-evenly items-center border border-white w-96">

                    <div className=" font-bold text-2xl">EMPLOYEES</div>
                </div>
            </div>
        </div>
    )
}