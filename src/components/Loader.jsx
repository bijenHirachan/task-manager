import React from "react";
import { Watch } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="min-h-[40svh] w-full flex justify-center items-center">
      <Watch
        visible={true}
        height="80"
        width="80"
        radius="48"
        color="#C2DBC1"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
