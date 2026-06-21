// Select Lines for Movements 
const line1 = document.querySelectorAll('.line1'); 
const line2 = document.querySelectorAll('.line2'); 
const line3 = document.querySelectorAll('.line3');

// Hurdle Element
const hurdleElement1 = document.querySelector('.hurdle1');
const hurdleElement2 = document.querySelector('.hurdle2');
const hurdleElement3 = document.querySelector('.hurdle3');
const hurdleElement4 = document.querySelector('.hurdle4');


// Select main Character
const mainCharacterImg = document.querySelector('.character');
const timerBox = document.querySelector(".game-timer");
const gameArea = document.querySelector('.game-area');
const restartBtn = document.querySelector('.restart');
const gameoverImgElement = document.querySelector('.gameover-frames');
const gameoverbanner = document.querySelector('.gameoverbanner');


// Selection Other Elements.
const VolumeIcon = document.querySelector('.volume-icon');
const setVolume = document.querySelector('#gameVolume');
const audioElement = new Audio("./Assets/Background_Sound.mp3");


// Move Road Lines variables initial values
let moveline1 = 0;



// Move Main Character.
let x = 0, y = 0, z = 0;

// img Frames for Running.
let frames = ["first", "second", "third", "fourth"];
let gameoverFrames = ["runner_frame_0", "runner_frame_1", "runner_frame_2", "runner_frame_3", "runner_frame_4", "runner_frame_5", "runner_frame_6", "runner_frame_7"];
let jumpImgFrames = ["1", "2", "3", "4"];


// change the position of hurdles
let obstaclesArrayOfPostions = [30, 250, 475, 700]
let hurdleNo1 = 0;
let hurdleNo2 = -165;
let hurdleNo3 = -120;
let hurdleNo4 = -240;


// Other variables
let RunningTurns = 0;
let gameoverFramesCount = 0;
let jumpFramesCount = 0;
// Variable that count when the jump clears or when not.
let setAndClearIntervalOnJump = 0;
let startTime = Date.now();


// Move Road Lines
function moveRoadLines() {
    
    moveline1 += 10;
    // moveline2 += 10;

    line1.forEach(line => {
        line.style.setProperty('--line1', `${moveline1}px`);
    })

    reverseLinesOnLimit();
    // requestAnimationFrame(moveRoadLines);
}

function reverseLinesOnLimit() {
    // Reverse lines at hitting the limit

    if (moveline1 >= 600) {
        moveline1 = -700;

        // Hide Line 1 at reverse
        line1.forEach(line => {
            line.classList.add('hid-line');
        });

        // remove Hide Line 1 at timer
        setTimeout(() => {
            line1.forEach(line => {
                line.classList.remove('hid-line');
            });
        }, 110);
    }
}



function moveMainCharacterFrames() {

    mainCharacterImg.src = `./Assets/Runner/${frames[RunningTurns]}.png`;

    RunningTurns = (RunningTurns + 1) % frames.length;
    // console.log("Frames = ", RunningTurns);
}


// Control The Movements of Players Through x-axis.
document.addEventListener('keydown', moveMainCharacterInGame);
function moveMainCharacterInGame(e) {

    // Play Music
    playBackgroundMusic();

    // To Move Left Side. 
    if (e.key === "ArrowRight") {
        
        if (x > 520) {
            return x = 520;
        }
        x += 10;
        mainCharacterImg.style.setProperty('--x', `${x}px`);
    }

    // To Move Right Side. 
    if (e.key === "ArrowLeft") {

        if (x < -290) {
            return x = -290;
        }
        x -= 10;
        mainCharacterImg.style.setProperty('--x', `${x}px`);
    }

    if (e.key === "ArrowUp") {

        if (y === -400) {
            return y = -400;
        }

        y -= 10;
        mainCharacterImg.style.setProperty('--y', `${y}px`);
    }
    
    if (e.key === "ArrowDown") {
        if (y === 10) {
            return y = 10;
        }
        y += 10;
        mainCharacterImg.style.setProperty('--y', `${y}px`);
    }

}


// 
document.addEventListener('keyup', JumpOnHurdles);


function JumpOnHurdles(e) {
    if (e.code === "Space") {

        clearInterval(moveMainCharacterFramesIntervalId);
        
        // Add Frames of Jump
        jumpIntervalId = setInterval(() => {
            if (y < -300) {
                return y = -300;   // Some adjustments in code
            }

            // Push the playe on y-axis above.
            y -= 50;

            mainCharacterImg.src = `./Assets/Jump/${jumpImgFrames[jumpFramesCount]}.png`;
            jumpFramesCount = (jumpFramesCount + 1) % jumpImgFrames.length;
            
            mainCharacterImg.style.setProperty('--y', `${y}px`);

            setAndClearIntervalOnJump++;

            if (setAndClearIntervalOnJump > 3) {

                clearInterval(jumpIntervalId);
                setAndClearIntervalOnJump = 0;
                moveMainCharacterFramesIntervalId = setInterval(moveMainCharacterFrames, 200);
            }
        }, 150);
    }
}



// Move the Hurdles
function SlideObstaclesOnField() {
    hurdleNo1 += 15;
    hurdleNo2 += 15;
    hurdleNo3 += 15;
    hurdleNo4 += 15;

    hurdleElement1.style.setProperty('--hurdle1Y', `${hurdleNo1}px`);
    
    hurdleElement2.style.setProperty('--hurdle2Y', `${hurdleNo2}px`);

    hurdleElement3.style.setProperty('--hurdle3Y', `${hurdleNo3}px`);

    hurdleElement4.style.setProperty('--hurdle4Y', `${hurdleNo4}px`);

    reverseHurdlesOnHittingLimit();
}


// Reverse the hurdles on 
function reverseHurdlesOnHittingLimit(){
    // reverse hurdle 1
    if (hurdleNo1 > 705) {
        hurdleNo1 = -120;
        hurdleElement1.classList.add('hid-line');
        
        // hide hurdle when reverse
        setTimeout(() => {
            hurdleElement1.classList.remove('hid-line')
        }, 200);
    }
    
    // reverse hurdle 2
    if (hurdleNo2 > 780) {
        hurdleNo2 = -120;
        hurdleElement2.classList.add('hid-line');
        
        // hide hurdle when reverse
        setTimeout(() => {
            hurdleElement2.classList.remove('hid-line')
        }, 200);
    }
    
    // reverse hurdle 3
    if (hurdleNo3 > 780) {
        hurdleNo3 = -180;
        hurdleElement3.classList.add('hid-line');
        
        // hide hurdle when reverse
        setTimeout(() => {
            hurdleElement3.classList.remove('hid-line');
        }, 200);
    }
    
    // reverse hurdle 4
    if (hurdleNo4 > 810) {
        hurdleNo4 = -300;
        hurdleElement4.classList.add('hid-line');
        
        // hide hurdle when reverse
        setTimeout(() => {
            hurdleElement4.classList.remove('hid-line');
        }, 200);
    }
}


// Change Volume background
setVolume.addEventListener('change', (e) => {
    const time = (e.target.value / 100).toFixed(1);
    audioElement.volume = time;
    // console.log(time);
});


audioElement.muted = true;


// Mute the Volume.
VolumeIcon.addEventListener('click', (e) => {
    
    if (VolumeIcon.classList.contains('fa-volume-high')) {
        audioElement.muted = true;
        VolumeIcon.classList.remove('fa-volume-high');
        VolumeIcon.classList.add('fa-volume-mute');
    } else {
        audioElement.muted = false;
        VolumeIcon.classList.remove('fa-volume-mute')
        VolumeIcon.classList.add('fa-volume-high');
    }
})


// Play Music function
function playBackgroundMusic() {
    if (audioElement.paused){
        audioElement.play();
    }
}


function Timer() {
    const time = Math.floor((Date.now() - startTime) / 1000)
    
    // Count Seconds  
    let secs = String(time % 60).padStart(2, "0");
    // Count Minutes  
    let min = String(Math.floor(time / 60) % 60).padStart(2, "0");
    // Count Hours  
    let hour = String(Math.floor(time / 3600)).padStart(2, "0");
    
    timerBox.innerText = `${hour}:${min}:${secs}`;
}



// gameArea ka pehla sibling select karo or class add karo.
function addLayoutOnGameOver(){
    let element = gameArea.firstElementChild;
    element.classList.add('overlay');
    gameoverImgElement.src = `./Assets/Gameover/${gameoverFrames[gameoverFramesCount]}.png`;
    // change image on each call when count is gameoverFrames.length -> It will reset it.
    gameoverFramesCount = (gameoverFramesCount + 1) % gameoverFrames.length;
}


// restart game of click button
restartBtn.addEventListener('click', (event) => {
    location.reload();
});




function tasksAtGameOver() {
    gameoverbanner.style.display = "";
    addLayoutOnGameOver();
}




//  Now Declare Variables for Game Loop.
let MoveTimerOneSecVar = 2;
let SlideObstaclesVar = 0;
let moveRoadLinesVar = 0;
let MoveTimerOneSec = 0;

let startMotionTime = 0;
let lastTime = 10;


function ControlWholeGameMovements(timeStamp) {
    
    if (startMotionTime/1000 > MoveTimerOneSec) {
        moveMainCharacterFrames();
        startMotionTime = 0;
    }
    startMotionTime = timeStamp - lastTime;
    console.log(startMotionTime)
    
    // SlideObstaclesOnField();
    // moveRoadLines();
    // Timer();
    requestAnimationFrame(ControlWholeGameMovements);
}





// addLayoutOnGameOver();

// requestAnimationFrame(ControlWholeGameMovements);

// setInterval(addLayoutOnGameOver, 100);


// setInterval(SlideObstaclesOnField, 200);
// setInterval(Timer, 1000);

// let moveMainCharacterFramesIntervalId = setInterval(moveMainCharacterFrames, 200);
// setInterval(moveRoadLines, 100);
