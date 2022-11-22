currentPossibilities = {};
currentCombinations = [];

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
                currentPossibilities[current[0]] = current[1];
                currentCombinations.push(current[0]);
            }
        }

        newCombination();
    });
}

function newCombination() {
    if (currentCombinations.length == 0) return;
    let chosen = currentCombinations[Math.floor(Math.random() * currentCombinations.length) + 1];
    chosen = chosen.split("");
    chosen.sort(() => Math.random() - 0.5);

    document.getElementById("numbers").innerHTML = chosen.join(" ");
}

changeTarget();
