import connectDB from "../../../../helper/dbConnect"
import mongoose from "mongoose"
export default async function handler(req,res){
    if(mongoose.connection.readyState===0){
        await connectDB()
    }
    res.status(200).json({message:"hey"})
}