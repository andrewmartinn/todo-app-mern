import { createContext, useEffect, useState } from "react";
import { IApiResponse, ITodo } from "../types";
import axios, { AxiosResponse } from "axios";
import { ITodoForm } from "../utils/validator";
import toast from "react-hot-toast";

export interface TodoContextType {
  todos: ITodo[];
  createTodo: (newTodo: ITodoForm) => Promise<void>;
  handleTodoDelete: (id: string) => void;
  handleTodoUpdate: (id: string, newTodoText?: string) => void;
  toggleTodoComplete: (id: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoContextProviderProps {
  children: React.ReactNode;
}

export const TodoContextProvider: React.FC<TodoContextProviderProps> = ({
  children,
}) => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const fetchTodos = async (): Promise<void> => {
    try {
      const response: AxiosResponse<IApiResponse<ITodo[]>> = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/todos`,
      );

      if (response.data.success) {
        setTodos(response.data.todos || []);
      }
    } catch (error) {
      console.error("Error fetching todos: ", error);
    }
  };

  const createTodo = async (newTodo: ITodoForm): Promise<void> => {
    try {
      const response: AxiosResponse<IApiResponse<ITodo>> = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/todos`,
        newTodo,
      );

      if (response.data.success && response.data.newTodo) {
        const newTodo = response.data.newTodo;
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        toast.success("Added Todo");
      } else {
        console.error("Error: newTodo is undefined or not valid.");
      }
    } catch (error) {
      console.error("Error creating todo: ", error);
    }
  };

  const handleTodoDelete = async (id: string): Promise<void> => {
    try {
      const response: AxiosResponse<IApiResponse<ITodo>> = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/todos/${id}`,
      );

      if (response.data.success) {
        const deletedTodo = response.data.deletedTodo;
        setTodos((prevTodos) =>
          prevTodos.filter((item) => item._id !== deletedTodo?._id),
        );
        toast.success("Deleted Todo");
      }
    } catch (error) {
      console.error("Error deleting todo: ", error);
    }
  };

  const handleTodoUpdate = (id: string, newTodoText?: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((item) =>
        item._id === id
          ? {
              ...item,
              text: newTodoText ?? item.text,
            }
          : item,
      ),
    );
  };

  const toggleTodoComplete = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((item) =>
        item._id === id ? { ...item, isComplete: !item.isComplete } : item,
      ),
    );
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        createTodo,
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
