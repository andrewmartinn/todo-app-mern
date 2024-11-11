import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodoStatus,
  updateTodoText,
} from "../controllers/todoController.js";
import userAuth from "../middlewares/userAuth.js";

const todoRouter = express.Router();

todoRouter.get("/", userAuth, getAllTodos);
todoRouter.post("/", userAuth, createTodo);
todoRouter.patch("/update/:id", userAuth, updateTodoText);
todoRouter.patch("/status/:id", userAuth, updateTodoStatus);
todoRouter.delete("/:id", userAuth, deleteTodo);

export default todoRouter;
