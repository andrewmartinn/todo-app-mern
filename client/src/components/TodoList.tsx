import useTodo from "../hooks/useTodo";
import TodoItem from "./TodoItem";

const TodoList: React.FC = () => {
  const { todos } = useTodo();

  return (
    <section className="my-10">
      <h3 className="text-sm font-bold uppercase text-slate-500">Todo List</h3>
      <div className="mt-4 flex flex-col gap-4">
        {todos.map((item) => (
          <TodoItem key={item._id} todo={item} />
        ))}
      </div>
    </section>
  );
};

export default TodoList;
