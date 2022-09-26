import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Auth = {
  isAuth: boolean;
};

const initialState: Auth = {
  isAuth: false,
};

const toolkitSlice = createSlice({
  name: "authorithation",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setAuth } = toolkitSlice.actions;
export default toolkitSlice.reducer;
