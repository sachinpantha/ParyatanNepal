import React from "react";

const CustomButton = ({ text, clickEvent, primary }) => {
  return (
    <button
      onClick={clickEvent}
      className={`custom ${primary ? "primary" : ""}`}
    >
      {text}
    </button>
  );
};

export default CustomButton;
