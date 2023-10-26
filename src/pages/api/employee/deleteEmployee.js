import mongoose from "mongoose"
import Employee from "../../../../model/Employee"
export default async function Handler(req,res){
    
    if(mongoose.connection.readyState===0){
        await connectDB()
    }
    if(req.method==="POST"){
        const id=req.body.id
        try{
            let docs=await Employee.findById(id)

            if(docs){
                await Employee.findByIdAndRemove(id)
                res.status(200).json({message:"success"})
            }
    
        }catch(error){
            console.log(error)
            res.status(501).json({message:"error"})

        }
    
    }
}