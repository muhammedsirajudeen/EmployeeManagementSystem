import connectDB from "../../../../helper/dbConnect"
import mongoose from "mongoose"
import Employee from "../../../../model/Employee"
export default async function Handler(req,res){
    if(mongoose.connection.readyState===0){
        await connectDB()
    }
    if(req.method==="POST"){
        try{
            let employeedata=req.body
            let id=req.body._id
            delete employeedata._id
            delete employeedata.__v

            const update={$set: {Department: employeedata.Department ,Location:employeedata.Location }}
            await Employee.updateOne({_id:id},update )
            res.status(200).json({message:"success"})
        }catch(error){
            console.log(error)
            res.status(501).json({message:"error"})
        }
    }
}