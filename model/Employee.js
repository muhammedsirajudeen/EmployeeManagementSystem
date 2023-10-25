import mongoose from 'mongoose';
let Employee;

if (mongoose.models && mongoose.models.Employee) {
  Employee = mongoose.models.Employee;
} else {
  const EmployeeSchema=new mongoose.Schema(
    {
        EmployeeName:String,
        EmployeeEmail:String,
        EmployeeContact:Number,
        DateOfJoining:Date,
        Experience:Number
    }
  )

  Employee = mongoose.model('Employee', EmployeeSchema);
}

export default Employee;