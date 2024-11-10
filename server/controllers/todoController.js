import Todo from "../models/todoModel.js";

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });

    if (!todos) {
      return res
        .status(400)
        .json({ success: false, message: "No Todos found" });
    }

    res.status(200).json({ success: true, todos });
  } catch (error) {
    console.error("Error fetching todos: ", error);
    res.status(500).json({ success: false, message: "Error fetching todos" });
  }
};

const createTodo = async (req, res) => {
  try {
    const { text, category } = req.body;

    if (!text || typeof text !== "string" || text.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Todo text is required" });
    }

    if (!category || typeof category !== "string" || category.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Please select a category" });
    }

    const newTodo = new Todo({
      text,
      category,
    });

    await newTodo.save();

    res.status(201).json({ success: true, newTodo });
  } catch (error) {
    console.error("Error creating todo: ", error);
    res.status(500).json({ success: false, message: "Error creating todo" });
  }
};

const updateTodoText = async (req, res) => {
  try {
    const { id } = req.params;
    const { updatedText } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { text: updatedText },
      { new: true }
    );

    if (!updatedTodo) {
      return res
        .status(400)
        .json({ success: true, message: "Unable to update todo" });
    }

    res.status(200).json({ success: true, updatedTodo });
  } catch (error) {
    console.error("Error updating todo text: ", error);
    res
      .status(500)
      .json({ success: false, message: "Error updating todo text" });
  }
};

const updateTodoStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const todoToUpdate = await Todo.findById(id);

    if (!todoToUpdate) {
      return res
        .status(200)
        .json({ success: false, message: "Unable to update todo status" });
    }

    todoToUpdate.isComplete = !todoToUpdate.isComplete;

    const updatedTodo = await todoToUpdate.save();

    res.status(200).json({ success: true, updatedTodo });
  } catch (error) {
    console.error("Error updating todo status: ", error);
    res
      .status(500)
      .json({ success: false, message: "Error updating todo status" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deleteTodo) {
      return res
        .status(200)
        .json({ success: false, message: "Unable to delete todo" });
    }

    res.status(200).json({ success: true, deletedTodo });
  } catch (error) {
    console.error("Error deleting todo: ", error);
    res.status(500).json({ success: false, message: "Error deleting todo" });
  }
};

export {
  getAllTodos,
  createTodo,
  updateTodoText,
  updateTodoStatus,
  deleteTodo,
};
