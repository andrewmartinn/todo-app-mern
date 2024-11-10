import Todo from "../models/todoModel.js";

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({});

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

export { getAllTodos };
