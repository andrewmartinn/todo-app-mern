import { z } from "zod";

export const todoFormSchema = z.object({
  text: z.string().min(1, "Todo text is required"),
  type: z.enum(["Work", "Personal"], {
    message: "Please select a type",
  }),
});

export type ITodoForm = z.infer<typeof todoFormSchema>;
