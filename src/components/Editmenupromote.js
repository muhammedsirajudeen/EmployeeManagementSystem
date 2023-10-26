import { useEffect, useState } from "react"
import axios from "axios"
export default function Editmenupromote({setOpen,id}){
    const [departments,setDepartments]=useState([])

    async function getDepartment(){
        let response=await axios.get("/api/department/getDepartment")
        if(response.data.message==="success"){
            setDepartments(response.data.department)
            
        }
    }

    useEffect(()=>{
        getDepartment()
     
    },[])
    async function promoteHandler(){
        //data to server here
        let newmanagerdata={}
        newmanagerdata.id=id
        newmanagerdata.Department=document.querySelector("#department__select").value
        newmanagerdata.Location=document.querySelector("#location__select").value
        let response=await axios.post("/api/promote/employeepromote",newmanagerdata)
        if(response.data.message==="success"){
            alert("promoted the employee successfully")
        }else{
            alert(response.data.message)
        }
    }
    return(
        <div className="fixed w-96 h-96 bg-white top-40 pop__container rounded-lg text-black ">
            <div className="flex flex-col items-center justify-center">
                <div className=" font-bold  " onClick={()=> setOpen(false)}  >X</div>

  

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



                <button className="border border-black bg-black text-white rounded-xl font-semibold  m-10" id={id} onClick={promoteHandler} >PROMOTE</button>



            </div>
        </div>
    )
}