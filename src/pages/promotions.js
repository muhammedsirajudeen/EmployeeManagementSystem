import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Editmenupromote from "@/components/Editmenupromote";
export default function Promotions(){
    const [employees,setEmployees]=useState([])
    const [open,setOpen]=useState(false)
    const [id,setId]=useState("")
    async function getEmployee(){
        let response=await axios.get("/api/employee/getEmployee")
        if(response.data.message==="success"){
            setEmployees(response.data.employees)
        }
    }
    useEffect(()=>{
        getEmployee()
    },[])
    function promoteHandler(e){
        setId(e.target.id)
        open ? setOpen(false) :setOpen(true)
    }
    return (
        <div className="flex flex-col justify-center items-center w-screen" >
            <Navbar/>
            {employees.map((employee)=>{
                if(employee.Experience>=5){
                    return(
                        <div className={`flex border h-10 min-w-full border-white text-white m-10   items-center ${open?"blur":""}  `} key={employee._id}>
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
                        <div className="flex-1 p-2">
                            {employee.Department}
                        </div>
                        <div className="flex-1 p-2">
                            {employee.Location}
                        </div>


                        <button id={employee._id} className="border border-white mr-10 h-5 " onClick={promoteHandler}  >PROMOTE</button>
                        


        </div>
                    )
                }
            })}
            {open? <Editmenupromote setOpen={setOpen} id={id}  /> :<div></div>}
        </div>
    )
}