import connectDB from "../../../../helper/dbConnect"
import Employee from "../../../../model/Employee"
import mongoose from "mongoose"
export default async function Handler(req,res){
    if(mongoose.connection.readyState===0){
        await connectDB()
    }
    if(req.method==="POST"){
        const id=req.body.id
        try{
            let docs=await Employee.findById(id)
            if(docs){
                res.status(200).json({message:"success",employee:docs})
            }else{
                res.status(200).json({message:"user not found"})
            }
        }
        catch(error){
            console.log(error)
            res.status(501).json({message:"error"})
        }
    }
}