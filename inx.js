var screen = document.querySelectorAll(".screen");
var startBtn = document.querySelector("button");
var allelem = document.querySelectorAll(".elem");
var pg = document.querySelector(".playground");
var selected = "";
var gameOverMsg = document.getElementById("game-over");
var timeDiv = document.querySelector(".time-score h3 span");
var scorevalue = document.querySelector(".time-score h5 span");

var score = 0;
var sec = 0;
var gameActive = true;

startBtn.addEventListener("click", function(){
    screen[1].style.transform = "translateY(-100%)";
});

allelem.forEach(function(elem){
    elem.addEventListener("click", function(){  
        if (gameActive) { 
            selected = elem.childNodes[3].src;
            screen[2].style.transform = "translateY(-200%)";

            createImg();
            startTimer();
        }
    });
});

function createImg(){
    if (!gameActive) return; 

    var newImg = document.createElement("img");
    newImg.setAttribute("src", selected);
    newImg.addEventListener("click", catchImg);
    pg.appendChild(newImg);

    const {h, w, rot} = getRandom();
    newImg.style.left = w + "px";
    newImg.style.top = h + "px";
    newImg.style.rotate = rot + "deg";
}

function getRandom(){
    const h = Math.random() * (window.innerHeight - 200);
    const w = Math.random() * (window.innerWidth - 200);
    const rot = Math.floor(Math.random() * 360);
    return {h, w, rot};
}

function catchImg(){
    if (!gameActive) return; 

    increaseScore();
    this.style.opacity = 0;

    setTimeout(() => {
        this.style.opacity = 1;
    }, 2000);

    addImg();
}

function increaseScore(){
    score++;
    scorevalue.innerHTML = score;
}

function addImg(){
    if (!gameActive) return; 

    setTimeout(createImg, 1000);
    setTimeout(createImg, 1500);
}

function startTimer(){
    var timerInterval = setInterval(function(){
        sec++;
        timeDiv.innerHTML = `${Math.floor(sec / 60)} : ${sec % 60}`; 

        if(sec >= 60){ 
            clearInterval(timerInterval);
            endGame(); 
        }
    }, 1000);
}

function endGame(){
    gameActive = false; 
    gameOverMsg.style.display = "block";
    gameOverMsg.innerHTML = `GAME OVER <br> Your Score: ${score} <br> PLAY AGAIN?`;
    gameOverMsg.style.position = "absolute";
    gameOverMsg.style.top = "50%";
    gameOverMsg.style.left = "50%";
    gameOverMsg.style.transform = "translate(-50%, -50%)";
    gameOverMsg.style.fontSize = "2em";
    gameOverMsg.style.textAlign = "center";

    pg.innerHTML = ''; 
}
