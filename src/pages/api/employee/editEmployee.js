import connectDB from "../../../../helper/dbConnect"
import Employee from "../../../../model/Employee"
import mongoose from "mongoose"
export default async function Handler(req,res){
    if(mongoose.connection.readyState===0){
        await connectDB()
    }
    if(req.method==="POST"){
        try{
            const id=req.body.id
            let employee=req.body
            delete employee.id
            await Employee.findByIdAndUpdate(id,employee)

            res.status(200).json({message:"success"})

        }
        catch(error){
            console.log(error)
            res.status(501).json({message:"error"})
        }
    }
}