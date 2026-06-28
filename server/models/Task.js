import mongoose from "mongoose";

const STATUS_OPTIONS = ["Todo", "In Progress", "Completed"];
const PRIORITY_OPTIONS = ["Low", "Medium", "High"];

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [80, "Title cannot exceed 80 characters"]
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: ""
    },
    status: {
      type: String,
      enum: {
        values: STATUS_OPTIONS,
        message: "Status must be Todo, In Progress, or Completed"
      },
      default: "Todo"
    },
    priority: {
      type: String,
      enum: {
        values: PRIORITY_OPTIONS,
        message: "Priority must be Low, Medium, or High"
      },
      default: "Medium"
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"]
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export { PRIORITY_OPTIONS, STATUS_OPTIONS };
export default mongoose.model("Task", taskSchema);
