import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;

      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  tagTypes: "Projects",
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: ({ page = 1, search = "", items = "" }) =>
        `projects?page=${page}&filter[title]=${search}&items=${items}`,
      providesTags: ["Projects"],
    }),
    showProject: builder.query({
      query: ({ id }) => `projects/${id}`,
      providesTags: ["Projects"],
    }),
    createProject: builder.mutation({
      query: (title) => ({
        url: "projects",
        method: "post",
        body: { title },
      }),
      invalidatesTags: ["Projects"],
    }),
    createTaskInProject: builder.mutation({
      query: ({ title, project_id = null }) => ({
        url: "tasks",
        method: "post",
        body: { title, project_id },
      }),
      invalidatesTags: ["Projects"],
    }),
    addMember: builder.mutation({
      query: ({ id, user_id = null }) => ({
        url: `project/${id}/members/${user_id}`,
        method: "put",
      }),
      invalidatesTags: ["Projects"],
    }),
    deleteProject: builder.mutation({
      query: ({ id }) => ({
        url: `projects/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useShowProjectQuery,
  useCreateProjectMutation,
  useCreateTaskInProjectMutation,
  useAddMemberMutation,
  useDeleteProjectMutation,
} = projectApi;
