import client from "@/libs/appwrite";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      state.user = null;
      // toast.info("You have been logged out", { autoClose: 10000 });
    },
  },
});

export const { setMode, setLogin, setLogout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectMode = (state) => state.auth.mode;

export default authSlice.reducer;
