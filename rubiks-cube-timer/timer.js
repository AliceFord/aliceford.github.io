var startTime = Date.now();
var running = false;

const sheet = new CSSStyleSheet();
document.adoptedStyleSheets = [sheet];

function setDarkMode() {
    sheet.replaceSync(`body {
        --text-color: #f0f0f0;
        --bg-color: #171717;
        --bg-box-color: #272727;
        --border-color: rgba(255,255,255,.125);
        --modal-bg-color: #171717;
    }`);
}

function unsetDarkMode() {
    sheet.replaceSync(`body {
        --text-color: #212529;
        --bg-color: #f5f5f5;
        --bg-box-color: #f0f0f0;
        --border-color: rgba(0,0,0,.125);
        --modal-bg-color: #fff;
    }`);
}

function updateSettings() {
    if (document.getElementById("dark-mode-check").checked) {
        setDarkMode();
    } else {
        unsetDarkMode();
    }
}

function timerFinished(finalTime) {
    let table = document.getElementById("times-table");
    let row = table.insertRow(-1);
    let timeCell = row.insertCell(0);
    timeCell.innerHTML = formatTime(finalTime);

    document.getElementById("scrambleText").innerHTML = generate333();
}

function formatTime(time) {
    if (Math.floor((time / 1000) / 60) > 0) {
        return Math.floor((time / 1000) / 60) + ":" + ((time / 1000) % 60).toFixed(2);
    } else {
        return ((time / 1000) % 60).toFixed(2);
    }
}

var timerFunction = function() {
    var elapsedTime = Date.now() - startTime;
    document.getElementById("timer").innerHTML = formatTime(elapsedTime);
};

var intervalID = 0;
var spaceStartTime = Date.now();
var currentlyDown = false;
var endingSpace = false;

document.getElementById("scrambleText").innerHTML = generate333(); // Setup

$(document).on("keydown", function(e) {
    if (e.which == 32) {
        if (!running) {
            if (!currentlyDown) {
                spaceStartTime = Date.now();
                currentlyDown = true;
            }
        } else { // Stop as soon as possible, on keydown
            let finalTime = Date.now() - startTime;
            clearInterval(intervalID);
            document.getElementById("timer").innerHTML = formatTime(finalTime); // In case .01 difference occurs due to timer stop time

            timerFinished(finalTime);
            running = false;
            endingSpace = true;
        }
    }
});

$(document).on("keyup", function(e) {
    if (e.which == 32) {
        currentlyDown = false;
        if (endingSpace) {
            endingSpace = false;
            return;
        }
        if (!running) {
            if (Date.now() - spaceStartTime > 500) {
                ready = false;
                startTime = Date.now();
                intervalID = setInterval(timerFunction, 16);
                running = true;
            } else {
                spaceStartTime = Infinity;
                console.log("Released too early.");
            }
        }
    }
});
