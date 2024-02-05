import React, { useEffect, useState } from "react";
import {
  useCreateProjectMutation,
  useGetProjectsQuery,
} from "../store/projectApi";
import AuthLayout from "../layout/AuthLayout";
import Paginator from "../components/Paginator";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import ProjectTable from "../components/ProjectTable";
import ButtonLoader from "../components/ButtonLoader";

const HomePage = () => {
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);

  const { token } = useSelector((state) => state.auth);

  const [skip, setSkip] = useState(true);

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [items, setItems] = useState(5);

  const { data, error, isLoading } = useGetProjectsQuery(
    { page, search: debouncedSearch, items },
    {
      skip,
    }
  );
  const [
    createProject,
    { error: createError, isSuccess, isLoading: createLoading },
  ] = useCreateProjectMutation();

  const createProjectHandler = (e) => {
    e.preventDefault();
    createProject(title);
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
      toast.success("Project created!");
    }
  }, [error, createError, isSuccess]);

  useEffect(() => {
    setSkip(false);
  }, [token]);

  useEffect(() => {
    const handleSearch = setTimeout(() => setDebouncedSearch(search), 500);

    return () => {
      clearTimeout(handleSearch);
    };
  }, [search]);

  return (
    <AuthLayout>
      <div className="my-4">
        <h4 className="text-four font-bold tracking-wider text-2xl ">
          Projects
        </h4>
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
          <form onSubmit={createProjectHandler} className="flex">
            <input
              className="rounded-l px-2 py-1 border-none outline-none focus:ring-0 bg-four text-one text-sm"
              type="text"
              placeholder="Project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              type="submit"
              disabled={createLoading}
              className="rounded-r px-2 py-1 border-one border-l outline-none focus:ring-0 bg-four text-one text-sm hover:opacity-50 transition-opacity delay-75"
            >
              {createLoading ? <ButtonLoader /> : <>Create</>}
            </button>
          </form>
        </div>
      </div>

      {isLoading ? <Loader /> : <ProjectTable projects={data?.data} />}

      <Paginator
        page={page}
        setPage={setPage}
        meta={data?.meta}
        itemName={"projects"}
      />
    </AuthLayout>
  );
};

export default HomePage;
