import { render, screen } from "@testing-library/react";
import App from "./App";
import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import store from "./redux/store";
import "@testing-library/jest-dom/vitest";

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer autoClose={2000} limit={1} />
        <App />
      </BrowserRouter>
    </Provider>
  );
};

describe("Renders App", () => {
  it("Renders App", () => {
    render(<Root />);
    expect(screen.getByText("Welcome Back !")).toBeInTheDocument();
  });

  it("Renders login form", () => {
    const form = document.getElementById("login-form");
    expect(form).not.toBeNull();
  });

  it("should render login form with all elements", () => {
    // Check form exists
    const loginForm = screen.getByTestId("login-form");
    expect(loginForm).toBeInTheDocument();

    // Check input fields
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Check button
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });
});
