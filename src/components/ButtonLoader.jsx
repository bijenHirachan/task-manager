import React from "react";
import { ThreeDots } from "react-loader-spinner";

const ButtonLoader = () => {
  return (
    <ThreeDots
      visible={true}
      color="#4fa94d"
      height={24}
      width={41}
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default ButtonLoader;
