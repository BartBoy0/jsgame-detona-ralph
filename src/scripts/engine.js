const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    hp: document.querySelector("#hp"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    lifes: 3,
    curretTime: 60,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  },
};
function reset(state){
    state.values = {
      gameVelocity: 1000,
      hitPosition: 0,
      result: 0,
      lifes: 3,
      curretTime: 60,
    };
    state.actions = {
      timerId: setInterval(randomSquare, 1000),
      countDownTimerId: setInterval(countDown, 1000),
    };
    state.view.hp.textContent = "x" + state.values.lifes;
    state.view.score.textContent = state.values.result;
    state.view.timeLeft.textContent = state.values.curretTime;
  };


function countDown() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;

  if (state.values.curretTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert("Game Over! O seu resultado foi: " + state.values.result);
    reset(state);
  }
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
        randomSquare();
      }else{
        state.values.lifes--;
        state.view.hp.textContent = "x" + state.values.lifes;
        if(state.values.lifes == 0){
          state.values.curretTime = 0;
          countDown();
        }
      }
    });
  });
}

function initialize() {
  addListenerHitBox();
}

initialize();
