import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import questionReducer from "./question/question";
import accountReducer from "./account/account";
import layoutReducer from "./layout/layoutSlice";

const store = configureStore({
  reducer: {
    Auth: authReducer,
    Question: questionReducer,
    Account: accountReducer,
    Layout: layoutReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
