import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TodoContextProvider } from "./context/TodoContext.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TodoContextProvider>
      <App />
      <Toaster position="top-right" />
    </TodoContextProvider>
  </StrictMode>,
);
