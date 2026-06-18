// Select Lines for Movements 
const line1 = document.querySelectorAll('.line1'); 
const line2 = document.querySelectorAll('.line2'); 
const line3 = document.querySelectorAll('.line3');

// Hurdle Element
const hurdleElement1 = document.querySelector('.hurdle1')
const hurdleElement2 = document.querySelector('.hurdle2')
const hurdleElement3 = document.querySelector('.hurdle3')
const hurdleElement4 = document.querySelector('.hurdle4')


// Select main Character
const mainCharacterImg = document.querySelector('.character');
const timerBox = document.querySelector(".game-timer");

// Selection Other Elements.
const VolumeIcon = document.querySelector('volume-icon');
const setVolume = document.querySelector('#gameVolume');
const audioElement = new Audio("./Assets/Background_Sound.mp3");


// Move Road Lines variables initial values
let moveline1 = 0;



// Move Main Character.
let x = 0, y = 0, z = 0;

// img Frames for Running.
let frames = ["first", "second", "third", "fourth"];

// change the position of hurdles
let obstaclesArrayOfPostions = [30, 250, 475, 700]
let hurdleNo1 = 0;
let hurdleNo2 = -165;
let hurdleNo3 = -120;
let hurdleNo4 = -240;


// Other variables
let RunningTurns = 0;
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
    moveMainCharacterFrames();
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
        y -= 100;
        z += 50;
        audioElement.play();
        mainCharacterImg.style.setProperty('--y', `${y}px`);
        mainCharacterImg.style.setProperty('--z', `${z}px`);
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

// Mute the Volume.
VolumeIcon.addEventListener('click', (e) => {
    // console.log(e);
    console.log("Hello")
    // VolumeIcon.classList.toggle('fa-volume-mute')
    // VolumeIcon.muted = true;
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




// setInterval(SlideObstaclesOnField, 200);
// setInterval(Timer, 1000);

// setInterval(moveMainCharacterFrames, 400);
// setInterval(moveRoadLines, 100);