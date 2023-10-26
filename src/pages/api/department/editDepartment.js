import connectDB from "../../../../helper/dbConnect"
import Department from "../../../../model/Department"
import mongoose from "mongoose"
export default async function Handler(req,res){
    if(mongoose.connection.readyState===0){
        await connectDB()
    }
    if(req.method==="POST"){
        try{
            const id=req.body.id
            let department=req.body
            delete department.id
            let docs=await Department.findOne({ManagerId:req.body.ManagerId})
            if(docs){
                console.log(docs._id,id)
                if(docs._id.toHexString()===id){
                    await Department.findByIdAndUpdate(id,department)
                    res.status(200).json({message:"success"})

                }else{
                    res.status(200).json({message:"maanger already assigned"})

                }
            }else{
                await Department.findByIdAndUpdate(id,department)

                res.status(200).json({message:"success"})
    
            }

        }
        catch(error){
            console.log(error)
            res.status(501).json({message:"error"})
        }
    }
}