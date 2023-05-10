import React, { useState, useEffect } from "react";
import Square from "../Square/Square";
import Piece from "../Piece/Piece";
import "./board.css";

// Importing Images
import blackking from "../../assets/pieces/black-king.svg";
import blackpawn from "../../assets/pieces/black-pawn.svg";
import whitepawn from "../../assets/pieces/white-pawn.svg";
import whiteking from "../../assets/pieces/white-king.svg";
import dot from "../../assets/misc/grey-dot.png";

// import methods
import initializeBoard from "../../services/initBoard";

const { initBoard, boardState } = initializeBoard();
boardState["e1"] = { name: "king-white", imageUrl: whiteking };
boardState["e2"] = { name: "pawn-white", imageUrl: whitepawn };

const Board = () => {
  const [board, setBoard] = useState(initBoard);
  const [lookupTable, setLookupTable] = useState(boardState);
  const [pieceMovementFlag, setPieceMovementFlag] = useState(false);
  const [currentClickedSquareAndPiece, setCurrentClickedSquareAndPiece] =
    useState({ square: "", piece: "", moves: [] });

  useEffect(() => {
    console.log(pieceMovementFlag, currentClickedSquareAndPiece);
  }, [pieceMovementFlag, currentClickedSquareAndPiece]);

  let possibleMovesFunctions = {
    king: (currentSquare) =>
      Object.keys(lookupTable).filter(
        (destinationSquare) =>
          [-1, 0, 1].includes(
            currentSquare[0].charCodeAt(0) - destinationSquare[0].charCodeAt(0)
          ) &&
          [-1, 0, 1].includes(currentSquare[1] - destinationSquare[1]) &&
          !(
            currentSquare[0].charCodeAt(0) -
              destinationSquare[0].charCodeAt(0) ==
              0 && currentSquare[1] - destinationSquare[1] == 0
          )
      ),
    pawn: (currentSquare, color) => {
      let moves = [];
      if (color == "white") {
        if (currentSquare[1] == "2") {
          moves.push(currentSquare[0] + "3");
          moves.push(currentSquare[0] + "4");
        } else {
          moves.push(
            currentSquare[0] + (parseInt(currentSquare[1]) + 1).toString()
          );
        }
      }
      if (color == "black") {
        if (currentSquare[1] == "7") {
          moves.push(currentSquare[0] + "6");
          moves.push(currentSquare[0] + "5");
        } else {
          moves.push(
            currentSquare[0] + (parseInt(currentSquare[1]) + 1).toString()
          );
        }
      }
      return moves;
    },
  };

  const movePiece = (currentSquare, destinationSquare) => {
    // console.log(currentSquare);
    const [piece, color] = lookupTable[currentSquare].name.split("-");

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
    } else if (piece == "pawn") {
      if (
        possibleMovesFunctions
          .pawn(currentSquare, color)
          .includes(destinationSquare)
      ) {
        setLookupTable({
          ...lookupTable,
          [destinationSquare]: lookupTable[currentSquare],
          [currentSquare]: { name: "", imageUrl: "" },
        });
      }
    }
  };

  // const [flag, setFlag] = useState(flase);

  const handleClick = (squareName) => {
    let piece = lookupTable[squareName].name;
    let color = "";

    if (!pieceMovementFlag) {
      if (piece.length == 0) {
        return;
      } else {
        [piece, color] = piece.split("-");

        if (piece == "king") {
          const possibleMoves = possibleMovesFunctions.king(squareName);
          setCurrentClickedSquareAndPiece(() => ({
            square: squareName,
            piece: piece,
            moves: possibleMoves,
          }));
          // console.log(
          //   `Possible Moves are ${currentClickedSquareAndPiece.moves}`
          // );
        } else if (piece == "pawn") {
          const possibleMoves = possibleMovesFunctions.pawn(squareName, color);
          setCurrentClickedSquareAndPiece(() => ({
            square: squareName,
            piece: piece,
            moves: possibleMoves,
          }));
          // console.log(
          //   `Possible Moves are ${currentClickedSquareAndPiece.moves}`
          // );
        }
        setPieceMovementFlag(true);
      }
    } else if (pieceMovementFlag) {
      if (piece.length == 0) {
        if (currentClickedSquareAndPiece.moves.includes(squareName)) {
          // console.log(currentClickedSquareAndPiece.square);
          movePiece(currentClickedSquareAndPiece.square, squareName);
        }
      }
      setCurrentClickedSquareAndPiece({ square: "", piece: "", moves: [] });
      setPieceMovementFlag(false);
    }
  };
  return (
    <div className="board">
      {board.map((square) => (
        <Square
          onSquareClick={handleClick}
          key={square.name}
          name={square.name}
          color={square.color}
        >
          {lookupTable[square.name].name.length == 0 ? null : (
            <Piece
              image={lookupTable[square.name].imageUrl}
              location={square.name}
            />
          )}
          {currentClickedSquareAndPiece.moves.includes(square.name) && (
            <img src={dot} className="relative z-10" />
          )}
        </Square>
      ))}
    </div>
  );
};

export default Board;
