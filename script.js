// Select Lines for Movements 
const line1 = document.querySelectorAll('.line1'); 
const line2 = document.querySelectorAll('.line2'); 
const line3 = document.querySelectorAll('.line3');
// Select main Character
const mainCharacterImg = document.querySelector('.character');


 
// Move Road Lines variables initial values
let moveline1 = 0;
let moveline2 = 0;


// Move Main Character.
let x = 0, y = 0, z = 0;
let RunningTurns = 0;
let frames = ["first", "second", "third", "fourth"];




// Move Road Lines
function moveRoadLines() {
    
    moveline1 += 5;
    moveline2 += 5;

    line1.forEach(line => {
        line.style.setProperty('--line1', `${moveline1}px`);
    })

    line2.forEach(line => {
        line.style.setProperty('--line2', `${moveline2}px`);
    })
    console.log(moveline1)

    reverseLinesOnLimit();
    // requestAnimationFrame(moveRoadLines);
    // moveMainCharacterInGame();
}

function reverseLinesOnLimit() {
    // Reverse lines at hitting the limit

    if (moveline2 >= 350) {
        moveline2 = -500;
        
        // Hide Line 2 at reverse
        line2.forEach(line => {
            line.classList.add('hid-line');
        });

        // remove Hide Line 2 at timer
        setTimeout(() => {
            line2.forEach(line => {
                line.classList.remove('hid-line');
            });
        }, 100);
    }

    if (moveline1 >= 700) {
        moveline1 = -1600;

        // Hide Line 1 at reverse
        line1.forEach(line => {
            line.classList.add('hid-line');
        });

        // remove Hide Line 1 at timer
        setTimeout(() => {
            line1.forEach(line => {
                line.classList.remove('hid-line');
            });
        }, 90);
    }
}



function moveMainCharacterInGame() {

    mainCharacterImg.src = `./Assets/Runner/${frames[RunningTurns]}.png`;

    RunningTurns = (RunningTurns + 1) % frames.length;
    // console.log("Frames = ", RunningTurns);

    // if (RunningTurns === 0) {
    //     mainCharacterImg.src = "./Assets/Runner/first.png";
    //     RunningTurns += 1;
    // }

    // if (RunningTurns === 1) {
    //     mainCharacterImg.src = "./Assets/Runner/second.png";
    //     RunningTurns++;
    // }

    // if (RunningTurns === 2) {
    //     mainCharacterImg.src = "./Assets/Runner/third.png";
    //     RunningTurns++;
    // }

    // if (RunningTurns === 3) {
    //     mainCharacterImg.src = "./Assets/Runner/fourth.png";
    //     RunningTurns = 0;
    // }
}

// moveRoadLines();
 
// setInterval(moveMainCharacterInGame, 400);
setInterval(moveRoadLines, 200);


// requestAnimationFrame(moveRoadLines);