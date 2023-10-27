"use client"
import Navbar from "@/components/navbar"
import axios from "axios"
import { useEffect, useState } from "react"
//need to add department edit menu here
import Editmenudepartment from "@/components/Editmenudepartment"
export default function employee(){
    const [name,setName]=useState("")
    const [location,setLocation]=useState("")
    const [managerid,setManagerid]=useState()
    const [employees,setEmployees]=useState([])
    const [departments,setDepartments]=useState([])
    const [loading,setLoading]=useState(true)
    //state to show popup for edit
    const [open,setOpen]=useState(false)

    //state to store id of department here
    const [id,setId]=useState(" ")
    async function getEmployee(){
        let response=await axios.get("/api/employee/getEmployee")
        if(response.data.message==="success"){
            setEmployees(response.data.employees)
        }
    }
    async function getDepartment(){
        let response=await axios.get("/api/department/getDepartment")
        if(response.data.message==="success"){
            setDepartments(response.data.department)
            setLoading(false)
        }
        
    }
    useEffect(()=>{

        getEmployee()
        getDepartment()
    },[])

    async function addHandler(){
        let response=await axios.post("/api/department/createDepartment",
        {
            DepartmentName:name,
            Location:location,
            ManagerId:document.querySelector("#managerid").value
        })
        if(response.data.message==="success"){
            alert("department added")
            setName("")
            setLocation("")
            setManagerid("")
            getDepartment()
            
        }else{
            alert(response.data.message)
        }
    }

    async function deleteHandler(e){
        let response=await axios.post("/api/department/deleteDepartment",{
            id:e.target.id
        })
        if(response.data.message==="success"){
            alert("successfully deleted")
            getDepartment()
        }else{
            alert(response.data.message)
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
                    <div className=" font-bold text-2xl">ADD DEPARTMENT</div>
                    <input type="text" placeholder="department name" className="m-5"  value={name} onChange={(e)=>setName(e.target.value)} ></input>
                    <input type="email" placeholder="department location" className="m-5" value={location} onChange={(e)=>setLocation(e.target.value)}  ></input>
                    <p className=" font-bold text-white mb-1" >select manager</p>
                    <select id="managerid" >
                        {employees.map((employee)=>{
                            return(
                                <option key={employee._id} value={employee._id} >{employee.EmployeeName}</option>
                            )
                        })}
                    </select>

                    <button className="border border-white font-bold w-16 m-5   text-white " onClick={addHandler} >ADD</button>
                </div>
                <div className="flex flex-col justify-evenly items-center border border-white employee-main-container">

                    <div className=" font-bold text-2xl">
                    DEPARTMENTS
                    </div>
                        {loading?<div className=" font-bold text-2xl">loading .... </div> : 
                                            departments.map((department)=>{
                                                return(
                                                    <div className="flex justify-evenly employeesubcontainer items-center rounded p-4" key={department._id}>
                                                            <div className="flex-1 p-2">
                                                                {department.DepartmentName}
                                                            </div>
                                                            <div className="flex-1 p-2">
                                                                {department.Location}
                                                            </div>
                                                            <div className="flex-1 p-2">
                                                                {department.ManagerId}
                                                            </div>
                                                            <button id={department._id } className="flex-1 font-bold" onClick={deleteHandler} >DELETE</button>
                                                            <button id={department._id } className="flex-1 font-bold" onClick={editHandler}  >EDIT</button>
                        
                                                    </div>
                        
                                                )
                                            })
                        }

                </div>
            </div>

             {open? <Editmenudepartment openState={setOpen}  id={id}  employees={employees} setDepartments={setDepartments} getDepartment={getDepartment}   /> : <div></div> }

        </div>
    )
}