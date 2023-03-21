import React from "react";

const Square = ({ id, color, occupiedBy, name, children }) => {
  return (
    <div className={`${color} text-gray-600`}>
      {name}
      {children}
    </div>
  );
};

export default Square;
