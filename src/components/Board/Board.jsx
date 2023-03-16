import React from "react";
import Square from "../Square/Square";
import Piece from "../Piece/Piece";
import "./board.css";

// Importing Images
import blackking from "../../assets/pieces/blackking.svg";
let temp = [];
let board = [];
{
  for (var i = 1; i <= 8; i++) {
    for (var j = 1; j <= 8; j++) {
      temp.push({
        id: { i, j },
        name: `${String.fromCharCode(96 + i)}${j}`,
        color: (i + j) % 2 == 0 ? "bg-black" : "bg-white",
        occupiedBy: "",
      });
    }
  }

  for (var i = 63; i >= 0; i -= 8) {
    board.push(temp.slice(i - 7, i + 1));
  }
  board = [].concat(...board);
}
const Board = () => {
  {
    console.log(board);
  }
  return (
    <div className="board">
      {board.map((square) => (
        <Square
          key={square.name}
          id={square.id}
          name={square.name}
          color={square.color}
          occupiedBy={square.occupiedBy}
        />
      ))}
    </div>
  );
};

export default Board;
