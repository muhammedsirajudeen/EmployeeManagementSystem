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
            let {name,email,password}=req.body
            let user=await User.findOne({email:email})
            console.log(user)
            if(user){
                res.status(200).json({message:"user already present"})

            }else{
                let newuser=User({name:name,email:email,password:password})
                await newuser.save()
                res.status(200).json({message:"success"})

            }

        }catch(error){
            console.log(error)
            res.status(501).json({message:"error"})

        }
    }
}