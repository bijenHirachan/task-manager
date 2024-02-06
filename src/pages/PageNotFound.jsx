import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-[100svh] flex flex-col gap-8 justify-center items-center">
      <h3 className="text-four text-5xl tracking-widest leading-7">404</h3>

      <p className="text-2xl tracking-wider text-four leading-7">
        Page Not Found
      </p>

      <Link to={"/"} className="text-blue-400  tracking-wide hover:underline">
        Return to home
      </Link>
    </div>
  );
};

export default PageNotFound;
