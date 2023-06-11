"use strict";

//dom user setting
const gameStateBtn = document.querySelector(".game-state");
const reStartBtn = document.querySelector(".restart-btn");
const scoreNum = document.querySelector(".score-num");

//dom game component
const ball = document.querySelector(".ball");
const obstracle = document.querySelector(".obstracle");
const gameComponent = document.querySelector(".game-component");
const gameStateCapture = document.querySelector(".game-state-capture");

// varible
let evenListerCount = 0;

//toggle on start and pause
const toggleClass = function (action) {
  gameStateBtn.classList.toggle("game-pause");
  gameStateBtn.classList.toggle("game-start");
  //restart action
  reStartBtn.style.display = action;
};

const gameStart = function () {
  evenListerCount++;
  ball.style.animationPlayState = "running";
  obstracle.style.animationPlayState = "running";
  ball.style.animationName = "none";

  // on ArrowUP Key
  if (evenListerCount === 1) {
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowUp" && ball.style.animationName === "none") {
        ball.style.animationName = "jumpAnimation";
        setTimeout(function () {
          ball.style.animationName = "none";
        }, 700);
      }
    });
  }
};

const gamePause = function () {
  ball.style.animationPlayState = "paused";
  obstracle.style.animationPlayState = "paused";
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
  scoreNum.textContent = "0";
  obstracle.style.animationName = "none";
  ball.style.animationName = "none";

  setTimeout(function () {
    obstracle.style.animationName = "moveAnimation";
    ball.style.animationName = "jumpAnimation";
    ball.style.animationName = "none";
  }, 100);
});

//randomnumber generate
const randomNum = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

//handling collision detection and obstarcle width
const ObsInterval = setInterval(() => {
  const obsBound = obstracle.getBoundingClientRect();
  if (obsBound.x < -20) {
    let getheight = randomNum(1, 13);
    obstracle.style.height = `${getheight * 10}px`;
  }
}, 100);

//handling speed of obstracle on window screen resize
const handelObsSpeed = function () {
  const browerWidth = window.innerWidth;
  if (browerWidth <= 1500) {
    let time = browerWidth / 250;
    console.log(time);
    obstracle.style.animationDuration = `${time}s`;
  }
};

window.addEventListener("resize", handelObsSpeed);
handelObsSpeed();
