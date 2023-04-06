import React, { useState } from "react";
import Square from "../Square/Square";
import Piece from "../Piece/Piece";
import "./board.css";

// Importing Images
import blackking from "../../assets/pieces/black-king.svg";
import blackpawn from "../../assets/pieces/black-pawn.svg";
import whitepawn from "../../assets/pieces/white-pawn.svg";
import whiteking from "../../assets/pieces/white-king.svg";

let temp = [];
let initBoard = [];
let lookUpTable = {};
{
  for (var i = 1; i <= 8; i++) {
    for (var j = 1; j <= 8; j++) {
      temp.push({
        id: { i, j },
        name: `${String.fromCharCode(96 + j)}${i}`,
        color: (i + j) % 2 == 0 ? "bg-gray-60" : "bg-white",
        occupiedBy: "",
      });
      // if (`${String.fromCharCode(96 + j)}${i}`[1] == "2") {
      //   lookUpTable[`${String.fromCharCode(96 + j)}${i}`] = whitepawn;
      // } else if (`${String.fromCharCode(96 + j)}${i}`[1] == "7") {
      //   lookUpTable[`${String.fromCharCode(96 + j)}${i}`] = blackpawn;
      // } else {
      //   lookUpTable[`${String.fromCharCode(96 + j)}${i}`] = "";
      // }
      lookUpTable[`${String.fromCharCode(96 + j)}${i}`] = {
        name: "",
        imageUrl: "",
      };
    }
  }

  for (var i = 63; i >= 0; i -= 8) {
    initBoard.push(temp.slice(i - 7, i + 1));
  }
  initBoard = [].concat(...initBoard);
}
const Board = () => {
  const [board, setBoard] = useState(initBoard);

  lookUpTable["e1"] = { name: "king-white", imageUrl: whiteking };
  return (
    <div className="board">
      {board.map((square) => (
        <Square
          key={square.name}
          id={square.id}
          name={square.name}
          color={square.color}
          occupiedBy={square.occupiedBy}
        >
          {lookUpTable[square.name].name.length == 0 ? null : (
            <Piece image={lookUpTable[square.name].imageUrl} />
          )}
        </Square>
      ))}
    </div>
  );
};

export default Board;
