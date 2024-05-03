import React from "react";

const Card = ({ Department, border, navigate }) => {
  const handleClick = () => {
    if (navigate) {
      navigate();
    }
  };
  return (
    <div className="card" style={{ borderTop: border }} onClick={handleClick}>
      <p>{Department}</p>
    </div>
  );
};

export default Card;
