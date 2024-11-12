import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const todoSchema = new Schema({
  text: { type: String, required: true },
  category: { type: String, required: true },
  isComplete: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Todo = models.Todo || model("Todo", todoSchema);

export default Todo;
