/*
 * https://frontendeval.com/questions/rolling-dice
 *
 * Create a dice roller application that can roll anywhere from 1-99 six-sided dice
 */
document.querySelector("form").addEventListener("submit", setDice);

const facePoints = [
  [[50, 50]],
  [
    [0, 0],
    [100, 100],
  ],
  [
    [0, 0],
    [50, 50],
    [100, 100],
  ],
  [
    [0, 0],
    [0, 100],
    [100, 0],
    [100, 100],
  ],
  [
    [0, 0],
    [0, 100],
    [50, 50],
    [100, 0],
    [100, 100],
  ],
  [
    [0, 0],
    [0, 50],
    [0, 100],
    [100, 0],
    [100, 50],
    [100, 100],
  ],
];

function setDice(evt) {
  evt.preventDefault();
  const diceContainerEl = document.querySelector("#dice-container");
  diceContainerEl.innerHTML = "";

  const diceNum = +document.querySelector("#dice-number").value;
  let i = 0;
  while (i < diceNum) {
    const dice = document.createElement("div");
    dice.className = "dice";

    diceContainerEl.appendChild(dice);

    const pointContainer = document.createElement("div");
    pointContainer.className = "point-container";

    // Manage the points
    const diceFace = randomFace();
    const diceList = facePoints[diceFace - 1];
    diceList.forEach(([posX, posY]) => {
      const point = document.createElement("div");
      point.className = "point";
      point.style.left = `${posX}%`;
      point.style.bottom = `${posY}%`;
      pointContainer.appendChild(point);
    });

    dice.appendChild(pointContainer);
    i++;
  }
}

function randomFace() {
  return Math.ceil(Math.random() * 6);
}
