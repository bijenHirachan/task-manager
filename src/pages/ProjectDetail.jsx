import React, { useEffect, useState } from "react";
import AuthLayout from "../layout/AuthLayout";
import {
  useAddMemberMutation,
  useShowProjectQuery,
  useCreateTaskInProjectMutation,
  useDeleteProjectMutation,
} from "../store/projectApi";
import { useGetUsersQuery } from "../store/userApi";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import TaskTable from "../components/TaskTable";
import toast from "react-hot-toast";
import ButtonLoader from "../components/ButtonLoader";
import Modal from "../components/Modal";

const ProjectDetail = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [user, setUser] = useState("");

  const { data, error, isLoading, refetch } = useShowProjectQuery({ id });

  const { data: userData } = useGetUsersQuery();

  const [
    createTask,
    { isLoading: createLoading, isSuccess, error: createError },
  ] = useCreateTaskInProjectMutation();

  const [
    addMember,
    { isLoading: addLoading, isSuccess: addSuccess, error: addError },
  ] = useAddMemberMutation();

  const [
    deleteProject,
    { isLoading: deleteLoading, isSuccess: deleteSuccess, error: deleteError },
  ] = useDeleteProjectMutation();

  const navigate = useNavigate();

  const createTaskHandler = (e) => {
    e.preventDefault();

    createTask({ title, project_id: id }).then(() => setTitle(""));
  };

  const addMemberHandler = (e) => {
    e.preventDefault();
    if (user === "") {
      toast.error("Select user!");
      return;
    }
    addMember({ id, user_id: user });
  };

  useEffect(() => {
    if (error) {
      // toast.error(error.data.message);
      navigate(-1);
    }
  }, [error]);

  useEffect(() => {
    if (createError) {
      toast.error(createError.data.message);
    }
  }, [createError]);

  useEffect(() => {
    if (addError) {
      toast.error(addError.data.message);
    }
  }, [addError]);

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError.data.message);
    }
  }, [deleteError]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Task created!");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (addSuccess) {
      toast.success("Member added!");
      setUser("");
    }
  }, [addSuccess]);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Project deleted!");
      setUser("");
      navigate(-1);
    }
  }, [deleteSuccess]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <AuthLayout>
      <Modal show={showModal} maxWidth="lg" onClose={() => setShowModal(false)}>
        <div className="p-4 flex flex-col gap-2">
          <h2 className="text-one font-semibold tracking-wid">
            Delete {data?.data?.title}
          </h2>
          <p className="text-sm text-one tracking-wide">
            Are you sure you want to delete this project? Be careful because it
            can't be undone.
          </p>

          <div className="flex gap-1">
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-500 text-gray-50 px-2 py-1 rounded text-xs hover:opacity-80 transition-opacity delay-75"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteProject({ id })}
              className="bg-red-500 text-red-50 px-2 py-1 rounded text-xs hover:opacity-80 transition-opacity delay-75"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
      <div className="my-8">
        <h4 className="text-four font-bold tracking-wider text-2xl mb-4">
          {data?.data?.title}
        </h4>

        <div className="flex justify-between gap-2 flex-wrap">
          <form onSubmit={createTaskHandler} className="flex">
            <input
              className="rounded-l border-none outline-none focus:ring-0 p-2"
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              disabled={createLoading}
              type="submit"
              className="bg-four hover:opacity-50 transition-opacity delay-75 text-one font-semibold text-sm p-2 rounded-r"
            >
              {createLoading ? <ButtonLoader /> : <span>Create</span>}
            </button>
          </form>
          <form onSubmit={addMemberHandler} className="flex">
            <select
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="rounded-l border-none outline-none focus:ring-0 p-2 text-one "
            >
              <option value="" className="text-one">
                No user selected
              </option>
              {userData?.length > 0 &&
                userData?.map((us) => (
                  <option value={us.id} key={us.id} className="text-one">
                    {us.name}
                  </option>
                ))}
            </select>
            <button
              type="submit"
              disabled={addLoading}
              className="bg-four hover:opacity-50 transition-opacity delay-75 text-one font-semibold text-sm p-2 rounded-r"
            >
              {addLoading ? <ButtonLoader /> : <span>Add Member</span>}
            </button>
          </form>
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-500 hover:opacity-50 transition-opacity delay-75 text-four font-semibold text-sm p-2 rounded"
          >
            Delete Project
          </button>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="py-8">
            {data?.data?.members?.length > 0 && (
              <>
                <h4 className="text-four font-bold tracking-wider text-2xl mb-4">
                  Members
                </h4>
                <div className="flex gap-4 overflow-x-auto">
                  {data?.data?.members.map((member) => (
                    <div
                      key={member.id}
                      className="bg-four text-one px-2 py-1 rounded"
                    >
                      <h3 className="font-semibold text-sm tracking-wide leading-7">
                        {member.name}
                      </h3>
                      <p className="underline text-xs tracking-wide leading-7">
                        {member.email}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="py-8">
            <h4 className="text-four font-bold tracking-wider text-2xl mb-4">
              Tasks
            </h4>

            {data?.data?.tasks?.length > 0 && (
              <TaskTable tasks={data?.data?.tasks} inProject={true} />
            )}
          </div>
        </>
      )}
    </AuthLayout>
  );
};

export default ProjectDetail;
