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
    
    moveline1 += 10;
    moveline2 += 10;

    line1.forEach(line => {
        line.style.setProperty('--line1', `${moveline1}px`);
    })

    line2.forEach(line => {
        line.style.setProperty('--line2', `${moveline2}px`);
    })
    console.log(moveline1)

    reverseLinesOnLimit();
    // requestAnimationFrame(moveRoadLines);
    moveMainCharacterFrames();
}

function reverseLinesOnLimit() {
    // Reverse lines at hitting the limit

    if (moveline2 >= 350) {
        moveline2 = -700;
        
        // Hide Line 2 at reverse
        line2.forEach(line => {
            line.classList.add('hid-line');
        });

        // remove Hide Line 2 at timer
        setTimeout(() => {
            line2.forEach(line => {
                line.classList.remove('hid-line');
            });
        }, 110);
    }

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

// 
document.addEventListener('keydown', (e) => {

    if (e.key === "ArrowRight") {

        if (x > 520) {
            return x = 520;
        }
        x += 10;
        mainCharacterImg.style.setProperty('--x', `${x}px`);
    }
    if (e.key === "ArrowLeft") {

        if (x < -290) {
            return x = -290;
        }
        x -= 10;
        mainCharacterImg.style.setProperty('--x', `${x}px`);
    }
    
});


function moveMainCharacterInGame() {

}

// moveRoadLines();
 
// setInterval(moveMainCharacterFrames, 400);
// setInterval(moveRoadLines, 100);