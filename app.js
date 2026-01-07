let gameseq = [];
let userseq = [];
let hscore = 0;
let started = false;
let level = 0;

let buttoncolors = ["red", "blue", "green", "yellow"];
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

// Game flash (triggered by computer)
function gflash(btn) {
    btn.classList.add("gflash");
    setTimeout(function () {
        btn.classList.remove("gflash");
    }, 250);
}

// User flash (triggered by click)
function uflash(btn) {
    btn.classList.add("uflash");
    setTimeout(function () {
        btn.classList.remove("uflash");
    }, 250);
}

// Start game on keypress
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game Started");
        started = true;
        levelup();
    }
});

function levelup() {
    userseq = []; // Reset user sequence for the new level
    level++;
    h2.textContent = "Level " + level;

    // Pick a random button
    let randnum = Math.floor(Math.random() * 4);
    let randcolor = buttoncolors[randnum];
    let randbutton = document.querySelector(`#${randcolor}`);

    gameseq.push(randcolor);
    console.log("Game Sequence:", gameseq);
    gflash(randbutton);
}

function checkcl(idx) {
    if (userseq[idx] === gameseq[idx]) {
        // If the user finished the current sequence
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        // Game Over logic
        if (level - 1 > hscore) {
            hscore = level - 1; // Current score is level minus the one you failed
            h3.textContent = "High Score: Level " + hscore;
        }

        h2.innerHTML = `Game Over! Your score was <b>${level - 1}</b> <br> Press Any Key to Restart`;
        
        // Optional: Flash background red on failure
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

function btnprs() {
    if (!started) return; // Ignore clicks if game hasn't started

    let btn = this;
    uflash(btn);

    let userColor = btn.getAttribute("id");
    userseq.push(userColor);

    checkcl(userseq.length - 1);
}

let allBtns = document.querySelectorAll(".box");
for (let btn of allBtns) {
    btn.addEventListener("click", btnprs);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}
