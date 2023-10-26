import connectDB from "../../../../helper/dbConnect"
import mongoose from "mongoose"
import Department from "../../../../model/Department"
export default async function Handler(req,res){
    if(mongoose.connection.readyState===0){
        await connectDB()
    }
    if(req.method==="POST"){
        const id=req.body.id
        try{
            let docs=await Department.findById(id)
            if(docs){
                res.status(200).json({message:"success",department:docs})
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