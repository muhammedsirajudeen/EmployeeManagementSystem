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
        Experience:Number,
        Department:{
          type:String,
          default:"unassigned"
        },
        Location:{
          type:String,
          default:"unassigned"
        }
    }
  )

  Employee = mongoose.model('Employee', EmployeeSchema);
}

export default Employee;