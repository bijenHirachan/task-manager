// import axios from "axios";
// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import { backendUrl } from "../main";
// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
// import AuthLayout from "../layout/AuthLayout";
// import Task from "../components/Task";
// import Loader from "../components/Loader";

// const ProjectDetail = () => {
//   const { token } = useSelector((state) => state.auth);
//   const [project, setProject] = useState(null);

//   const [title, setTitle] = useState("");

//   const [loading, setLoading] = useState(false);

//   const { id } = useParams();

//   const fetchProject = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${backendUrl}/projects/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setProject(res.data.data);
//       setLoading(false);
//     } catch (error) {
//       toast.error(error.response.data.message);
//       setLoading(false);
//     }
//   };

//   const createTask = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         `${backendUrl}/tasks`,
//         {
//           title,
//           project_id: id,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setProject((prev) => ({
//         ...prev,
//         tasks: [...prev.tasks, res.data.data],
//       }));
//       setTitle("");
//       setLoading(false);
//     } catch (error) {
//       toast.error(error.response.data.message);
//       setLoading(false);
//     }
//   };

//   useState(() => {
//     if (token) {
//       fetchProject();
//     }
//   }, [id]);
//   return (
//     <AuthLayout>
//       <div className="my-8">
//         <h4 className="text-four font-bold tracking-wider text-2xl mb-4">
//           {project?.title}
//         </h4>
//         <form onSubmit={createTask} className="flex">
//           <input
//             className="rounded-l border-none outline-none focus:ring-0 p-2"
//             type="text"
//             placeholder="Task title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <button className="bg-four text-one font-semibold text-sm p-2 rounded-r">
//             Create
//           </button>
//         </form>
//       </div>

//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <div className="mb-4">
//             {project?.members?.length > 0 && (
//               <>
//                 <h4 className="text-four font-bold tracking-wider text-2xl mb-4">
//                   Members
//                 </h4>
//                 <div className="flex gap-4">
//                   {project.members.map((member) => (
//                     <div
//                       key={member.id}
//                       className="bg-four text-one px-2 py-1 rounded"
//                     >
//                       <h3 className="font-semibold text-sm tracking-wide leading-7">
//                         {member.name}
//                       </h3>
//                       <p className="underline text-xs tracking-wide leading-7">
//                         {member.email}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>

//           <div>
//             <h4 className="text-four font-bold tracking-wider text-2xl mb-4">
//               Tasks
//             </h4>

//             {project?.tasks?.length > 0 && (
//               <div className="flex flex-col gap-4">
//                 {project.tasks.map((task) => (
//                   <Task task={task} key={task.id} />
//                 ))}
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </AuthLayout>
//   );
// };

// export default ProjectDetail;

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

const ProjectDetail = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");

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
            disabled={deleteLoading}
            onClick={() => deleteProject({ id })}
            className="bg-red-500 hover:opacity-50 transition-opacity delay-75 text-four font-semibold text-sm p-2 rounded"
          >
            {deleteLoading ? <ButtonLoader /> : <>Delete Project</>}
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
