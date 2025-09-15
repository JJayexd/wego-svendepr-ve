import { useForm } from "react-hook-form";
import { useAuth } from "../../Providers/AuthProvider";
import { useEffect } from "react";
import { useFetch } from "../../Hooks/useFetch";

export const LoginForm = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loginData, setLoginData } = useAuth();
  const { data, loading, error, doFetch } = useFetch();

  const onSubmit = (formData) => {
    doFetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  };

  useEffect(() => {
    if (data) {
      setLoginData(data);
      sessionStorage.setItem("accessToken", JSON.stringify(data));
      if (onClose) onClose();
    }
  }, [data, setLoginData, onClose]);

  // Hooks er kørt så kørers der Conditional Rendering.
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white rounded-lg shadow-lg w-[350px] p-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 hover:text-black"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">LOGIN</h2>

        {!loginData ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <label className="font-semibold">Email</label>
            <input
              type="username"
              {...register("username", { required: "Email er påkrævet" })}
              className="w-full p-2 border rounded"
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}

            <label className="font-semibold">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password er påkrævet" })}
              className="w-full p-2 border rounded"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              {loading ? "Logger ind.." : "Login"}
            </button>
          </form>
        ) : (
          <p className="text-center">Du er allerede logget ind</p>
        )}
      </div>
    </div>
  );
};
