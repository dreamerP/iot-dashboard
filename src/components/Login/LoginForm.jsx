import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      await login(data.username, data.password);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img src="sensors_login.png" alt="Enterprise Logo" />
      </div>
      <form className="md:w-1/3 max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center my-10 md:text-left hidden md:block">
          <label className="mr-1 font-bold font-sans text-slate-600 text-4xl">
            Sign in
          </label>
        </div>

        <input
          className={`text-sm w-full px-4 py-2 border border-solid ${errors.username ? "border-red-500" : "border-gray-300"} rounded`}
          type="text"
          placeholder="Email Address"
          {...register("username", { required: "Email Address is required" })}
        />
        {errors.username && (
          <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
        )}

        <input
          className={`text-sm w-full px-4 py-2 border border-solid ${errors.password ? "border-red-500" : "border-gray-300"} rounded mt-4`}
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}

        <div className="mt-4 flex justify-between font-semibold text-sm">
          <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
            <input className="mr-1" type="checkbox" />
            <span>Remember Me</span>
          </label>
          <a
            className="text-blue-500 hover:text-blue-700 hover:underline hover:underline-offset-4"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
        <div className="text-center md:text-left">
          <button
            className="mt-4 w-full bg-gradient-to-r to-cyan-500 from-blue-500 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
          >
            Login
          </button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don&apos;t have an account?{" "}
          <a
            className="text-blue-500 hover:underline hover:underline-offset-4"
            href="#"
          >
            Register
          </a>
        </div>
      </form>
    </section>
  );
}
