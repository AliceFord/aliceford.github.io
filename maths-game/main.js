var playerData = {};
const colours = ["Red", "Orange", "Yellow", "Green", "Cyan", "Blue", "Magenta", "Purple", "White", "Black", "Grey", "Silver", "Pink", "Maroon", "Brown", "Beige", "Tan", "Peach", "Lime", "Indigo"];
var colourCounter = 0;

function formatName(name) {
    return name[0].toUpperCase() + name.substr(1);
}

function sumArray(arr) {
    let total = 0;
    for (let n in arr) {
        total += arr[n];
    }

    return total;
}

function updateData() {
    let table = $('#players');
    let tbody = $('#playersBody');
    tbody.empty();

    let scores = [];
    try {
        for (let player in playerData) {
            scores.push([sumArray(playerData[player]), player]);
        }
    } catch (e) {
        console.log(e);
    }

    scores.sort((a, b) => a[0] - b[0]);
    scores.reverse();

    let readScores = {};

    for (let score in scores) {
        let current = scores[score];
        readScores[current[1]] = parseInt(score) + 1;
    }

    console.log(readScores);

    for (let player in playerData) {
        let tr = $('<tr>');
        tr.append($('<td>').text(formatName(player)));
        let count = 0;
        for (let n in playerData[player]) {
            tr.append($('<td>').text(playerData[player][n]));
            count++;
        }

        for (let i = count; i < colourCounter + 1; i++) {
            tr.append($('<td>'));
        }

        tr.append($('<td>').text(readScores[player]));
        tbody.append(tr);
    }
}

function addName() {
    let name = $('#playername').val().toLowerCase();
    console.log(`Name: ${name}`);
    $('#playername').val('');

    playerData[name] = [];

    updateData();
}

function increaseScore() {
    let name = $('#name').val().toLowerCase();
    let score = $('#addscore').val();

    $('#name').val('');
    $('#addscore').val('');

    try {
        playerData[name].push(parseInt(score));
    } catch (e) {
        alert("Player does not exist!");
        return false;
    }

    updateData();
}

function setupColoursTable() {
    let table = $('#colours');
    let tbody = $('#coloursBody');

    for (let colour in colours) {
        let tr = $(`<tr id="colour${colours[colour]}">`);
        tr.append($('<td>').text(colours[colour]));
        tbody.append(tr);
    }
}

function nextColour() {
    let pos = prompt(`Position of colour '${colours[colourCounter]}':`);
    console.log(pos);

    let tr = $(`#colour${colours[colourCounter]}`);
    tr.append($('<td>').text(pos));

    for (let player in playerData) {
        if (playerData[player].length < colourCounter + 1) {
            playerData[player].push(0);
        }
    }

    colourCounter++;
    $('#colourNameText').text(colours[colourCounter]);

    $('#endMarker').before(`<th>${colours[colourCounter]}</th>`);

    updateData();
}

setupColoursTable();

$('#name').autoComplete({
    resolverSettings: {
        url: 'testdata/test-list.json'
    }
});