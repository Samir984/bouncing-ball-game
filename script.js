"use strict";

//dom user setting
const gameStateBtn = document.querySelector(".game-state");
const reStartBtn = document.querySelector(".restart-btn");
const scoreNum = document.querySelector(".score-num");
const jumpBtn = document.querySelector(".mobile-jump-btn");
const popUp = document.querySelector(".pop-up");

//dom game component
const ball = document.querySelector(".ball");
const obstracle = document.querySelector(".obstracle");
const gameComponent = document.querySelector(".game-component");
const gameStateCapture = document.querySelector(".game-state-capture");

// varible
let evenListerCount = 0;
let score = 0;
let ObsInterval = null;
let obsDuration = parseFloat(getComputedStyle(obstracle).animationDuration);
let ballDuration = parseFloat(getComputedStyle(ball).animationDuration);
//toggle on start and pause
const toggleClass = function (action) {
  gameStateBtn.classList.toggle("game-pause");
  gameStateBtn.classList.toggle("game-start");
  //restart action
  reStartBtn.style.display = action;
};

const gameStart = function () {
  evenListerCount++;
  gameStateBtn.style.display = "flex";

  collisionDetection();
  ball.style.animationPlayState = "running";
  obstracle.style.animationPlayState = "running";
  ball.style.animationName = "none";

  // on ArrowUP Key
  if (evenListerCount === 1) {
    jumpBtn.addEventListener("click", function (e) {
      if (ball.style.animationName === "none") {
        ball.style.animationName = "jumpAnimation";

        setTimeout(function () {
          ball.style.animationName = "none";
        }, ballDuration * 1000);
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowUp" && ball.style.animationName === "none") {
        ball.style.animationName = "jumpAnimation";
        setTimeout(function () {
          ball.style.animationName = "none";
        }, ballDuration * 1000);
      }
    });
  }
};

const gamePause = function () {
  ball.style.animationPlayState = "paused";
  obstracle.style.animationPlayState = "paused";
  clearInterval(ObsInterval);
};

//on cliking gamestate btn
gameStateBtn.addEventListener("click", function () {
  if (gameStateBtn.classList.contains("game-pause")) {
    toggleClass("flex");
    gameStart();
  } else {
    toggleClass("none");
    gamePause();
  }
});

//reastart functionality
reStartBtn.addEventListener("click", function () {
  score = 0;
  scoreNum.textContent = score;
  obstracle.style.animationName = "none";
  ball.style.animationName = "none";
  popUp.style.top = "-10%";

  setTimeout(function () {
    obstracle.style.animationName = "moveAnimation";
    ball.style.animationName = "jumpAnimation";
    ball.style.animationName = "none";
  }, 700);
  gameStart();
});

//random number generate
const randomNum = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// Loose Pop UP
const loosePopUp = function () {
  popUp.style.top = "50%";
  gameStateBtn.style.display = "none";
};

//handling collision detection
const collisionDetection = function () {
  // changing obstracle width
  ObsInterval = setInterval(() => {
    const obsBound = obstracle.getBoundingClientRect();
    const ballBound = ball.getBoundingClientRect();

    if (obsBound.x < -10) {
      let getheight = randomNum(1, 13);
      obstracle.style.height = `${getheight * 10}px`;
      score++;
    }

    if (
      obsBound.x <= ballBound.x + ballBound.width &&
      obsBound.x + obsBound.width >= ballBound.x &&
      obsBound.y <= ballBound.y + ballBound.height &&
      obsBound.y + obsBound.height >= ballBound.y
    ) {
      gamePause();
      loosePopUp();
      return;
    } else {
      scoreNum.textContent = score;
    }
  }, 50);
};

//handling speed of obstracle on window screen resize
const handelObsSpeed = function () {
  const browerWidth = window.innerWidth;
  if (browerWidth <= 1300) {
    obsDuration = browerWidth / 330;
    // ballDuration = obsDuration / 2;
    console.log(obsDuration, ballDuration);
    obstracle.style.animationDuration = `${obsDuration}s`;
    ball.style.animationDuration = `${ballDuration}s`;
  }
};

window.addEventListener("resize", handelObsSpeed);
handelObsSpeed();
