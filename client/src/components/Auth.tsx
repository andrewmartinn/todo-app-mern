import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Auth: React.FC = () => {
  const [currentView, setCurrentView] = useState("Login");
  return (
    <main className="min-h-screen w-full bg-gray-100 font-dm-sans antialiased">
      <div className="container mx-auto flex min-h-screen max-w-5xl items-center justify-center p-4">
        {currentView === "Login" && (
          <LoginForm setCurrentView={setCurrentView} />
        )}
        {currentView === "Register" && (
          <RegisterForm setCurrentView={setCurrentView} />
        )}
      </div>
    </main>
  );
};

export default Auth;
