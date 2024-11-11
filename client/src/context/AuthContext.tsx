import { createContext, useEffect, useState } from "react";
import { AuthContextType, CustomJwtPayload } from "../types";
import axios, { isAxiosError } from "axios";
import { ILoginForm, IRegisterForm } from "../utils/validator";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const getUserFromToken = (token: string): CustomJwtPayload | null => {
  try {
    return jwtDecode<CustomJwtPayload>(token);
  } catch (error) {
    console.error("Error decoding token: ", error);
    return null;
  }
};

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("userId");
    const storedAuthToken = localStorage.getItem("accessToken");

    if (storedAuthToken && storedUserId && storedUser) {
      setUser(storedUser);
      setUserId(storedUserId);
      setToken(storedAuthToken);
    }
  }, []);

  const loginUser = async (values: ILoginForm): Promise<void> => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/users/login`,
        values,
      );

      if (response.data.success) {
        const { token } = response.data;
        const decodedToken = getUserFromToken(token);

        setToken(token);
        localStorage.setItem("accessToken", token);

        if (decodedToken) {
          setUser(decodedToken.username);
          setUserId(decodedToken.userId);

          localStorage.setItem("userId", decodedToken.userId);
          localStorage.setItem("username", decodedToken.username);
        }

        setError(null);
      }
    } catch (error) {
      console.error("Error logging in: ", error);
      if (isAxiosError(error)) {
        setError(error.response?.data?.message || error.message);
      }
    }
  };

  const registerUser = async (values: IRegisterForm): Promise<void> => {
    console.log(values);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/users/register`,
        values,
      );

      if (response.data.success) {
        const { token } = response.data;
        const decodedToken = getUserFromToken(token);

        setToken(token);
        localStorage.setItem("accessToken", token);

        if (decodedToken) {
          setUser(decodedToken.username);
          setUserId(decodedToken.userId);

          localStorage.setItem("userId", decodedToken.userId);
          localStorage.setItem("username", decodedToken.username);
        }

        setError(null);
      }
    } catch (error) {
      console.error("Error registering user: ", error);
      if (isAxiosError(error)) {
        setError(error.response?.data?.message || error.message);
      }
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken");

    setError(null);
    setToken(null);
    setUser(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        userId,
        error,
        loginUser,
        registerUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
