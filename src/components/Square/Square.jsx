import { React, useState } from "react";

const Square = ({ onSquareClick, color, name, children }) => {
  return (
    <div
      onClick={() => onSquareClick(name)}
      className={`${color} text-gray-600`}
    >
      {name}
      {children}
    </div>
  );
};

export default Square;
