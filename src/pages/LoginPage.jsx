import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "../main";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${backendUrl}/login`, {
        email,
        password,
      });

      localStorage.setItem("task-data", JSON.stringify(res.data));
      dispatch(login({ user: res.data.user, token: res.data.access_token }));
      toast.success("Logged In!");

      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <h2 className="text-2xl font-semibold text-four tracking-widest leading-9 mb-4">
        Task Manager
      </h2>
      <form onSubmit={loginHandler} className="flex flex-col gap-4">
        <div className="w-full mb-1">
          <label
            htmlFor="email"
            className="text-four text-xs tracking-wider font-semibold "
          >
            Email
          </label>
          <input
            id="email"
            className="rounded border-none w-full outline-none focus:ring-0 p-2"
            type="email"
            placeholder="abc@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full mb-1">
          <label
            htmlFor="password"
            className="text-four text-xs tracking-wider font-semibold "
          >
            Password
          </label>
          <input
            id="password"
            className="rounded border-none w-full outline-none focus:ring-0 p-2"
            type="password"
            placeholder="*************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-four hover:opacity-50 transition-all delay-75 text-one font-semibold text-sm p-2 rounded"
        >
          Login
        </button>

        <div className="text-four text-sm tracking-wider my-4">
          Not yet registered? Register{" "}
          <Link to={"/register"} className="hover:underline font-semibold">
            here!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
