import AddTodo from "./components/AddTodo";
import Header from "./components/Header";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  return (
    <main className="min-h-screen w-full bg-gray-100 font-dm-sans antialiased">
      <div className="container mx-auto max-w-5xl p-4">
        <Header />
        <AddTodo />
        <TodoList />
      </div>
    </main>
  );
};

export default App;
