const initializeBoard = () => {
  // Initializing the empty board and board State
  let temp = [];
  let initBoard = [];
  let boardState = {};
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
    }
  }

  for (var i = 63; i >= 0; i -= 8) {
    initBoard.push(temp.slice(i - 7, i + 1));
  }
  initBoard = [].concat(...initBoard);
  return { initBoard, boardState };
};

export default initializeBoard;
