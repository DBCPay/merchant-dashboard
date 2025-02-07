import { Link } from "react-router-dom";
import AuthHeader from "../components/AuthHeader";
import { useRedux } from "../hooks";
import { logoutUser } from "../redux";
import { useEffect } from "react";

const Logout = () => {
  const { dispatch } = useRedux();

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  return (
    <div className="flex justify-center h-full">
      <div className="w-full h-full">
        <div className="py-md-5 py-4 flex flex-col justify-center h-full">
          <div className="mb-4">
            <div className="rounded-full bg-[var(--light-base-background)] w-20 h-20 md:w-28 md:h-28 mx-auto flex justify-center items-center">
              <i className="fi fi-sr-user flex text-3xl md:text-4xl text-[var(--base-color)]"></i>
            </div>
          </div>
          <AuthHeader
            title="You are logged out"
            subtitle="Thank you for choosing DBCPay"
            styles="mb-0"
          />
          <div className="w-[90%] max-w-[500px] md:max-w-[350px] mx-auto mt-6 relative">
            <a
              className="text-center text-sm py-3 px-4 bg-[var(--base-color)] text-white w-full rounded-md font-medium hover:opacity-80 flex items-center justify-center"
              href={"/login"}
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
