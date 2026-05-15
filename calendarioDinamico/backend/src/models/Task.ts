import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema({

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  date:{
    type:Date,
    required:true
  },

  startTime:{
    type:String,
    required:true
  },

  endTime:{
    type:String,
    required:true
  },

  location:{
    type:String
  },

  description:{
    type:String
  },

  points:{
    type:Number,
    default:0
  },

  status:{
    type:String,
    enum:["todo","doing","done"],
    default:"todo"
  },

  completedAt: {
  type: Date,
  default: null
  }

})

export default mongoose.model("Task",TaskSchema)