 let gameseq = [];
 let userseq = [];
 let hscore=0;
    let cscore=0;
let buttoncolors = ["red", "blue", "green", "yellow"];
let started = false;

let h2 = document.querySelector("h2");
let level = 0;

function gflash(b) {
    b.classList.add("gflash");
    setTimeout(function() {
        b.classList.remove("gflash");
    }, 300);
}
function uflash(b) {
    b.classList.add("uflash");
    setTimeout(function() {
        b.classList.remove("uflash");
    }, 300);
}



document.addEventListener("keypress", function() {
    if (!started) {
        console.log("Game Started");
        started = true;
        levelup();
    }
});

function levelup() {
    userseq = [];

    level++;
    h2.textContent = "Level " + level;


    let randnum = Math.floor(Math.random() * 4);
    let randcolor = buttoncolors[randnum];
    
    let randbutton = document.querySelector(`#${randcolor}`);
   
        gflash(randbutton);
    gameseq.push(randcolor);
    console.log(gameseq);
    
}
function checkcl() {
    let idx = userseq.length - 1;
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        if(level>hscore){
            hscore=level;
            document.querySelector("h3").textContent="highscore : level "+hscore;
        }
        console.log("Game Over");
        h2.textContent = "Game Over, Press Any Key to Restart";
        started = false;
        gameseq = [];
        level = 0;
    }
}


 function btnprs(){
    let btn =this;
    let btnid = btn.id;
    userseq.push(btnid);
    console.log(userseq);
    checkcl();

uflash(btn);



}

let boxes = document.querySelectorAll(".box");
for (box of boxes)
    {
        box.addEventListener("click",  btnprs);
    }