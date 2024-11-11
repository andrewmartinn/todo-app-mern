import { z } from "zod";

export const todoFormSchema = z.object({
  text: z.string().min(1, "Todo text is required"),
  category: z.enum(["work", "personal"], {
    message: "Please select a type",
  }),
});

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be atleast 8 characters"),
});

export const registerFormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be atleast 8 characters"),
});

export type ITodoForm = z.infer<typeof todoFormSchema>;
export type ILoginForm = z.infer<typeof loginFormSchema>;
export type IRegisterForm = z.infer<typeof registerFormSchema>;
