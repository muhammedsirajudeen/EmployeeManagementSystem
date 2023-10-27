import { useEffect, useState } from "react"
import axios from "axios"
export default function Editmenuassign({setOpen,id,setEmployees}){
    const [departments,setDepartments]=useState([])
    const [employee,setEmployee]=useState()
    const [department,setDepartment]=useState("")
    const [location,setLocation]=useState("")
    async function getDepartment(){
        let response=await axios.get("/api/department/getDepartment")
        if(response.data.message==="success"){
            setDepartments(response.data.department)
        }
    }
    async function getEmployee(){
        let response=await axios.get("/api/employee/getEmployee")
        if(response.data.message==="success"){
            setEmployees(response.data.employees)
        }
    }
    async function getEmployeeById(){
        let response=await axios.post("/api/employee/getEmployeebyid",{
            id:id
        })
        if(response.data.message==="success"){
            let employee=response.data.employee
            setEmployee(employee)
            employee.Department ? setDepartment(employee.Department) : setDepartment("")
            employee.Location ? setLocation(employee.Location) : setLocation("")

        }else{
            alert("please refresh the page")
        }
    }
    useEffect(()=>{
        getDepartment()
        getEmployeeById()
     
    },[])
    async function assignHandler(){
        let employeedata=employee
        employeedata.Department=document.querySelector("#department__select").value
        employeedata.Location=document.querySelector("#location__select").value
        console.log(employeedata)
        let response=await axios.post("/api/assign/assignemployee",employeedata)
        if(response.data.message==="success"){
            alert("assigned successfully")
            setDepartment(document.querySelector("#department__select").value)
            setLocation(document.querySelector("#location__select").value)
            getEmployee()
            
        }else{
            alert("re assign")
        }
    }
    return(
        <div className="fixed w-96 h-96 bg-white top-40 pop__container rounded-lg text-black ">
            <div className="flex flex-col items-center justify-center">
                <div className=" font-bold  " onClick={()=> setOpen(false)}  >X</div>

                <p className="m-1 font-bold" >current department: {department} </p>
                <p className="font-bold" >current location: {location} </p>

                <select id="department__select" className="m-10"  >
                    {departments.map((department)=>{
                        return(
                           <option key={department._id} value={department.DepartmentName}> {department.DepartmentName} </option> 
                            
                           )
                    })}
                </select>

                <select id="location__select" className="m-10"  >
                    {departments.map((department)=>{
                        return(
                           <option key={department._id} value={department.Location}> {department.Location} </option> 
                            
                           )
                    })}
                </select>



                <button className="border border-black bg-black text-white rounded-xl font-semibold  m-10" id={id} onClick={assignHandler} >ASSIGN</button>



            </div>
        </div>
    )
}