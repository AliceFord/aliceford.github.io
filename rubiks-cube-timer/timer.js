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
        --modal-bg-color: #fff;
    }`);
}

function unsetDarkMode() {
    sheet.replaceSync("body {--text-color: #212529;}");
}

function updateSettings() {
    if (document.getElementById("dark-mode-check").checked) {
        setDarkMode();
    } else {
        unsetDarkMode();
    }
}

function formatTime(time) {
    return Math.floor((time / 1000) / 60) + ":" + ((time / 1000) % 60).toFixed(2).padStart(5, '0');
}

var timerFunction = function() {
    var elapsedTime = Date.now() - startTime;
    document.getElementById("timer").innerHTML = formatTime(elapsedTime);
};

var intervalID = 0;

$(document).on("keypress", function(e) {
    if (e.which == 32) {
        if (!running) {
            startTime = Date.now();
            intervalID = setInterval(timerFunction, 16);
            running = true;
        } else {
            clearInterval(intervalID);
            running = false;
        }
    }
});
