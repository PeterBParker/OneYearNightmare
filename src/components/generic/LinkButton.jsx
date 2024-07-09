import React from "react";
import { useNavigate } from "react-router-dom";

function LinkButton(props) {
  let history = useNavigate();
  const handleClick = () => history.push(props.to);

  return (
    <div className={`btn ${props.styles}`} onClick={handleClick}>
      {props.buttonContent}
    </div>
  );
}

export default LinkButton;
