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
    <div>
      <img src={image} alt="hello"></img>
    </div>
  );
};

export default Piece;
