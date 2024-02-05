import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { taskApi } from "./taskApi";
import { projectApi } from "./projectApi";
import { userApi } from "./userApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(taskApi.middleware)
      .concat(projectApi.middleware)
      .concat(userApi.middleware),
});
export default store;
