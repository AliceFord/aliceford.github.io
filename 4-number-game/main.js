var currentPossibilities = {};
var currentCombinations = [];
var diff = "A";

var solutionBlurred = false;

function changeTarget() {
    let newTarget = document.getElementById("targetInput").value;
    currentPossibilities = {};
    currentCombinations = [];

    fetch(`${newTarget}.txt`).then((response) => {
        return response.text();
    }).then((fileContents) => {
        fileContents = fileContents.split("\n");
        for (let i = 0; i < fileContents.length; i++) {
            let current = fileContents[i].split(" ");
            if (current[0].length > 0) {
                if (diff == "A" || current[2][0] == diff[0]) {
                    console.log(current[1], current[2]);
                    currentPossibilities[current[0]] = [current[1], current[2]];
                    currentCombinations.push(current[0]);
                }
            }
        }

        newCombination();
    });
}

function newCombination() {
    if (currentCombinations.length == 0) return;
    let chosen = currentCombinations[Math.floor(Math.random() * currentCombinations.length) + 1];
    let chosenArr = chosen.split("");
    chosenArr.sort(() => Math.random() - 0.5);

    document.getElementById("solution").style.filter = "blur(8px)";
    solutionBlurred = true;

    document.getElementById("numbers").innerHTML = chosenArr.join(" ");
    document.getElementById("solution").innerHTML = getSolution(chosen, currentPossibilities[chosen][0]);
}

function changeDifficulty() {
    let newDifficulty = document.getElementById("difficultyInput").value;
    diff = newDifficulty;

    changeTarget();
}

function getSolution(number, solution) {
    let a = number[0];
    let b = number[1];
    let c = number[2];
    let d = number[3];
    solution = solution.replace("a", a).replace("b", b).replace("c", c).replace("d", d);

    return solution;
}

function toggleSolutionBlur() {
    if (solutionBlurred) {
        document.getElementById("solution").style.filter = "blur(0px)";
    } else {
        document.getElementById("solution").style.filter = "blur(8px)";
    }
    solutionBlurred = !solutionBlurred;
}

changeTarget();
