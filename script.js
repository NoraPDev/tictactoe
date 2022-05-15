var a1 = document.getElementById("a1");
var a2 = document.getElementById("a2");
var a3 = document.getElementById("a3");
var b1 = document.getElementById("b1");
var b2 = document.getElementById("b2");
var b3 = document.getElementById("b3");
var c1 = document.getElementById("c1");
var c2 = document.getElementById("c2");
var c3 = document.getElementById("c3");


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
    // rows, cols
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
    alert("You Won!")
    }

}

function gameInput() {
    document.getElementById("a1").value = "X";

}


