import { useState } from "react";
import { ITodo } from "../types";

interface TodoItemProps {
  todo: ITodo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [checked, setChecked] = useState(todo.isComplete);

  const isTodoComplete = checked;

  return (
    <div
      className={`flex items-center rounded-lg bg-white p-4 shadow-sm ${checked ? "opacity-75" : ""}`}
    >
      <label
        htmlFor={`todo-checkbox-${todo.id}`}
        className="mr-4 flex cursor-pointer items-center"
      >
        <input
          type="checkbox"
          id={`todo-checkbox-${todo.id}`}
          checked={checked}
          onChange={() => setChecked((prevState) => !prevState)}
          className="hidden"
        />
        <span
          className={`custom-bubble ${todo.type} ${checked ? "checked" : ""}`}
        ></span>
      </label>
      <div className="flex-1">
        <input
          type="text"
          value={todo.text}
          readOnly
          className={`${checked ? "line-through" : ""} appearance-none border-none outline-none`}
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          disabled={isTodoComplete}
          className="bg-primary-200 rounded-md px-3 py-[0.3rem] text-sm text-white transition-opacity duration-[200ms] ease-in-out hover:opacity-75 disabled:pointer-events-none"
        >
          Edit
        </button>
        <button
          disabled={isTodoComplete}
          className="bg-primary-100 rounded-md px-3 py-[0.3rem] text-sm text-white transition-opacity duration-[200ms] ease-in-out hover:opacity-75 disabled:pointer-events-none"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
