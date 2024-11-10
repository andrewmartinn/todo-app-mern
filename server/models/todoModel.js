import { Schema, models, model } from "mongoose";

const todoSchema = new Schema(
  {
    text: { type: String, required: true },
    category: { type: String, required: true },
    isComplete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Todo = models.Todo || model("Todo", todoSchema);

export default Todo;
