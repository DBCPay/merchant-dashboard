import { Link, useNavigate } from "react-router-dom";
// validations
import * as yup from "yup";
import AuthHeader from "../components/AuthHeader";
import { useFormik } from "formik";
import FormInput from "../components/FormInput";
import { useRedux } from "../hooks";
import { register, resetRegisterState } from "../redux";
import { useEffect } from "react";
import { showErrorNotification, showSuccessNotification } from "../helpers";
import { Loader, Spinner } from "../components/Loader";
import Button from "../components/Button";

const Register = () => {
  const navigate = useNavigate();
  const { dispatch, useStateSelector } = useRedux();

  // get the register state
  const { registering, isRegistered, registerSuccess, registerationError } =
    useStateSelector((state) => state.Auth);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      firstName: yup.string().required("Please provide first name"),
      lastName: yup.string().required("Please provide last name"),
      email: yup
        .string()
        .required("Please provide email")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please enter a valid email"
        ),
      password: yup
        .string()
        .required("Please provide password")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, a number and special character"
        ),
    }),
    onSubmit: (values) => {
      dispatch(register(values));
    },
  });

  useEffect(() => {
    if (isRegistered) {
      if (registerSuccess) {
        showSuccessNotification(registerSuccess);
      }
      dispatch(resetRegisterState());
      return navigate("/dashboard");
    }
  }, [isRegistered]);

  useEffect(() => {
    if (registerationError) {
      showErrorNotification(registerationError);
      dispatch(resetRegisterState());
      return;
    }
  }, [registerationError]);

  return (
    <div className="flex justify-center h-full">
      <div className="w-full h-full">
        <div className="py-4 flex flex-col justify-center h-full">
          <AuthHeader
            title="Welcome Back !"
            subtitle="Sign in to continue to Streaks."
          />
          <form
            className="relative"
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            {registering && <Loader />}
            <FormInput
              name="firstName"
              label="First Name"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              type="text"
              value={validation.values.firstName || ""}
              placeholder="First name"
              validation={validation}
            />
            <FormInput
              name="lastName"
              label="Last Name"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              type="text"
              value={validation.values.lastName || ""}
              placeholder="Last name"
              validation={validation}
            />
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
                {registering && <Spinner />}
                Sign Up
              </Button>
            </div>
            <div className="mt-2">
              <p className="text-center text-sm">
                Already have an account?{" "}
                <Link to={"/login"} className="base font-medium">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
