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

const handleBoxClick = (event) => {
  const box = event.target;
  if (box.textContent === "") {
    box.textContent = currentPlayer;
    box.disabled = true;
    currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch players with ternary
    turn.textContent = `Turn: ${currentPlayer}`;
  }

  let isWinner = checkWinner();

  if (count === 9 && !isWinner) {
    gameDraw();
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", handleBoxClick);
});

const resetGame = () => {
  boxes.forEach((box) => {
    box.textContent = "";
    box.disabled = false;
  });
  currentPlayer = "X";
  turn.textContent = `Turn: ${currentPlayer}`;
};

reset.addEventListener("click", resetGame);

const showWinner = (winner) => {
  alert(`Congratulations, Winner is ${winner}`);
  boxes.disabled = true;
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    console.log(pattern);

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};
