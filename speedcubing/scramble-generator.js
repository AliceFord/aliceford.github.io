const valid333Moves = ["U", "D", "L", "R", "F", "B"];
const valid333LSEMoves = ["U", "M"];
const valid222Moves = ["U", "F", "R"];

function shuffle(array) { // Fisher-Yates
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
}

function movesCancel(moveA, moveB) {
    if (moveA == moveB) {
        return true;
    }
    return false;
}

function getRandomWith2AndPrime(prev, arr) { // returns [move,newPrev]
    let move = shuffle(arr)[0];
    while (movesCancel(move, prev)) {
        move = shuffle(arr)[0];
    }
    let originalMove = move;

    let modifier = Math.floor(Math.random() * 3);
    // 0 = no modifier
    // 1 = prime
    // 2 = double
    if (modifier == 1) {
        move += "'";
    } else if (modifier == 2) {
        move += "2";
    }
    move += " ";
    return [move,originalMove]
}


function generate333LSE() {
    var scramble = "";
    let prevMove = "";
    let newMove;
    for (let i = 0; i < 10; i++) {
        [newMove, prevMove] = getRandomWith2AndPrime(prevMove, valid333LSEMoves);
        scramble += newMove;
    }

    return scramble;
}

function generate333() {
    var scramble = "";
    let prevMove = "";
    let newMove;
    for (let i = 0; i < 22; i++) {
        [newMove, prevMove] = getRandomWith2AndPrime(prevMove, valid333Moves);
        scramble += newMove;
    }

    return scramble;
}

function generate222() {
    var scramble = "";
    let prevMove = "";
    let newMove;
    for (let i = 0; i < 8; i++) {
        [newMove, prevMove] = getRandomWith2AndPrime(prevMove, valid222Moves);
        scramble += newMove;
    }

    return scramble;
}