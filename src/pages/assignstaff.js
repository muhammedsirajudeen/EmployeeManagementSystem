import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "@/components/navbar"
import Editmenuassign from "@/components/Editmenuassign"
import styles from "@/styles/signin.module.css"

export default function Assignstaff(){

    const [employees,setEmployees]=useState([])
    const [open,setOpen]=useState(false)
    const [id,setId]=useState("")
    const [loading,setLoading]=useState(true)
    async function getEmployee(){
        let response=await axios.get("/api/employee/getEmployee")
        console.log(response)
        if(response.data.message==="success"){
            setEmployees(response.data.employees)
            setLoading(false)
        }
    }
    useEffect(()=>{
        getEmployee()
    },[])
    function assignHandler(e){
        setId(e.target.id)
        open? setOpen(false) : setOpen(true)


    }
    return(
        <div className={`flex flex-col justify-start items-center ${styles.employeecontainer} bg-boxcolor overflow-x-hidden `} >
            <Navbar/>
            <h1 className="text-black font-bold mt-10 ">ASSIGN STAFF TO DEPARTMENTS</h1>
            {loading ? <div className=" font-bold text-2xl">loading....</div>:
                            employees.map((employee)=>{
                                return(
                                    <div className={`${styles.employeesubcontainer} flex border h-10  border-white text-white  m-10  bg-boxcolor  items-center ${open?"blur":""} `} key={employee._id}>
                                                    <div className="border border-white flex-1  p-2">
                                                        {employee.EmployeeName}
                                                    </div>
                                                    <div className="flex-1 border p-2">
                                                        {employee.EmployeeEmail}
                                                    </div>
                                                    <div className="flex-1 border p-2">
                                                        {employee.EmployeeContact}
                                                    </div>
                                                    <div className="flex-1 border p-2">
                                                        {employee.DateOfJoining.slice(0, 10)}
                                                    </div>
                                                    <div className="flex-1 border p-2">
                                                        {employee.Experience}
                                                    </div>
                                                    <div className="flex-1 border p-2">
                                                        {employee.Department}
                                                    </div>
                                                    <div className="flex-1 border p-2">
                                                        {employee.Location}
                                                    </div>
                
                
                                                    <button id={employee._id} className="border border-white mr-10 h-5 " onClick={assignHandler}  >ASSIGN</button>
                
                
                                    </div>
                
                                )
                            })
                
            }

        {open?    <Editmenuassign setOpen={setOpen} setEmployees={setEmployees} id={id} />         :<div></div>  }
        </div>
    )
}