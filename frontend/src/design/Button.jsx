import React from "react";
import "../css/Hero.css";

const Button = ({ onClick }) => {
  return (
    <button
      type="button"
      className="green-button"
      onClick={onClick}
    >
      Add Task
    </button>
  );
};

export default Button;
