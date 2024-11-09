import { ITodo } from "../types";
import TodoItem from "./TodoItem";

const todosData: ITodo[] = [
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
];

const TodoList: React.FC = () => {
  return (
    <section className="my-10">
      <h3 className="text-sm font-bold uppercase text-slate-500">Todo List</h3>
      <div className="mt-4 flex flex-col gap-4">
        {todosData.map((item) => (
          <TodoItem key={item.id} todo={item} />
        ))}
      </div>
    </section>
  );
};

export default TodoList;
