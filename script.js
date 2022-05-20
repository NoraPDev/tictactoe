let a1 = document.getElementById("a1");
let a2 = document.getElementById("a2");
let a3 = document.getElementById("a3");
let b1 = document.getElementById("b1");
let b2 = document.getElementById("b2");
let b3 = document.getElementById("b3");
let c1 = document.getElementById("c1");
let c2 = document.getElementById("c2");
let c3 = document.getElementById("c3");
let playerX = document.getElementById("player-x");
let playerO = document.getElementById("player-o");
var actualPlayer = "X";
var playerXScore = 0;
var playerOScore = 0;

const change = document.getElementById("change")
const gameArea = document.getElementById("game-area")
const welcomeArea = document.getElementById("welcome-area")

change.addEventListener('click', () => {
    console.log('hello')
    gameArea.classList.remove("hide")
    welcomeArea.classList.add("hide")
})

function resetCells() {
    a1.value = "";
    a2.value = "";
    a3.value = "";
    b1.value = "";
    b2.value = "";
    b3.value = "";
    c1.value = "";
    c2.value = "";
    c3.value = "";
}

function startGame() {
    resetCells();

}

function checkCells() {
    // rows, diagonals, cols
    if(
        (a1.value==a2.value && a2.value==a3.value && a1.value != "") ||
        (b1.value==b2.value && b2.value==b3.value && b1.value != "") ||
        (c1.value==c2.value && c2.value==c3.value && c1.value != "") ||

        (a1.value==b2.value && b2.value==c3.value && a1.value != "") ||
        (a3.value==b2.value && b2.value==c1.value && a3.value != "") ||

        (a1.value==b1.value && b1.value==c1.value && a1.value != "") ||
        (a2.value==b2.value && b2.value==c2.value && a2.value != "") ||
        (a3.value==b3.value && b3.value==c3.value && a3.value != "")
        ) {
    Swal.fire({
        title: `${actualPlayer} won!`,
        showClass: {
            popup: 'animate_animated animate_fadeInDown'
        },
        hideClass: {
            popup: 'animate_animated animate_fadeOutUp'
        }
    })
    document.getElementById("text-content").innerHTML = "Hello World!";
    }
    

}


function gameInput(object) {
    if (object.value == ""){
        object.value = actualPlayer;    // Add X or O to the board
        checkCells();
        if (actualPlayer == "X") {
            actualPlayer = "O";
        } else {
            actualPlayer = "X";
        } 
    } 
}

