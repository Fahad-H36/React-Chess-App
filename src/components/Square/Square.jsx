import React from "react";

const Square = ({ id, color, occupiedBy, name }) => {
  return <div className={`${color} text-gray-600`}>{name}</div>;
};

export default Square;
