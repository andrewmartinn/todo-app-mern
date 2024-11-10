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
