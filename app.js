
let food = document.querySelector(".food");
let snake = document.querySelector(".snake");

let foodX = 0, foodY = 0; let speedX = 0, speedY = 0; let snakeX = 12, snakeY = 2;
let prevFoodX = 0, prevFoodY = 0;

let nav_bar = document.querySelector(".nav-bar");
let menu_btn = document.querySelector(".menu-btn");
let cross_btn = document.querySelector(".cross-btn");

menu_btn.addEventListener("click", () => {
    nav_bar.style.top = "60px";
    setTimeout(() => {
        nav_bar.style.opacity = "1";
        cross_btn.style.display = "block";
        menu_btn.style.display = "none";
    }, 300);
});

cross_btn.addEventListener("click", () => {
    nav_bar.style.top = "-120px";
    nav_bar.style.opacity = "0";
    setTimeout(() => {
        cross_btn.style.display = "none";
        menu_btn.style.display = "block";
    }, 300);
});

// ADDING Levels of speed

let speed = 200;
let blueBtn = document.querySelector(".blue");
blueBtn.style.backgroundColor = "royalblue";
blueBtn.addEventListener("click", () => {
    speed = 200;
    blueBtn.style.backgroundColor = "royalblue";
    redBtn.style.backgroundColor = "transparent";
    greenBtn.style.backgroundColor = "transparent";
    orangeBtn.style.backgroundColor = "transparent";
});

let redBtn = document.querySelector(".red");
redBtn.addEventListener("click", () => {
    speed = 100;
    redBtn.style.backgroundColor = "red";
    blueBtn.style.backgroundColor = "transparent";
    greenBtn.style.backgroundColor = "transparent";
    orangeBtn.style.backgroundColor = "transparent";
});

let greenBtn = document.querySelector(".green");
greenBtn.addEventListener("click", () => {
    speed = 300;
    greenBtn.style.backgroundColor = "limegreen";
    redBtn.style.backgroundColor = "transparent";
    blueBtn.style.backgroundColor = "transparent";
    orangeBtn.style.backgroundColor = "transparent";
});

let orangeBtn = document.querySelector(".orange");
orangeBtn.addEventListener("click", () => {
    speed = 400;
    orangeBtn.style.backgroundColor = "orange";
    greenBtn.style.backgroundColor = "transparent";
    redBtn.style.backgroundColor = "transparent";
    blueBtn.style.backgroundColor = "transparent";
});

// Navigation Button

let allBtn = document.querySelectorAll(".btn");
for (let btn of allBtn) {
    btn.addEventListener("click", () => {
        btn.style.boxShadow = "0 0 20px red";
        setTimeout(() => {
            btn.style.boxShadow = "0 0 0px red";
        }, 250);
        let nav = btn.getAttribute("id");
        // console.log(nav);
        changeDir(nav);

    });
}

let pause_btn = document.querySelector(".pause-btn");
let isGameStarted = false;
let gamePlay = () => {
    isGameStarted = false;
    setTimeout(() => {
        playBtn.style.display = "none";
        pause_btn.style.display = "block";
        speedX = 0;
        speedY = 1;
        snake.setAttribute("id", "bottom-radius");
        moveSnake();
    }, 100);
}

let speedX_at_pause = 0, speedY_at_pause = 0;
let resume_btn = document.querySelector(".resume-btn");
resume_btn.addEventListener("click", () => {
    pause_btn.style.display = "block";
    resume_btn.style.display = "none";
    snakeX = speedX_at_pause;
    snakeY = speedY_at_pause;
    moveSnake();
});

pause_btn.addEventListener("click", () => {
    clearInterval(IntervalId);
    pause_btn.style.display = "none";
    resume_btn.style.display = "block";
});

let playBtn = document.querySelector(".start-btn");
playBtn.addEventListener("click", gamePlay);

snake.setAttribute("id", "bottom-radius");

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        changeDir("top");
    }
    if (event.key === "ArrowRight") {
        changeDir("right");
    }
    if (event.key === "ArrowLeft") {
        changeDir("left");
    }
    if (event.key === "ArrowDown") {
        changeDir("bottom");
    }
    if (event.key === "s") {
        gamePlay();
    }
})

let gameOver = () => {
    if (snakeY > 25 || snakeX > 25 || snakeX < 1 || snakeY < 1) {
        // console.log("game over");
        clearInterval(IntervalId);
        document.querySelector(".game-over").style.display = "block";
        if ("vibrate" in navigator) {
            navigator.vibrate(300);
        } else {
            console.log("no vibration supported");
        }

    }
    for (let i = 0; i < snakeArr.length; i++) {
        if (prevSnakeCoordinate[i][0] == currheadY && prevSnakeCoordinate[i][1] == currheadX) {
            // console.log("game over");
            clearInterval(IntervalId);
            document.querySelector(".game-over").style.display = "block";
            if ("vibrate" in navigator) {
                navigator.vibrate(300);
            } else {
                console.log("no vibration supported");
            }
        }
    }
}

// Restart the game
let restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
    playBtn.style.display = "block";
    pause_btn.style.display = "none";
    speedX = 0;
    speedY = 1;
    snakeX = 12;
    snakeY = 2;
    newSnakeX = 0;
    newSnakeY = 0;
    snake.setAttribute("id", "bottom-radius");
    snake.classList.remove("snake-eye");
    prevSnakeCoordinate = [];
    document.querySelector(".game-over").style.display = "none";
    CurrScore = 0;
    for (let i = 0; i < snakeArr.length; i++) {
        snakeArr[i].style.display = "none";
    }
    snakeArr = [];
    let retrivedScore = localStorage.getItem("StoreHighScore");
    document.querySelector(".score").innerText = `Score: 0`;
    document.querySelector(".Hscore").innerText = `High Score: ${retrivedScore}`;
    changeFoodPlace();
});


let newSnakeX = 0, newSnakeY = 0; let IntervalId; let currheadX = 0, currheadY = 0;

let moveSnake = () => {
    IntervalId = setInterval(() => {
        snakeX += speedX;
        snakeY += speedY;
        speedX_at_pause = snakeX;
        speedY_at_pause = snakeY;
        currheadX = snakeX;
        currheadY = snakeY;
        gameOver();
        snake.style.gridArea = `${snakeY} / ${snakeX}`;
        newSnakeX = snakeX, newSnakeY = snakeY;
        if (dirTop) {
            newSnakeY++;
        } else if (dirRight) {
            newSnakeX--;
        } else if (dirLeft) {
            newSnakeX++;
        } else if (dirBottom) {
            newSnakeY--;
        }
        prevSnakeCoordinate.unshift([newSnakeY, newSnakeX]);
        for (let i = 0; i < snakeArr.length; i++) {
            snakeArr[i].style.gridArea = `${prevSnakeCoordinate[i][0]} / ${prevSnakeCoordinate[i][1]}`;
        }
        foodEat();
    }, speed);
}

let changeFoodPlace = () => {
    foodX = Math.floor(Math.random() * 25) + 1;
    foodY = Math.floor(Math.random() * 25) + 1;
    food.style.gridArea = `${foodY} / ${foodX}`;
}

let dirTop = false, dirBottom = false, dirRight = false, dirLeft = false;

// Changing the direction of snake

let changeDir = (nav) => {
    if (nav == "top" && speedY != 1) {
        speedX = 0;
        speedY = -1;
        dirTop = true; dirBottom = false, dirRight = false, dirLeft = false;
        snake.setAttribute("id", "top-radius");
        snake.classList.remove("snake-eye");
    } else if (nav == "right" && speedX != -1) {
        speedX = 1;
        speedY = 0;
        dirRight = true; dirTop = false, dirBottom = false, dirLeft = false;
        snake.setAttribute("id", "right-radius");
        snake.classList.add("snake-eye");
    } else if (nav == "left" && speedX != 1) {
        speedX = -1;
        speedY = 0;
        dirLeft = true; dirRight = false, dirTop = false, dirBottom = false;
        snake.setAttribute("id", "left-radius");
        snake.classList.add("snake-eye");
    } else if (nav == "bottom" && speedY != -1) {
        speedX = 0;
        speedY = 1;
        dirBottom = true; dirTop = false, dirRight = false, dirLeft = false;
        snake.setAttribute("id", "bottom-radius");
        snake.classList.remove("snake-eye");
    }
    gameOver();
}

if(!localStorage.getItem("StoreHightScore")) {
    document.querySelector(".Hscore").innerText = `High Score: 0`;
} 
document.querySelector(".Hscore").innerText = `High Score: ${localStorage.getItem("StoreHighScore")}`;

// had food eaten
let CurrScore = 0; let HighScore = 0;
let foodEat = () => {
    if (foodX == snakeX && foodY == snakeY) {
        prevFoodX = foodX;
        prevFoodY = foodY;
        prevSnakeCoordinate.push([foodX, foodY]);
        CurrScore++;
        // console.log("khana kha liya");

        if (CurrScore > HighScore) {
            HighScore = CurrScore;
            if (localStorage.getItem("StoreHighScore") < HighScore) {
                localStorage.setItem("StoreHighScore", HighScore);
            }
        }
        document.querySelector(".score").innerText = `Score: ${CurrScore}`;
        changeFoodPlace();
        incSize();
    }
}

let prevSnakeCoordinate = []; let snakeArr = [];

let newElmt;
let snakeBox = document.querySelector(".snake-area");
let incSize = () => {
    newElmt = document.createElement("div");
    newElmt.style.backgroundColor = "lime";
    snakeArr.push(newElmt);
    newElmt.style.gridArea = `${prevFoodY} / ${prevFoodX}`;
    // console.log(newElmt);
    snakeBox.appendChild(newElmt);
}

changeFoodPlace();
