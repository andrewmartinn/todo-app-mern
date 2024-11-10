import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodoStatus,
  updateTodoText,
} from "../controllers/todoController.js";

const todoRouter = express.Router();

todoRouter.get("/", getAllTodos);
todoRouter.post("/", createTodo);
todoRouter.patch("/update/:id", updateTodoText);
todoRouter.patch("/status/:id", updateTodoStatus);
todoRouter.delete("/:id", deleteTodo);

export default todoRouter;
