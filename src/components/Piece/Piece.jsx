import React from "react";

const Piece = ({
  id,
  name,
  type,
  image,
  side,
  location,
  reach,
  posibleMoves,
}) => {
  return (
    <div className="absolute">
      <img className="w-10" src={image} alt=""></img>
    </div>
  );
};

export default Piece;
