"use client"
import Navbar from "@/components/navbar"
import axios from "axios"
import { useEffect, useState } from "react"
import Editmenuemployee from "@/components/Editmenuemployee"
export default function employee(){
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [contact,setContact]=useState("")
    const [date,setDate]=useState("")
    const [experience,setExperice]=useState(0)
    const [employees,setEmployees]=useState([])

    //state to show popup for edit
    const [open,setOpen]=useState(false)

    //state to store id
    const [id,setId]=useState(" ")
    async function getEmployee(){
        let response=await axios.get("/api/employee/getEmployee")
        if(response.data.message==="success"){
            setEmployees(response.data.employees)
        }
    }
    useEffect(()=>{

        getEmployee()
    },[])

    async function addHandler(){
        if(date.length===0){
            alert("please enter date")
            return
        }
        let response=await axios.post("/api/employee/createEmployee",
        {
            EmployeeName:name,
            EmployeeEmail:email,
            EmployeeContact:contact,
            DateOfJoining:date,
            Experience:experience
        })
        if(response.data.message){
            alert("employee added")
            setName("")
            setContact("")
            setDate("")
            setEmail("")
            setExperice("")
            getEmployee()
            
        }else{
            alert("please readd the employee")
        }
    }

    async function deleteHandler(e){
        let response=await axios.post("/api/employee/deleteEmployee",{
            id:e.target.id
        })
        if(response.data.message==="success"){
            alert("successfully deleted")
            getEmployee()
        }else{
            alert("redelete the data")
        }
    }
    function editHandler(e){
        setId(e.target.id)
        open? setOpen(false) : setOpen(true)
    }

    return(
        <div className="flex flex-col justify-start items-center" >
            <Navbar/>

            <div className={`flex justify-evenly items-center w-screen mt-20 ${open? "blur" : "" } `}>
                <div className="flex flex-col justify-evenly items-center border border-white w-96 text-black ">
                    <div className=" font-bold text-2xl">ADD EMPLOYEES</div>
                    <input type="text" placeholder="employee name" className="m-5"  value={name} onChange={(e)=>setName(e.target.value)} ></input>
                    <input type="email" placeholder="employee email" className="m-5" value={email} onChange={(e)=>setEmail(e.target.value)}  ></input>
                    <input type="number" placeholder="employee contact" className="m-5"  value={contact} onChange={(e)=> setContact(e.target.value)} ></input>

                    <input type="date"   pattern="\d{4}-\d{2}-\d{2}" placeholder="employee joining date" className="m-5" value={date} onChange={(e)=>setDate(e.target.value)}  ></input>
                    <input type="number" placeholder="employee experience" className="m-5" value={experience} onChange={(e)=>setExperice(e.target.value)} ></input>
                    <button className="border border-white font-bold w-16 m-5   text-white " onClick={addHandler} >ADD</button>
                </div>
                <div className="flex flex-col justify-evenly items-center border border-white employee-main-container">

                    <div className=" font-bold text-2xl">
                    EMPLOYEES
                    </div>

                    {employees.map((employee)=>{
                        return(
                            <div className="flex justify-evenly employeesubcontainer items-center rounded p-4" key={employee._id}>
                                    <div className="flex-1 p-2">
                                        {employee.EmployeeName}
                                    </div>
                                    <div className="flex-1 p-2">
                                        {employee.EmployeeEmail}
                                    </div>
                                    <div className="flex-1 p-2">
                                        {employee.EmployeeContact}
                                    </div>
                                    <div className="flex-1 p-2">
                                        {employee.DateOfJoining.slice(0, 10)}
                                    </div>
                                    <div className="flex-1 p-2">
                                        {employee.Experience}
                                    </div>
                                    <button id={employee._id } className="flex-1 font-bold" onClick={deleteHandler} >DELETE</button>
                                    <button id={employee._id } className="flex-1 font-bold" onClick={editHandler}  >EDIT</button>

                            </div>

                        )
                    })}
                </div>
            </div>

             {open? <Editmenuemployee openState={setOpen}  id={id} setEmployees={setEmployees} getEmployee={getEmployee}   /> : <div></div> }

        </div>
    )
}