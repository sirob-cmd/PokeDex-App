import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="lds-ellipsis loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
