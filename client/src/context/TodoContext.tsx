import { createContext, useState } from "react";
import { ITodo } from "../types";

export interface TodoContextType {
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  handleTodoDelete: (id: number) => void;
  handleTodoUpdate: (id: number) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoContextProviderProps {
  children: React.ReactNode;
}

export const TodoContextProvider: React.FC<TodoContextProviderProps> = ({
  children,
}) => {
  const [todos, setTodos] = useState<ITodo[]>([
    {
      id: 1,
      text: "Todo 1",
      type: "work",
      isComplete: false,
    },
    {
      id: 2,
      text: "Todo 2",
      type: "personal",
      isComplete: false,
    },
    {
      id: 3,
      text: "Todo 3",
      type: "personal",
      isComplete: false,
    },
    {
      id: 4,
      text: "Todo 4",
      type: "personal",
      isComplete: true,
    },
  ]);

  const handleTodoDelete = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
  };

  const handleTodoUpdate = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((item) =>
        item.id === id ? { ...item, isComplete: !item.isComplete } : item,
      ),
    );
  };

  return (
    <TodoContext.Provider
      value={{ todos, setTodos, handleTodoDelete, handleTodoUpdate }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
