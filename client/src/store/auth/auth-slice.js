import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    auth: {
      user: null,
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.auth.user = action.payload;
    },
    deleteUser: (state, action) => {
      state.auth.user = null;
    },
  },
});
export const { setUser, deleteUser } = authSlice.actions;
export default authSlice.reducer;
