import mongoose from "mongoose"
import connectDB from "../../../../helper/dbConnect"
import Department from "../../../../model/Department"
import User from "../../../../model/User"
export default async function Handler(req,res){
        
    if(mongoose.connection.readyState===0){
        await connectDB()
    }
    if(req.method==="POST"){
        try{
            let {email,password}=req.body
            let user=await User.findOne({email:email})
            if(user){
                if(user.email===email && user.password===password){
                    res.status(200).json({message:"success"})

                }else{
                    res.status(200).json({message:"authentication failed"})

                }
            }else{
                res.status(200).json({message:"user not found"})

            }

        }catch(error){
            console.log(error)
            res.status(501).json({message:"error"})

        }
    }
}