console.log("Here be dragons!");

const MAX_DRAGON_NAME = 4;
const DIRECTIONS = ["left", "right", "up", "down"];
const DRAGON_SIZE = 50;

function setStartPosition(direction, dragon) {
  switch (direction) {
    case "left":
      dragon.style.top = Math.floor(Math.random() * window.innerHeight) + "px";
      dragon.style.left = window.innerWidth + "px";
      break;
    case "right":
      dragon.style.top = Math.floor(Math.random() * window.innerHeight) + "px";
      dragon.style.left = `-${DRAGON_SIZE/2}px`;
      break;
    case "up":
      dragon.style.top = window.innerHeight + "px";
      dragon.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
      break;
    case "down":
      dragon.style.top = `-${DRAGON_SIZE/2}px`;
      dragon.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
      break;
  }
}

function spawnDragon() {
  const dragon = document.createElement("img");
  const direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
  dragon.classList.add("unadragon");
  dragon.dataset.direction = direction;

  dragon.style.width = `${DRAGON_SIZE}px`;
  dragon.style.height = `${DRAGON_SIZE}px`;

  dragon.style.position = "fixed";
  setStartPosition(direction, dragon);
  dragon.style.zIndex = "999999";

  const index = Math.floor(Math.random() * MAX_DRAGON_NAME) + 1;
  dragon.src = chrome.runtime.getURL(`/images/dragon_${index}.png`);

  document.body.appendChild(dragon);
}

const MOVE_AMOUNT = 10;
function moveDragon(dragon) {
  const direction = dragon.dataset.direction;
  switch (direction) {
    case "left":
      dragon.style.left = parseInt(dragon.style.left) - MOVE_AMOUNT + "px";
      dragon.style.top = parseInt(dragon.style.top) +  Math.floor(Math.random() * MOVE_AMOUNT - (MOVE_AMOUNT / 2)) + "px";
      break;
    case "right":
      dragon.style.left = parseInt(dragon.style.left) + MOVE_AMOUNT + "px";
      dragon.style.top = parseInt(dragon.style.top) + Math.floor(Math.random() * MOVE_AMOUNT - (MOVE_AMOUNT / 2)) + "px";
      break;
    case "up":
      dragon.style.top = parseInt(dragon.style.top) - MOVE_AMOUNT + "px";
      dragon.style.left = parseInt(dragon.style.left) + Math.floor(Math.random() * MOVE_AMOUNT - (MOVE_AMOUNT / 2)) + "px";
      break;
    case "down":
      dragon.style.top = parseInt(dragon.style.top) + MOVE_AMOUNT + "px";
      dragon.style.left = parseInt(dragon.style.left) + Math.floor(Math.random() * MOVE_AMOUNT - (MOVE_AMOUNT / 2)) + "px";
      break;
  }
}

function maybeRemoveDragon(dragon) {
  if (parseInt(dragon.style.left) > window.innerWidth) dragon.remove();
  else if (parseInt(dragon.style.top) > window.innerHeight) dragon.remove();
  else if (parseInt(dragon.style.left) < -1 * DRAGON_SIZE) dragon.remove();
  else if (parseInt(dragon.style.top) < -1 * DRAGON_SIZE) dragon.remove();
}

const MAX_DRAGONS = 3;
setInterval(() => {
  const dragons = document.querySelectorAll(".unadragon");

  dragons.forEach(moveDragon);
  dragons.forEach(maybeRemoveDragon);

  if (dragons.length < MAX_DRAGONS && Math.random() < 0.01) {
    spawnDragon();
  }
}, 50);
