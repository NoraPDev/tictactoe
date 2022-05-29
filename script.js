// 
let a1 = document.getElementById("a1");
let a2 = document.getElementById("a2");
let a3 = document.getElementById("a3");
let b1 = document.getElementById("b1");
let b2 = document.getElementById("b2");
let b3 = document.getElementById("b3");
let c1 = document.getElementById("c1");
let c2 = document.getElementById("c2");
let c3 = document.getElementById("c3");
let playerX = document.getElementById("player-X");
let playerO = document.getElementById("player-O");
var actualPlayer = "X";
var scores = {
    X: 0,
    O: 0
};

var board = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"];

let matches=[
    [ 'a1', 'a2', 'a3'],
    [ 'b1', 'b2', 'b3'],
    [ 'c1', 'c2', 'c3'],

    [ 'a1', 'b1', 'c1'],
    [ 'a2', 'b2', 'c2'],
    [ 'a3', 'b3', 'c3'],

    [ 'a1', 'b2', 'c3'],
    [ 'a3', 'b2', 'c1']
];

// Change welcome screen to game screen
const change = document.getElementById("change")
const gameArea = document.getElementById("game-area")
const welcomeArea = document.getElementById("welcome-area")
const endGameArea = document.getElementById("end-game-area")

change.addEventListener('click', () => {
    gameArea.classList.remove("hide");
    welcomeArea.classList.add("hide");
})

function chooseOpponent() {
    if (document.getElementById("ai").checked) {
        playerO.disabled = true;
        playerO.value = "Computer";
    } else {
        playerO.disabled = false;
        playerO.value = "";
    }
}

function inputPlayerNames() {
    document.getElementById("text-content").innerHTML = playerX.value + ": " + scores.X + "<br>" + playerO.value + ": " + scores.O;
}

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
    board = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"];
    actualPlayer = "X";    
}

function startGame() {
    if (playerX.value == "" || playerO.value == "") {
        popUp(`Type in players' names, please!`)
    } else {
    resetCells();
    document.getElementById("text-content").innerHTML = playerX.value + ": " + scores.X + " <br>" + playerO.value + ": " + scores.O;
    document.getElementById("buttons-box").classList.remove("hide");
    document.getElementById("playerNames").classList.add("hide");
    document.getElementById("board-area").classList.remove("hide");
    }
}

function restartGame() {
    resetCells();
}

function resetGame() {
    Swal.fire({
        title: 'Are you sure you want to reset the game?',
        text: "You will lose your scores and games and won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reset the whole game!'
      }).then((result) => {
        if (result.isConfirmed) {
            resetCells();
            playerX.value = "";
            playerO.value = "Computer";
            playerO.disabled = true;
            scores = { X: 0, O: 0 };
            document.getElementById("text-content").innerHTML = "";
            document.getElementById("buttons-box").classList.add("hide");
            document.getElementById("playerNames").classList.remove("hide");
            document.getElementById("board-area").classList.add("hide");
            document.getElementById("human").checked=false;
            document.getElementById("ai").checked=true;
        }
      })
}

// check if there are three X's or O's horizontally, vertically or diagonally
function cellMatches() {
    if(
        (a1.value==a2.value && a2.value==a3.value && a1.value != "") ||
        (b1.value==b2.value && b2.value==b3.value && b1.value != "") ||
        (c1.value==c2.value && c2.value==c3.value && c1.value != "") ||

        (a1.value==b2.value && b2.value==c3.value && a1.value != "") ||
        (a3.value==b2.value && b2.value==c1.value && a3.value != "") ||

        (a1.value==b1.value && b1.value==c1.value && a1.value != "") ||
        (a2.value==b2.value && b2.value==c2.value && a2.value != "") ||
        (a3.value==b3.value && b3.value==c3.value && a3.value != "")
    ) {return true;} else {return false;}
} 

function popUp(message) {
    Swal.fire({
        title: (message),
        showClass: {
            popup: 'animate_animated animate_fadeInDown'
        },
        hideClass: {
            popup: 'animate_animated animate_fadeOutUp'
        }
    })
}

function checkCells() {
    // rows, diagonals, cols
    if(cellMatches()) {
                popUp(`Congratulations! `+document.getElementById("player-"+actualPlayer).value+` (${actualPlayer}) won this round!<br><img id="wargames" src="https://64.media.tumblr.com/a1cf0a4ac8088bb7712e43155e88d3e7/tumblr_mv15b8E0Fz1r4zr8xo3_500.gif" alt="Congratulations">`);
                scores[actualPlayer] ++;
                document.getElementById("text-content").innerHTML = playerX.value + ": " + scores.X + " <br>" + playerO.value + ": " + scores.O;
    } else {
        if(board.length == 0) {popUp(`It's a draw!`);}
        
    }
}


function gameInput(object) {
    if (object.value == "" && document.getElementById("playerNames").classList.contains("hide") == true && !cellMatches()){
        object.value = actualPlayer;                // Add X or O to the board
        board.splice(board.indexOf(object.id), 1);  // remove actual cell with input X or O
        checkCells();                               // Check if there is a winner
        // Identify next player
        if (actualPlayer == "X") {
            actualPlayer = "O";
            if (document.getElementById("ai").checked && board.length > 0) {aiGame();}
        } else {
            actualPlayer = "X";
        } 
    } 
}

// create random number to play with computer
function aiGame() {
    var result = false;
    // OO_
    for (i=0; i<matches.length; i++){
        if (document.getElementById(matches[i][0]).value=='O' && document.getElementById(matches[i][1]).value=='O' && document.getElementById(matches[i][2]).value=='') { result=matches[i][2]; }
        if (document.getElementById(matches[i][0]).value=='O' && document.getElementById(matches[i][2]).value=='O' && document.getElementById(matches[i][1]).value=='') { result=matches[i][1]; }
        if (document.getElementById(matches[i][1]).value=='O' && document.getElementById(matches[i][2]).value=='O' && document.getElementById(matches[i][0]).value=='') { result=matches[i][0]; }
    }
    if (!result){
        result = board[Math.floor(Math.random() * (board.length -1))];
    }
    gameInput(document.getElementById(result));
}
