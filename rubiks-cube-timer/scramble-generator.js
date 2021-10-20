const valid333Moves = ["U", "D", "L", "R", "F", "B"];

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


function generate333() {
    var scramble = "";
    let prevMove = "";
    for (let i = 0; i < 22; i++) {
        let move = shuffle(valid333Moves)[0];
        while (movesCancel(move, prevMove)) {
            move = shuffle(valid333Moves)[0];
        }
        prevMove = move;

        let modifier = Math.floor(Math.random() * 3);
        // 0 = no modifier
        // 1 = prime
        // 2 = double
        if (modifier == 1) {
            move += "'";
        } else if (modifier == 2) {
            move += "2";
        }
        scramble += move + " ";
    }

    return scramble;
}