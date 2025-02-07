import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import questionReducer from "./question/question";
import analyticsReducer from "./analytics/analyticsSlice";
import accountReducer from "./account/account";

const store = configureStore({
  reducer: {
    Auth: authReducer,
    Question: questionReducer,
    Analytics: analyticsReducer,
    Account: accountReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
