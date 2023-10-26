import { useEffect, useState } from "react"
import axios from "axios"
export default function Editmenuemployee({openState,id,getEmployee,setEmployees}){


    useEffect(()=>{
        async function getEmployeeById(){
            let response=await axios.post("/api/employee/getEmployeebyid",{
                id:id
            })
            if(response.data.message==="success"){
                let employee=response.data.employee
                document.querySelector("#name").value=employee.EmployeeName
                document.querySelector("#email").value=employee.EmployeeEmail
                document.querySelector("#contact").value=employee.EmployeeContact
                document.querySelector("#date").value=employee.DateOfJoining.slice(0,10)
                document.querySelector("#experience").value=employee.Experience
                document.querySelector(".addbutton").id=employee._id

            }else{
                alert("please refresh the page")
            }
        }
        getEmployeeById()

    },[])

    function clickHandler(){
        openState(false)
    }
    async function editHandler(e){
        //post data to server here
      
        let response=await axios.post("/api/employee/editEmployee",
        {
            id:id,
            EmployeeName:document.querySelector("#name").value,
            EmployeeEmail:document.querySelector("#email").value,
            EmployeeContact:document.querySelector("#contact").value,
            DateOfJoining:document.querySelector("#date").value,
            Experience:document.querySelector("#experience").value
        }
        )
        if(response.data.message==="success"){
            alert("data edited successfully")
            getEmployee()
            document.querySelector("#closebutton").click()
        }else{
            alert("re edit the data")
        }

    }
    return(
        <div className="fixed top-40 rounded-lg   w-96 bg-white text-black border h-auto ">
            
            <div className="flex flex-col items-center justify-center w-full ">
                    <div className=" w-80 flex justify-end">
                        <div className="font-bold text-xl " onClick={clickHandler} id="closebutton"  >X</div>
                    </div>

                    <input type="text" id="name"  placeholder="employee name" className="m-5 border border-black"   ></input>
                    <input type="email"  id="email" placeholder="employee email" className="m-5 border border-black "  ></input>
                    <input type="number" id="contact" placeholder="employee contact" className="m-5 border border-black"   ></input>

                    <input type="date"    id="date" pattern="\d{4}-\d{2}-\d{2}" placeholder="employee joining date" className="m-5 border border-black "  ></input>
                    <input type="number"  id="experience" placeholder="employee experience" className="m-5 border border-black "  ></input>
                    <button  className=" addbutton border border-black font-bold w-16 m-5   text-black " onClick={editHandler} >ADD</button>



            </div>

        </div>
    )
}