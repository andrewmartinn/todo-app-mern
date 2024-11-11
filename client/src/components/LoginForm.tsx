import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface LoginFormProps {
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
}

const loginFormSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be atleast 8 characters"),
});

type ILoginForm = z.infer<typeof loginFormSchema>;

const LoginForm: React.FC<LoginFormProps> = ({ setCurrentView }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  const handleFormSubmit: SubmitHandler<ILoginForm> = (values) => {
    console.log(values);
  };

  return (
    <div className="w-full max-w-[350px] rounded-lg bg-white p-10 shadow-sm">
      <h1 className="mb-4 text-left text-3xl font-bold">Login</h1>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full rounded-md border border-gray-300 px-3 py-1"
          />
          {errors.email && (
            <p className="text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Password</label>
          <input
            {...register("password")}
            type="password"
            className="w-full rounded-md border border-gray-300 px-3 py-1"
          />
          {errors.password && (
            <p className="text-sm text-red-400">{errors.password.message}</p>
          )}
        </div>
        <button
          disabled={isSubmitting}
          className="mt-3 rounded-lg bg-black px-3 py-2 text-white transition duration-[200ms] ease-in-out hover:opacity-75 disabled:opacity-75"
        >
          Login
        </button>
        <p
          className="mt-4 cursor-pointer text-sm hover:underline"
          onClick={() => setCurrentView("Register")}
        >
          Don't have an account yet? Create one
        </p>
      </form>
    </div>
  );
};

export default LoginForm;