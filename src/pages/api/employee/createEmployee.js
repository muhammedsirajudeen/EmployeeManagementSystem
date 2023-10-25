import mongoose from "mongoose"
import connectDB from "../../../../helper/dbConnect"
import EmployeeModel from "../../../../model/Employee"
import Employee from "../../../../model/Employee"
export default async function Handler(req,res){
    if(mongoose.connection.readyState===0){
        await connectDB()
    }

    if(req.method==="POST"){
        console.log(req.body)
        try{
            let newEmployee=Employee(req.body)
            await newEmployee.save()
            res.status(200).json({message:"success"})
        }catch(error){
            console.log(error)
            res.status(501).json({message:"success"})
        }
    }
}