import React, { useEffect, useState } from "react";
import { useCreateTaskMutation, useGetTasksQuery } from "../store/taskApi";
import AuthLayout from "../layout/AuthLayout";
import Loader from "../components/Loader";
import Paginator from "../components/Paginator";
import toast from "react-hot-toast";
import TaskTable from "../components/TaskTable";
import ButtonLoader from "../components/ButtonLoader";
const Tasks = () => {
  const [page, setPage] = useState(1);

  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const [items, setItems] = useState(5);

  const [debounceSearch, setDebounceSearch] = useState("");

  const { data, error, isLoading, refetch } = useGetTasksQuery({
    page,
    status,
    search: debounceSearch,
    items,
  });

  const [title, setTitle] = useState("");

  const [
    createTask,
    { error: createError, isSuccess, isLoading: createLoading },
  ] = useCreateTaskMutation();

  const createTaskHandler = (e) => {
    e.preventDefault();

    createTask({ title });
  };

  useEffect(() => {
    if (createError) {
      toast.error(createError.data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
    if (isSuccess) {
      setTitle("");
      toast.success("Task created!");
    }
  }, [error, createError, isSuccess]);

  useEffect(() => {
    const debounceHandler = setTimeout(() => setDebounceSearch(search), 500);

    return () => {
      clearTimeout(debounceHandler);
    };
  }, [search]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <AuthLayout>
      <div className="my-4">
        <h4 className="text-four font-bold tracking-wider text-2xl ">Tasks</h4>
        <div className="flex flex-wrap gap-2 justify-between mt-8 mb-4">
          <div className="flex flex-wrap  gap-2 items-center">
            <input
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              className="rounded px-2 py-1 border-none outline-none focus:ring-0 bg-four text-one text-sm"
              type="text"
              placeholder="Search..."
            />
            <select
              value={status}
              onChange={(e) => {
                setPage(1);
                setStatus(e.target.value);
              }}
              className="rounded px-2 py-1 border-none outline-none focus:ring-0 bg-four text-one text-sm"
            >
              <option value="">All</option>
              <option value="0">Open</option>
              <option value="1">Finished</option>
            </select>
            <select
              value={items}
              onChange={(e) => {
                setPage(1);
                setItems(e.target.value);
              }}
              className="rounded px-2 py-1 border-none outline-none focus:ring-0 bg-four text-one text-sm"
            >
              <option value="5">Five</option>
              <option value="10">Ten</option>
              <option value="15">Fifteen</option>
            </select>
          </div>
          <form onSubmit={createTaskHandler} className="flex">
            <input
              className="rounded-l px-2 py-1 border-none outline-none focus:ring-0 bg-four text-one text-sm"
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              type="submit"
              disabled={createLoading}
              className="rounded-r px-2 py-1 border-one border-l outline-none focus:ring-0 hover:opacity-50 transition-opacity delay-75 bg-four text-one text-sm"
            >
              {createLoading ? <ButtonLoader /> : <>Create</>}
            </button>
          </form>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <TaskTable tasks={data?.data} inProject={false} />
      )}
      <Paginator
        meta={data?.meta}
        page={page}
        setPage={setPage}
        itemName={"tasks"}
      />
    </AuthLayout>
  );
};

export default Tasks;
