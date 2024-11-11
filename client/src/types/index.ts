import { JwtPayload } from "jwt-decode";
import { ILoginForm, IRegisterForm } from "../utils/validator";

type Category = "work" | "personal";

export interface ITodo {
  _id: string;
  text: string;
  category: Category;
  isComplete: boolean;
  createdAt: string;
}

export interface IApiResponse<T> {
  success: boolean;
  message?: string;
  todos?: ITodo[];
  newTodo?: T;
  updatedTodo?: T;
  deletedTodo?: T;
}

export interface AuthContextType {
  token: string | null;
  user: string | null;
  userId: string | null;
  error: string | null;
  logoutUser: () => void;
  loginUser: (values: ILoginForm) => Promise<void>;
  registerUser: (values: IRegisterForm) => Promise<void>;
}

export interface CustomJwtPayload extends JwtPayload {
  username: string;
  userId: string;
}
