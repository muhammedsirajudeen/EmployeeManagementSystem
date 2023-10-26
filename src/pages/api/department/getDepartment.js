import mongoose from "mongoose"
import Department from "../../../../model/Department"
export default async function handler(req,res){
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