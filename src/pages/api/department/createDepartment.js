import mongoose from "mongoose"
import connectDB from "../../../../helper/dbConnect"
import Department from "../../../../model/Department"
export default async function Handler(req,res){
        
    if(mongoose.connection.readyState===0){
        await connectDB()
    }
    if(req.method==="POST"){
        try{
            const managerid=req.body.ManagerId
            let doc=await Department.findOne({ManagerId:managerid})
            if(doc){
                res.status(200).json({message:"manager already assigned"})
            }else{
                let newDepartment=Department(req.body)
                await newDepartment.save()
                res.status(200).json({message:"success"})    
            }
        }catch(error){
            console.log(error)
            res.status(501).json({message:"error"})

        }
    }
}