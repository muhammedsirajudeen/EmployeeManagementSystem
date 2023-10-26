import connectDB from "../../../../helper/dbConnect"
import mongoose from "mongoose"
import Employee from "../../../../model/Employee"
export default async function handler(req,res){
    if(mongoose.connection.readyState===0){
        await connectDB()
    }
    if(req.method==="GET"){
        try{
            let docs=await Employee.find()
            res.status(200).json({message:"success",employees:docs})
        }catch(error){
            console.log(error)
            res.status(501).json({message:"error"})
        }
        res.status(200).json({message:"hey"})
    
    }
}