import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({

name:{
  type:String,
  required:true
},

email:{
  type:String,
  required:true,
  unique:true
},

password:{
  type:String
},

age:{
  type:Number
},

profileImage: {
  type: String,
  default: ""
},

googleId:{
  type:String
},

isVerified: {
  type: Boolean,
  default: false
},

resetToken: {
  type: String,
  default: null
},

resetTokenExpires: {
  type: Date,
  default: null
}

})

export default mongoose.model("User",UserSchema)