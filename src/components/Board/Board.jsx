import React, { useState, useEffect } from "react";
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
  // Initializing the empty board and board State
  for (var i = 1; i <= 8; i++) {
    for (var j = 1; j <= 8; j++) {
      temp.push({
        // id: { i, j },
        name: `${String.fromCharCode(96 + j)}${i}`,
        color: (i + j) % 2 == 0 ? "bg-gray-60" : "bg-white",
      });

      boardState[`${String.fromCharCode(96 + j)}${i}`] = {
        name: "",
        imageUrl: "",
      };
      boardState["e1"] = { name: "king-white", imageUrl: whiteking };
    }
  }

  for (var i = 63; i >= 0; i -= 8) {
    initBoard.push(temp.slice(i - 7, i + 1));
  }
  initBoard = [].concat(...initBoard);
}
const Board = () => {
  const [board, setBoard] = useState(initBoard);
  const [lookupTable, setLookupTable] = useState(boardState);

  useEffect(() => {
    console.log(board);
  }, [board]);

  const movePiece = (currentSquare, destinationSquare) => {
    const piece = boardState[currentSquare].name.split("-")[0];

    if (piece == "king") {
      if (
        possibleMovesFunctions.king(currentSquare).includes(destinationSquare)
      ) {
        setLookupTable({
          ...lookupTable,
          [destinationSquare]: lookupTable[currentSquare],
          [currentSquare]: { name: "", imageUrl: "" },
        });
      }
    }
  };

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
          {lookupTable[square.name].name.length == 0 ? null : (
            <Piece
              image={lookupTable[square.name].imageUrl}
              location={square.name}
            />
          )}
        </Square>
      ))}
    </div>
  );
};

export default Board;
