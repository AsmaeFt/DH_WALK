import React from "react";
import c from '../../pages/Dhwalk.module.css'
const Card = ({ Department, border, navigate }) => {
  const handleClick = () => {
    if (navigate) {
      navigate();
    }
  };
  return (
    <div className={c.card} style={{ borderTop: border }} onClick={handleClick}>
      <p>{Department}</p>
    </div>
  );
};

export default Card;
