let turn = document.querySelector(".turn");
let reset = document.querySelector(".reset");
let boxes = document.querySelectorAll(".box");
let playerScores = document.querySelectorAll(".score");

let currentPlayer = "X";

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.textContent === "") {
      box.textContent = currentPlayer;
      box.disabled = true;
      currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch players with ternary
      turn.textContent = `Turn: ${currentPlayer}`;
      colorText(box);
      winner(box);
    }
  });
});

reset.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.textContent = "";
    box.disabled = false;
  });
  currentPlayer = "X";
  turn.textContent = `Turn: ${currentPlayer}`;
});

// Different colors for X & O
const colorText = (box) => {
  if (box.textContent == "X") {
    box.style.color = "#31c3bd";
  } else {
    box.style.color = "#f2b137";
  }
};

// Checking the winner by comparing clicked box and Showing the winner/draw message
const winner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        turn.textContent = `Winner: ${pos1Val}`;
        scoreCount();
      }
    }
  }
};

const scoreCount = () => {
  if (turn.textContent === "Winner: X") {
    playerScores[0].textContent = parseInt(playerScores[0].textContent) + 1;
    console.log(playerScores[0].textContent);
  } else if (turn.textContent === "Winner: O") {
    playerScores[2].textContent = parseInt(playerScores[2].textContent) + 1;
  } else {
    playerScores[1].textContent = parseInt(playerScores[1].textContent) + 1;
  }
};
