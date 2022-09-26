import { configureStore } from "@reduxjs/toolkit";
import toolkitSlice from "./ToolkitSlice";

export const store = configureStore({
  reducer: {
    authorithation: toolkitSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
