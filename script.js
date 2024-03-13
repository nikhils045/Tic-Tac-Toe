let msg = document.querySelector(".msg");
let reset = document.querySelector(".reset");
let boxes = document.querySelectorAll(".box");
let playerScores = document.querySelectorAll(".score");

let currentPlayer = "X";
let count = 0; // To track Draw

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

//  Function to handle click event on each box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.textContent === "") {
      box.textContent = currentPlayer;
      box.disabled = true;
      currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch players with ternary
      msg.textContent = `Turn: ${currentPlayer}`;
      count++;
      colorText(box);
    }
    if (checkWinner()) {
      return;
    } else {
      checkDraw();
    }
  });
});

//  Function to handle click event on Reset Button
reset.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.textContent = "";
    box.disabled = false;
  });
  currentPlayer = "X";
  msg.textContent = `Turn: ${currentPlayer}`;
  msg.style.backgroundColor = "#253446";
  count = 0;
});

// Function to Changing the text color of a clicked box
const colorText = (box) => {
  if (box.textContent === "X") {
    box.style.color = "#31c3bd";
  } else {
    box.style.color = "#f2b137";
  }
};

// Function to disabling boxes
const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

// Checking the winner by comparing clicked box
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
  return false;
};

// Showing the Winner and disabling all boxes
const showWinner = (winner) => {
  msg.textContent = `Winner: ${winner}`;
  msg.style.backgroundColor = "Green";
  scoreCount(winner);
  disableBoxes();
};

// Adding score to Winning Player
const scoreCount = (winner) => {
  if (winner === "X") {
    playerScores[0].textContent = parseInt(playerScores[0].textContent) + 1;
  } else if (winner === "O") {
    playerScores[2].textContent = parseInt(playerScores[2].textContent) + 1;
  }
};

// Function to check Draw
const checkDraw = () => {
  if (count === 9 && !checkWinner()) {
    msg.textContent = "DRAW";
    msg.style.backgroundColor = "rgb(192, 32, 32)";
    playerScores[1].textContent = parseInt(playerScores[1].textContent) + 1;
  }
};
