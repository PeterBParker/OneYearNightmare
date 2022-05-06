import React from 'react';
import {useHistory} from "react-router-dom";

function LinkButton(props){
    let history = useHistory();
    const handleClick = () => history.push(props.to);

  return (
    <div className={`btn ${props.styles}`} onClick={handleClick}>
        {props.buttonContent}
    </div>
  )
}

export default LinkButton