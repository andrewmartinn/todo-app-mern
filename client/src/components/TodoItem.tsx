import { ITodo } from "../types";
import useTodo from "../hooks/useTodo";

interface TodoItemProps {
  todo: ITodo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { handleTodoDelete, handleTodoUpdate } = useTodo();

  const isTodoComplete = todo.isComplete;

  return (
    <div
      className={`flex items-center rounded-lg bg-white p-4 shadow-sm ${isTodoComplete ? "opacity-75" : ""}`}
    >
      <label
        htmlFor={`todo-checkbox-${todo.id}`}
        className="mr-4 flex cursor-pointer items-center"
      >
        <input
          type="checkbox"
          id={`todo-checkbox-${todo.id}`}
          checked={todo.isComplete}
          onChange={() => handleTodoUpdate(todo.id)}
          className="hidden"
        />
        <span
          className={`custom-bubble ${todo.type} ${isTodoComplete ? "checked" : ""}`}
        ></span>
      </label>
      <div className="flex-1">
        <input
          type="text"
          value={todo.text}
          readOnly
          className={`${isTodoComplete ? "line-through" : ""} appearance-none border-none outline-none`}
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
          onClick={() => handleTodoDelete(todo.id)}
          className="bg-primary-100 rounded-md px-3 py-[0.3rem] text-sm text-white transition-opacity duration-[200ms] ease-in-out hover:opacity-75 disabled:pointer-events-none"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
