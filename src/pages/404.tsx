import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-dvw flex flex-col items-center justify-center bg-black px-4 sm:px-0 h-dvh">
      <h1
        className="text-center text-white"
        style={{ fontSize: "clamp(1.5rem, 10vw, 60px)" }}
      >
        Page Not Found!!!
      </h1>
      <p className="my-10 text-center text-white text-sm sm:text-base md:text-xl">
        The Page you are looking for could not be found.
      </p>
      <a href={"/dashboard"} className="underline text-[var(--base-color)]">
        Go Back to Homepage
      </a>
    </div>
  );
};

export default NotFound;
