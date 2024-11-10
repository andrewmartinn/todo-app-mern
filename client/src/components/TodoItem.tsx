import { ITodo } from "../types";
import useTodo from "../hooks/useTodo";
import { useEffect, useRef, useState } from "react";

interface TodoItemProps {
  todo: ITodo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { handleTodoDelete, handleTodoUpdate, toggleTodoComplete } = useTodo();

  const [todoText, setTodoText] = useState(todo.text);
  const [isEditing, setIsEditing] = useState(false);

  const todoInputRef = useRef<HTMLInputElement>(null);
  const isTodoComplete = todo.isComplete;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  };

  const handleInputBlur = async () => {
    if (todoText !== todo.text) {
      await handleTodoUpdate(todo._id, todoText);
    }
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing && todoInputRef.current) {
      todoInputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div
      className={`flex items-center rounded-lg bg-white p-4 shadow-sm ${isTodoComplete ? "opacity-75" : ""}`}
    >
      <label
        htmlFor={`todo-checkbox-${todo._id}`}
        className="mr-4 flex cursor-pointer items-center"
      >
        <input
          ref={todoInputRef}
          type="checkbox"
          id={`todo-checkbox-${todo._id}`}
          checked={todo.isComplete}
          onChange={() => toggleTodoComplete(todo._id)}
          className="hidden"
        />
        <span
          className={`custom-bubble ${todo.category} ${isTodoComplete ? "checked" : ""}`}
        ></span>
      </label>
      <div className="flex-1">
        <input
          type="text"
          value={todoText}
          readOnly={!isEditing}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          className={` ${isEditing ? "border border-gray-300" : "border-none outline-none"} ${isTodoComplete ? "line-through" : ""} w-[98%] rounded py-1 pl-2`}
        />
      </div>
      <div className="flex items-center gap-2">
        {!isEditing ? (
          <>
            <button
              onClick={handleEditClick}
              disabled={isTodoComplete}
              className="rounded-md bg-primary-200 px-3 py-[0.3rem] text-sm text-white transition-opacity duration-[200ms] ease-in-out hover:opacity-75 disabled:pointer-events-none"
            >
              Edit
            </button>
            <button
              disabled={isTodoComplete}
              onClick={() => handleTodoDelete(todo._id)}
              className="rounded-md bg-primary-100 px-3 py-[0.3rem] text-sm text-white transition-opacity duration-[200ms] ease-in-out hover:opacity-75 disabled:pointer-events-none"
            >
              Delete
            </button>
          </>
        ) : (
          <button
            onClick={handleInputBlur}
            className="rounded-md bg-orange-300 px-3 py-[0.3rem] text-sm text-white transition-opacity duration-[200ms] ease-in-out hover:opacity-75 disabled:pointer-events-none"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
