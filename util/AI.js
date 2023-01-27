//const { cheakanswer } = require("./room.js");

function evalute(board, hu, ai) {
  var score = 0;

  if (cheakanswer(board, ai) !== "") {
    score = +1;
  } else if (cheakanswer(board, hu) !== "") {
    score = -1;
  } else {
    score = 0;
  }

  return score;
}
function emptyCells(board) {
  return board.filter((ind) => ind !== "X" && ind !== "O");
}
function gameOverAll(state) {
  return cheakanswer(state, "O") || cheakanswer(state, "X");
}
function Altttt(mark) {
  if (mark === "O") return "X";
  else return "O";
}
function minimax(board, depth, player, hu, ai) {
  var best;

  if (player === ai) {
    best = [-1, -1000];
  } else {
    best = [-1, +1000];
  }

  if (depth === 0 || gameOverAll(board)) {
    var score = evalute(board, hu, ai);
    return [-1, score];
  }

  emptyCells(board).forEach(function (cell) {
    var j = cell;
    var i = parseInt(j);
    board[i - 1] = player;
    var score = minimax(board, depth - 1, Altttt(player), hu, ai);
    score[0] = i - 1;
    board[i - 1] = j;

    if (player === ai) {
      if (score[1] > best[1]) best = score;
    } else {
      if (score[1] < best[1]) best = score;
    }
  });

  return best;
}
function aiTurn(board, hu, ai) {
  var x;
  var move;

  if (emptyCells(board).length === 9) {
    x = parseInt(Math.random() * 9);
  } else {
    move = minimax(board, emptyCells(board).length, ai, hu, ai);
    x = move[0];
    console.log("move", move);
  }
  return x.toString();
}
function cheakanswer(ar, win) {
  if (ar[0] === win && ar[4] === win && ar[8] === win) {
    return "linerc";
  } else if (ar[0] === win && ar[1] === win && ar[2] === win) {
    return "liner1";
  } else if (ar[0] === win && ar[3] === win && ar[6] === win) {
    return "linec1";
  } else if (ar[3] === win && ar[4] === win && ar[5] === win) {
    return "liner2";
  } else if (ar[6] === win && ar[7] === win && ar[8] === win) {
    return "liner3";
  } else if (ar[2] === win && ar[4] === win && ar[6] === win) {
    return "linerr";
  } else if (ar[1] === win && ar[4] === win && ar[7] === win) {
    return "linec2";
  } else if (ar[2] === win && ar[5] === win && ar[8] === win) {
    return "linec3";
  } else return "";
}
module.exports = {
  aiTurn,
};
