// typewriter text
const text="GREETINGS! \n\n SHALL WE PLAY A GAME? \n A STRANGE GAME. \n\n THE ONLY WINNING MOVE IS NOT TO PLAY.";
const playerX = document.getElementById("player-X");
const playerO = document.getElementById("player-O");
const a1 = document.getElementById("a1");
const a2 = document.getElementById("a2");
const a3 = document.getElementById("a3");
const b1 = document.getElementById("b1");
const b2 = document.getElementById("b2");
const b3 = document.getElementById("b3");
const c1 = document.getElementById("c1");
const c2 = document.getElementById("c2");
const c3 = document.getElementById("c3");

let actualPlayer = "X";
let twcounter=0;
let scores = {
    X: 0,
    O: 0
};

// empty cells
let board = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"];

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

let matchlist=[];
let counter=[];

// Change welcome screen to game screen with constants
const change = document.getElementById("change");
const gameArea = document.getElementById("game-area");
const welcomeArea = document.getElementById("welcome-area");
const endGameArea = document.getElementById("end-game-area");

change.addEventListener('click', () => {
    gameArea.classList.remove("hide");
    welcomeArea.classList.add("hide");
});

/**
 * Typewriter Effect
 */
function tw(){
	document.getElementById('welcome-text').innerHTML+=text.charAt(twcounter);
	twcounter++;
	setTimeout(tw, 50);
}

/**
 * Select the opponent
 */
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
    matchlist = [];
    counter = [];
}

function startGame() {
    if (playerX.value == "" || playerO.value == "") {
        popUp(`Type in players' names, please!`);
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
      });
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
        confirmButtonColor: '#FF9933',
        heightAuto: false,
        showClass: {
            popup: 'animate_animated animate_fadeInDown'
        },
        hideClass: {
            popup: 'animate_animated animate_fadeOutUp'
        }
    });
}

function checkCells() {
    // rows, diagonals, cols
    if(cellMatches()) {
        let popupText="";
        let popupImage = "";
        if(actualPlayer == "X" || (document.getElementById("human").checked && actualPlayer == "O")) {
            popupText="Congratulations! <br>" + document.getElementById("player-"+actualPlayer).value + "("+ actualPlayer + ") won this round!";
            popupImage = "https://64.media.tumblr.com/a1cf0a4ac8088bb7712e43155e88d3e7/tumblr_mv15b8E0Fz1r4zr8xo3_500.gif";
        } else {
            popupText="You lose! <br>" + document.getElementById("player-"+actualPlayer).value+ "("+ actualPlayer + ") won this round!";
            popupImage = "https://i.gifer.com/KnOU.gif";
        }
        popUp(popupText + `<br><img id="wargames" src="`+ popupImage + `" alt="Congratulations">`);
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
    let result = false;
    let i = 0;
    let smartPlayer = Math.floor(Math.random() * 1);    // 0 OR 1 (0=NO, 1=YES)

    if (smartPlayer == 1){
       
        // O O _
        for (i=0; i<matches.length; i++){
            if (document.getElementById(matches[i][0]).value=='O' && document.getElementById(matches[i][1]).value=='O' && document.getElementById(matches[i][2]).value=='') { result=matches[i][2]; }
            if (document.getElementById(matches[i][0]).value=='O' && document.getElementById(matches[i][2]).value=='O' && document.getElementById(matches[i][1]).value=='') { result=matches[i][1]; }
            if (document.getElementById(matches[i][1]).value=='O' && document.getElementById(matches[i][2]).value=='O' && document.getElementById(matches[i][0]).value=='') { result=matches[i][0]; }
        }
        // X X _
        if (!result){
            for (i=0; i<matches.length; i++){
                if (document.getElementById(matches[i][0]).value=='X' && document.getElementById(matches[i][1]).value=='X' && document.getElementById(matches[i][2]).value=='') { result=matches[i][2]; }
                if (document.getElementById(matches[i][0]).value=='X' && document.getElementById(matches[i][2]).value=='X' && document.getElementById(matches[i][1]).value=='') { result=matches[i][1]; }
                if (document.getElementById(matches[i][1]).value=='X' && document.getElementById(matches[i][2]).value=='X' && document.getElementById(matches[i][0]).value=='') { result=matches[i][0]; }
            }
        }
        // O _ _
        if (!result){
            for (i=0; i<matches.length; i++){
                if (document.getElementById(matches[i][0]).value=='O' && document.getElementById(matches[i][1]).value=='' && document.getElementById(matches[i][2]).value=='') { pushElement(matches[i][2]); }
                if (document.getElementById(matches[i][0]).value=='O' && document.getElementById(matches[i][2]).value=='' && document.getElementById(matches[i][1]).value=='') { pushElement(matches[i][1]); }
                if (document.getElementById(matches[i][1]).value=='O' && document.getElementById(matches[i][2]).value=='' && document.getElementById(matches[i][0]).value=='') { pushElement(matches[i][0]); }
            }
            if (counter.length>0){
                result=matchlist[counter.indexOf(Math.max(...counter))];
            }
        }

        // if cell in the middle is empty, put O there
        if (!result) {
            if (board.indexOf("b2") != -1) {result = "b2";}
        }

        // if cell in one of the corners is empty, put O there
        if (!result) {
            let corners=[];
            if (board.indexOf("a1") != -1) {corners.push("a1");}
            if (board.indexOf("a3") != -1) {corners.push("a3");}
            if (board.indexOf("c1") != -1) {corners.push("c1");}
            if (board.indexOf("c3") != -1) {corners.push("c3");}
            result = corners[Math.floor(Math.random() * corners.length)];
        }
    }
    // random step
    if (!result){
        result = board[Math.floor(Math.random() * board.length)];
    }
    gameInput(document.getElementById(result));
}

// pushing elements into array to find the most frequent occurance of the possible O matches
function pushElement(element){
    if (matchlist.indexOf(element)==-1){
        matchlist.push(element);
        counter.push(1);
    } else {
        counter[matchlist.indexOf(element)]++;
    }
}

//matchlist a2 c3 b2 c1  
//counter   2  1   2  1