import useAuth from "../hooks/useAuth";

const Header: React.FC = () => {
  const { user, logoutUser } = useAuth();
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-3xl font-semibold">
        Hey there, <span className="capitalize">{user}</span>
      </h1>
      <button
        onClick={logoutUser}
        className="rounded-lg bg-primary-500 px-3 py-1 text-white transition duration-[200ms] ease-in-out hover:opacity-75"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
