import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRegisterForm, registerFormSchema } from "../utils/validator";
import useAuth from "../hooks/useAuth";

interface RegisterFormProps {
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ setCurrentView }) => {
  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IRegisterForm>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerFormSchema),
  });

  const handleFormSubmit: SubmitHandler<IRegisterForm> = async (values) => {
    try {
      await registerUser(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-[350px] rounded-lg bg-white p-10 shadow-sm">
      <h1 className="mb-4 text-left text-3xl font-bold">Register</h1>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Username</label>
          <input
            {...register("username")}
            type="text"
            className="w-full rounded-md border border-gray-300 px-3 py-1"
          />
          {errors.username && (
            <p className="text-sm text-red-400">{errors.username.message}</p>
          )}
        </div>
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
          Register
        </button>
        <p
          className="mt-4 cursor-pointer text-center text-sm hover:underline"
          onClick={() => setCurrentView("Login")}
        >
          Have an account? Login Here
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
