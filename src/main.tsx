import React from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import App from "./App.tsx";
import "./index.css";
// import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { setAuthorization } from "./api/apiCore.ts";

setAuthorization(sessionStorage.getItem("accessToken"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer autoClose={2000} limit={1} />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
