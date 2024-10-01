import React from "react";
import { useNavigate } from "react-router-dom";

function LinkButton(props) {
  let navigate = useNavigate();
  const handleClick = () => navigate(props.to);

  return (
    <div className={`btn ${props.styles}`} onClick={handleClick}>
      {props.buttonContent}
    </div>
  );
}

export default LinkButton;
