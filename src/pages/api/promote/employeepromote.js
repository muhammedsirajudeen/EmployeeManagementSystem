import connectDB from "../../../../helper/dbConnect"
import mongoose from "mongoose"
import Department from "../../../../model/Department"
export default async function Handler(req,res){
    if(mongoose.connection.readyState===0){
        await connectDB()
    }
    if(req.method==="POST"){
        try{
            let id=req.body.id
            console.log(id)
            let newmanagerdata=req.body
            delete newmanagerdata.id
            //checking if the manager id has been pre assigned
            let docs=await Department.findOne({ManagerId:id})
            if(docs){
                res.status(200).json({message:"already assigned"})
                
            }else{
                console.log(newmanagerdata)
                await Department.findOneAndUpdate({DepartmentName:newmanagerdata.Department,Location:newmanagerdata.Location},{ManagerId:id})
                res.status(200).json({message:"success"})
            }
           
        }catch(error){  
            console.log(error)
            res.status(200).json({message:"error"})
        }
    }

}