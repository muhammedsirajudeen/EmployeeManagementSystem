import mongoose from 'mongoose';
let Department;

if (mongoose.models && mongoose.models.Department) {
  Department = mongoose.models.Department;
} else {
  const DepartmentSchema=new mongoose.Schema(
    {
        DepartmentName:String,
        Location:String,
        ManagerId:String,
    }
  )

  Department = mongoose.model('Department', DepartmentSchema);
}

export default Department;