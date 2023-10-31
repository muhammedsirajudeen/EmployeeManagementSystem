import mongoose from "mongoose"
import Department from "../../../../model/Department"
import connectDB from "../../../../helper/dbConnect"
export default async function Handler(req,res){
    if(mongoose.connection.readyState===0){
        await connectDB()
    }
    if(req.method==="GET"){
        try{
            let docs=await Department.find()
            if(docs){
                res.json({message:"success",department:docs})
    
            }else{
                res.json({message:"success",department:[]})
    
            }
        }catch(error){
            console.log(error)
            res.status(501).json({message:"error"})
        }
    
    }
}