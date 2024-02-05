import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../main";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import AuthLayout from "../layout/AuthLayout";
import Loader from "../components/Loader";
import {
  useDeleteTaskMutation,
  useShowTaskQuery,
  useUpdateTaskMutation,
} from "../store/taskApi";
import ButtonLoader from "../components/ButtonLoader";
import { useGetProjectsQuery } from "../store/projectApi";

const EditTask = () => {
  const { id } = useParams();

  const { error, isLoading, data, isSuccess } = useShowTaskQuery({ id });

  const { data: projects, isLoading: projectLoading } = useGetProjectsQuery({
    page: 1,
    search: "",
    items: "100",
  });

  const [title, setTitle] = useState("");

  const [project, setProject] = useState("");

  const [isDone, setIsDone] = useState(false);

  const [
    updateTask,
    { error: updateError, isSuccess: updateSuccess, isLoading: updateLoading },
  ] = useUpdateTaskMutation();

  const [
    deleteTask,
    { isLoading: deleteLoading, error: deleteError, isSuccess: deleteSuccess },
  ] = useDeleteTaskMutation();

  const updateTaskHandler = async (e) => {
    e.preventDefault();
    updateTask({ id, title, is_done: isDone, project_id: project });
  };

  const navigate = useNavigate();

  useEffect(() => {
    setTitle(data?.data?.title);
    setIsDone(data?.data?.is_done);
    setProject(data?.data?.project_id || "");
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      navigate(-1);
    }
  }, [error]);

  useEffect(() => {
    if (updateError) {
      toast.error(updateError.data.message);
    }
  }, [updateError]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Task updated successfully!");
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError.data.message);
    }
  }, [deleteError]);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Task deleted successfully!");
      navigate(-1);
    }
  }, [deleteSuccess]);

  return (
    <AuthLayout>
      <div className="my-8">
        <div className="flex justify-between mb-12">
          <h4 className="text-four font-bold tracking-wider text-2xl mb-4">
            Update Task
          </h4>
          <button
            onClick={() => deleteTask({ id })}
            disabled={deleteLoading}
            className="rounded px-2 py-1 bg-red-500 outline-none focus:ring-0 hover:opacity-50 transition-opacity delay-75 text-four text-sm"
          >
            {deleteLoading ? <ButtonLoader /> : <>Delete Task</>}
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <form onSubmit={updateTaskHandler} className="flex flex-col gap-4">
            <div className="w-full mb-1">
              <label
                htmlFor="title"
                className="text-four text-sm font-semibold "
              >
                Title
              </label>
              <input
                id="title"
                className="rounded border-none w-full outline-none focus:ring-0 p-2"
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="rounded border-none w-full outline-none focus:ring-0 p-2"
            >
              <option value="" className="text-one">
                No project selected
              </option>
              {projects?.data?.length > 0 &&
                projects?.data?.map((pr) => (
                  <option value={pr.id} key={pr.id} className="text-one">
                    {pr.title}
                  </option>
                ))}
            </select>

            <div className="w-full my-1 flex items-center gap-4">
              <label
                htmlFor="isDone"
                className="text-four text-sm font-semibold mb-1"
              >
                Completed
              </label>
              <input
                id="completed"
                value={isDone}
                onChange={(e) => setIsDone(!isDone)}
                checked={isDone}
                type="checkbox"
              />
            </div>
            <button className="bg-four hover:opacity-50 transition-opacity delay-75 flex justify-center text-one font-semibold text-sm p-2 rounded">
              {updateLoading ? <ButtonLoader /> : <>Update</>}
            </button>
          </form>
        )}
      </div>
    </AuthLayout>
  );
};

export default EditTask;
