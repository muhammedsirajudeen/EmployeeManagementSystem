import { useEffect, useState } from "react"
import axios from "axios"
export default function Editmenudepartment({openState,id,employees,setDepartments,getDepartment}){
    
    const [managerid,setManagerid]=useState()
   
    const [managername,setManagername]=useState()
    useEffect(()=>{
        async function getDepartmentById(){
            let response=await axios.post("/api/department/getDepartmentbyid",{
                id:id
            })
            if(response.data.message==="success"){
                let department=response.data.department
                document.querySelector("#name").value=department.DepartmentName
                document.querySelector("#location").value=department.Location
                let idresponse  =await axios.post("/api/employee/getEmployeebyid",
                {
                    id:department.ManagerId
                })
                if(idresponse.data.message==="success"){
                    console.log(idresponse.data.employee)
                    setManagerid(idresponse.data.employee._id)
                    setManagername(idresponse.data.employee.EmployeeName)
                    let employee=idresponse.data.employee

                }

            }else{
                alert("please refresh the page")
            }
        }
        getDepartmentById()
    },[])

    function clickHandler(){
        openState(false)
    }
    async function editHandler(e){
        //post data to server here
        let response=await axios.post("/api/department/editDepartment",
        {
            id:id,
            DepartmentName:document.querySelector("#name").value,
            Location:document.querySelector("#location").value,
            ManagerId:document.querySelector("#managerid__edit").value,
        }
        )
        if(response.data.message==="success"){
            alert("data edited successfully")
            getDepartment()
            document.querySelector("#closebutton").click()
        }else{
            alert(response.data.message)
        }
        

    }
    return(
        <div className="fixed top-40 rounded-lg   w-96 bg-white text-black border h-auto ">
            
            <div className="flex flex-col items-center justify-center w-full ">
                    <div className=" w-80 flex justify-end">
                        <div className="font-bold text-xl " onClick={clickHandler} id="closebutton"  >X</div>
                    </div>

                    <input type="text" id="name"  placeholder="department name" className="m-5 border border-black"   ></input>
                    <input type="email"  id="location" placeholder="department location" className="m-5 border border-black "  ></input>
                    <p>CURRENT MANAGER <span className="font-bold">{managername}</span> </p>
                    <p className="m-5" >  select your current manager to update data</p>
                    <select id="managerid__edit" >
                        {employees.map((employee)=>{
                            
                         
                                return(
                                    <option key={employee._id} value={employee._id} selected="true"   >{employee.EmployeeName}</option>
                                )
    
                            
                          
                           
                        })}
                    </select>
                    <button  className=" addbutton border border-black font-bold w-16 m-5   text-black " onClick={editHandler} >UPDATE</button>



            </div>

        </div>
    )
}