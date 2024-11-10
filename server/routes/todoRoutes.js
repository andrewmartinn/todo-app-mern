import express from "express";
import { getAllTodos } from "../controllers/todoController.js";

const todoRouter = express.Router();

todoRouter.get("/", getAllTodos);

export default todoRouter;
