type Category = "work" | "personal";

export interface ITodo {
  id: number;
  text: string;
  category: Category;
  isComplete: boolean;
  createdAt: number;
}
