import { useContext } from "react";
import TodoContext, { TodoContextType } from "../context/TodoContext";

const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext);

  if (context === undefined) {
    throw new Error("useTodo must be used within a useTodoContextProvider");
  }

  return context;
};

export default useTodo;
