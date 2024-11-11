import { createContext, useEffect, useState } from "react";
import { IApiResponse, ITodo } from "../types";
import axios, { AxiosResponse } from "axios";
import { ITodoForm } from "../utils/validator";
import toast from "react-hot-toast";

export interface TodoContextType {
  todos: ITodo[];
  createTodo: (newTodo: ITodoForm) => Promise<void>;
  handleTodoDelete: (id: string) => Promise<void>;
  handleTodoUpdate: (id: string, newTodoText: string) => Promise<void>;
  toggleTodoComplete: (id: string) => Promise<void>;
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

  const handleTodoUpdate = async (id: string, newTodoText: string) => {
    try {
      const response: AxiosResponse<IApiResponse<ITodo>> = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/todos/update/${id}`,
        {
          updatedText: newTodoText,
        },
      );

      if (response.data.success) {
        const updatedTodo = response.data.updatedTodo;

        setTodos((prevTodos) =>
          prevTodos.map((item) =>
            item._id === updatedTodo?._id
              ? { ...item, text: updatedTodo.text }
              : item,
          ),
        );

        toast.success(`${updatedTodo?.text} Updated`);
      }
    } catch (error) {
      console.error("Error updating todo: ", error);
    }
  };

  const toggleTodoComplete = async (id: string): Promise<void> => {
    try {
      const response: AxiosResponse<IApiResponse<ITodo>> = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/todos/status/${id}`,
      );
      if (response.data.success) {
        const updatedTodo = response.data.updatedTodo;

        setTodos((prevTodos) =>
          prevTodos.map((item) =>
            item._id === updatedTodo?._id
              ? { ...item, isComplete: updatedTodo?.isComplete }
              : item,
          ),
        );

        toast.success(`${updatedTodo?.text} Status Changed`);
      }
    } catch (error) {
      console.error("Error updating todo status: ", error);
    }
  };

  // useEffect(() => {
  //   fetchTodos();
  // }, []);

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
