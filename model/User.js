import mongoose from 'mongoose';
let User;

if (mongoose.models && mongoose.models.User) {
  User = mongoose.models.User;
} else {
  const UserSchema=new mongoose.Schema(
    {
        name:String,
        email:String,
        password:String
    }
  )

  User = mongoose.model('User', UserSchema);
}

export default User;