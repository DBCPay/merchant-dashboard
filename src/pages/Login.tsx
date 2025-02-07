import { Link, useNavigate } from "react-router-dom";
// validations
import * as yup from "yup";
import AuthHeader from "../components/AuthHeader";
import { useFormik } from "formik";
import FormInput from "../components/FormInput";
import { useRedux } from "../hooks";
import { login, resetLoginState } from "../redux";
import { useEffect } from "react";
import { showErrorNotification, showSuccessNotification } from "../helpers";
import { Loader, Spinner } from "../components/Loader";
import Button from "../components/Button";

const Login = () => {
  const navigate = useNavigate();
  const { dispatch, useStateSelector } = useRedux();

  // get the login state
  const { isLoggedIn, isLoginReqLoading, loginError, message } =
    useStateSelector((state) => state.Auth);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Please Enter Your Email")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please enter a valid email"
        ),
      password: yup
        .string()
        .required("Please Enter Your Password")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, a number and special character"
        ),
    }),
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      if (message) {
        showSuccessNotification(message);
      }
      dispatch(resetLoginState());
      navigate("/dashboard");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (loginError) {
      showErrorNotification(loginError);
      dispatch(resetLoginState());
      return;
    }
  }, [loginError]);

  return (
    <div className="flex justify-center h-full">
      <div className="w-full h-full">
        <div className="py-4 flex flex-col justify-center h-full">
          <AuthHeader
            title="Welcome Back !"
            subtitle="Sign in to continue to DBCPay."
          />
          <form
            className="relative"
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            {isLoginReqLoading && <Loader />}
            <FormInput
              name="email"
              label="Email"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              type="email"
              value={validation.values.email || ""}
              placeholder="Enter your email"
              validation={validation}
            />
            <FormInput
              name="password"
              label="Password"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              type="password"
              value={validation.values.password || ""}
              placeholder="Enter your password"
              validation={validation}
            />

            <div className="mt-6">
              <Button type="submit">
                {isLoginReqLoading && <Spinner />}
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
