import AddTodo from "./components/AddTodo";
import Auth from "./components/Auth";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import useAuth from "./hooks/useAuth";

const App: React.FC = () => {
  const { token, user } = useAuth();
  const isAuthenticated = !!token && !!user;
  return (
    <>
      {isAuthenticated ? (
        <main className="min-h-screen w-full bg-gray-100 font-dm-sans antialiased">
          <div className="container mx-auto max-w-5xl p-4">
            <Header />
            <AddTodo />
            <TodoList />
          </div>
        </main>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default App;
