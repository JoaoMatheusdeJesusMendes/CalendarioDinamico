import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  points: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["todo", "done", "late", "cancelled"],
    default: "todo"
  }
}, { timestamps: true })

export default mongoose.model("Task", taskSchema)