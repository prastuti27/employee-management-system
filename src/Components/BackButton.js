import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const GoBackButton = ({ onClick }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (typeof onClick === "function") {
      onClick(); // Call the provided onClick function if it's a function
    }
    navigate(-1); // Go back in the navigation history
  };

  return (
    <button onClick={handleGoBack} className="custom-button">
      <FaArrowLeft />
    </button>
  );
};

export default GoBackButton;
