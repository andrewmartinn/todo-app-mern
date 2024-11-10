import { createContext, useState } from "react";
import { ITodo } from "../types";

export interface TodoContextType {
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  handleTodoDelete: (id: number) => void;
  handleTodoUpdate: (id: number, newTodoText?: string) => void;
  toggleTodoComplete: (id: number) => void;
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
      category: "work",
      isComplete: false,
      createdAt: new Date().getTime(),
    },
    {
      id: 2,
      text: "Todo 2",
      category: "personal",
      isComplete: false,
      createdAt: new Date().getTime(),
    },
    {
      id: 3,
      text: "Todo 3",
      category: "personal",
      isComplete: false,
      createdAt: new Date().getTime(),
    },
    {
      id: 4,
      text: "Todo 4",
      category: "personal",
      isComplete: true,
      createdAt: new Date().getTime(),
    },
  ]);

  const handleTodoDelete = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
  };

  const handleTodoUpdate = (id: number, newTodoText?: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((item) =>
        item.id === id
          ? {
              ...item,
              text: newTodoText ?? item.text,
            }
          : item,
      ),
    );
  };

  const toggleTodoComplete = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((item) =>
        item.id === id ? { ...item, isComplete: !item.isComplete } : item,
      ),
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        handleTodoDelete,
        handleTodoUpdate,
        toggleTodoComplete,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
