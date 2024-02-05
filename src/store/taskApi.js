import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Accept", "application/json");
        headers.set("Content-Type", "application/json");
      }

      return headers;
    },
  }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: ({ page = 1, status = "", search = "", items = "" }) =>
        `tasks?page=${page}&filter[is_done]=${status}&filter[title]=${search}&items=${items}&include=project`,
      providesTags: ["Tasks"],
    }),

    createTask: builder.mutation({
      query: ({ title }) => ({
        url: "tasks",
        method: "post",
        body: { title },
      }),
      invalidatesTags: ["Tasks"],
    }),
    showTask: builder.query({
      query: ({ id }) => `tasks/${id}`,
      providesTags: ["Tasks"],
    }),
    updateTask: builder.mutation({
      query: ({ id, title, is_done, project_id = null }) => ({
        url: `tasks/${id}`,
        method: "put",
        body: {
          title,
          is_done,
          project_id,
        },
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: ({ id }) => ({
        url: `tasks/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useShowTaskQuery,
  useDeleteTaskMutation,
} = taskApi;
