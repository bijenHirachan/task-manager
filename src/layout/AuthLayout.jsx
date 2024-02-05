import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import axios from "axios";
import { backendUrl } from "../main";
import toast from "react-hot-toast";
import { projectApi } from "../store/projectApi";

const AuthLayout = ({ children }) => {
  const { user, token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const logoutHandler = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      dispatch(logout());

      toast.success("Logged out!");

      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="bg-four text-one  flex justify-center">
        <nav className="flex w-full justify-between container items-center py-6 px-4 sm:px-16 md:px-24 xl:px-56">
          <div className="text-lg font-semibold tracking-wide">
            <h2>Hi, {user?.name}</h2>
          </div>
          <ul className="flex gap-4 items-center tracking-wide">
            <li
              className={`text-sm hover:underline transition-all delay-75 font-semibold ${
                location?.pathname === "/" ||
                location?.pathname.includes("/projects")
                  ? "underline"
                  : ""
              }`}
            >
              <Link to={"/"}>Projects</Link>
            </li>
            <li
              className={`text-sm hover:underline transition-all delay-75 font-semibold ${
                location?.pathname.includes("/tasks") ? "underline" : ""
              }`}
            >
              <Link to={"/tasks"}>Tasks</Link>
            </li>
            <li className="text-sm  font-semibold">
              <button
                onClick={logoutHandler}
                className="hover:underline transitio-all delay-75"
              >
                Log Out
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex justify-center py-4">
        <div className="container px-4 sm:px-16 md:px-24 xl:px-56">
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
