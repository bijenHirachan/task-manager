import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/authSlice";
import PageNotFound from "./pages/PageNotFound";
import Tasks from "./pages/Tasks";
import { Toaster } from "react-hot-toast";
import ProjectDetail from "./pages/ProjectDetail";
import EditTask from "./pages/EditTask";

const App = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    let items = localStorage.getItem("task-data");
    if (items) {
      const data = JSON.parse(items);
      if (!user) {
        dispatch(getUser({ user: data.user, token: data.access_token }));
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="bg-one min-h-[100svh]">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {user ? (
          <>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/tasks/:id/edit" element={<EditTask />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </>
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
