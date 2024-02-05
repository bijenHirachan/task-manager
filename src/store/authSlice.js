import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      localStorage.removeItem("task-data");
      state.user = null;
      state.token = null;
    },
  },
});

export const { getUser, login, logout } = authSlice.actions;

export default authSlice.reducer;
