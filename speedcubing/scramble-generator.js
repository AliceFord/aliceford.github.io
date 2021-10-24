const valid333Moves = ["U", "D", "L", "R", "F", "B"];
const valid333LSEMoves = ["U", "M"];
const valid333L4EMoves = ["U2", "M", "M'", "M2"]
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

function getRandomFromArr(prev, arr) { // returns move
    let move = shuffle(arr)[0];
    while (movesCancel(move[0], prev[0])) {
        move = shuffle(arr)[0];
    }
    return move
}

function generate333L10P() {
    function getRandomCornerShuffle() {
        const cornerShuffles = ["R U2 R' U' R U' R'", "R' U2 R U R' U R", "L' U2 L U L' U L", "L U2 L' U' L U' L'",
                                "R U R' U R U2 R'", "R' U' R U' R' U2 R", "L U L' U L U2 L'", "L' U' L U' L' U2 L"
            ];
        return cornerShuffles[Math.floor(Math.random() * cornerShuffles.length)] + " ";
    }

    var scramble = "";
    let prevMove = "";
    let newMove;
    let pos1 = Math.floor(Math.random() * 6);
    let pos2 = Math.floor(Math.random() * 6);
    while (pos2 == pos1) pos2 = Math.floor(Math.random() * 6);

    for (let i = 0; i < 6; i++) {
        if (i == pos1 || i == pos2) {
            scramble += getRandomCornerShuffle();
            prevMove = "";
        }
        [newMove, prevMove] = getRandomWith2AndPrime(prevMove, valid333LSEMoves);
        scramble += newMove;
    }

    return scramble;
}

function generate333L4E() {
    var scramble = "";
    let prevMove = "";
    let newMove;
    for (let i = 0; i < 7; i++) {
        newMove = getRandomFromArr(prevMove, valid333L4EMoves);
        prevMove = newMove;
        scramble += newMove + " ";
    }

    if ((scramble.match(/U2/g) || []).length % 2 == 1) {
        scramble += "U2 ";
    }

    if (((scramble.match(/M2/g) || []).length * 2 + (scramble.match(/M /g) || []).length - (scramble.match(/M'/g) || []).length) % 2 == 1) {
        scramble += "M ";
    }

    return scramble;
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