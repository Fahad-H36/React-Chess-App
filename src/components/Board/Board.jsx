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
let boardState = {};
// let possible_moves_table = {
//   // value for the key king takes current square of the king and destination square
//   // then returns true if king move is possible from current to destination square otherwise false
//   king: (currentSquare, destinationSquare) =>
//     [-1, 0, 1].includes(
//       currentSquare[0].charCodeAt(0) - destinationSquare[0].charCodeAt(0)
//     ) &&
//     [-1, 0, 1].includes(currentSquare[1] - destinationSquare[1]) &&
//     !(
//       currentSquare[0].charCodeAt(0) - destinationSquare[0].charCodeAt(0) ==
//         0 && currentSquare[1] - destinationSquare[1] == 0
//     ),
// };

let possibleMovesFunctions = {
  king: (currentSquare) =>
    Object.keys(boardState).filter(
      (destinationSquare) =>
        [-1, 0, 1].includes(
          currentSquare[0].charCodeAt(0) - destinationSquare[0].charCodeAt(0)
        ) &&
        [-1, 0, 1].includes(currentSquare[1] - destinationSquare[1]) &&
        !(
          currentSquare[0].charCodeAt(0) - destinationSquare[0].charCodeAt(0) ==
            0 && currentSquare[1] - destinationSquare[1] == 0
        )
    ),
};

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
      //   boardState[`${String.fromCharCode(96 + j)}${i}`] = whitepawn;
      // } else if (`${String.fromCharCode(96 + j)}${i}`[1] == "7") {
      //   boardState[`${String.fromCharCode(96 + j)}${i}`] = blackpawn;
      // } else {
      //   boardState[`${String.fromCharCode(96 + j)}${i}`] = "";
      // }
      boardState[`${String.fromCharCode(96 + j)}${i}`] = {
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
  console.log(possibleMovesFunctions.king("e1"));

  boardState["e1"] = { name: "king-white", imageUrl: whiteking };
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
          {boardState[square.name].name.length == 0 ? null : (
            <Piece image={boardState[square.name].imageUrl} />
          )}
        </Square>
      ))}
    </div>
  );
};

export default Board;
