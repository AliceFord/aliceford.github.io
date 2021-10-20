var startTime = Date.now();
var running = false;

const sheet = new CSSStyleSheet();
document.adoptedStyleSheets = [sheet];

const scrambleLookupTable = {
    "333": {
        "random": generate333
    },
    "222": {
        "random": generate222
    }
}

function setDarkMode() {
    localStorage.setItem("colorPref", "dark");
    sheet.replaceSync(`body {
        --text-color: #f0f0f0;
        --bg-color: #171717;
        --bg-box-color: #272727;
        --border-color: rgba(255,255,255,.125);
        --modal-bg-color: #171717;
    }`);
}

function unsetDarkMode() {
    localStorage.setItem("colorPref", "light");
    sheet.replaceSync(`body {
        --text-color: #212529;
        --bg-color: #f5f5f5;
        --bg-box-color: #f0f0f0;
        --border-color: rgba(0,0,0,.125);
        --modal-bg-color: #fff;
    }`);
}

function generateCorrectScramble() {
    document.getElementById("scrambleText").innerHTML = scrambleLookupTable[document.getElementById("scrambler-main").value][document.getElementById("scrambler-sub").value]();
}

function updateSettings() {
    if (document.getElementById("dark-mode-check").checked) {
        setDarkMode();
    } else {
        unsetDarkMode();
    }
}

function addTime(time) {
    let table = document.getElementById("times-table");
    let row = table.insertRow(-1);
    let timeCell = row.insertCell(0);
    timeCell.innerHTML = formatTime(time);
}

function removeAllTimes() {
    clear();
    $('#times-table').find('tr:not(:first)').remove();
}

async function timerFinished(finalTime) {
    addTime(finalTime);

    let storedData = await get("times");
    if (storedData !== undefined) {
        storedData["times"].push({
            "scr": document.getElementById("scrambleText").innerHTML,
            "time": finalTime
        });
        set("times", storedData);
    } else {
        set("times", {"times": [{
            "scr": document.getElementById("scrambleText").innerHTML,
            "time": finalTime
        }]});
    }

    generateCorrectScramble();
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

var store;
var dbPromise;

async function setup() {
    document.getElementById("scrambleText").innerHTML = generate333();

    if (localStorage.getItem("colorPref") == "dark") {
        setDarkMode();
        document.getElementById("dark-mode-check").checked = true;
    }

    dbPromise = await idb.openDB("keyval", 1, {
        upgrade(db) {
            db.createObjectStore('keyval');
        },
    });

    let storedTimes = await get("times");
    if (storedTimes !== undefined) {
        storedTimes["times"].forEach((item, index) => {
            addTime(item["time"]);
        });
    }
}

async function get(key) {
    return (await dbPromise).get('keyval', key);
}
async function set(key, val) {
    return (await dbPromise).put('keyval', val, key);
}
async function del(key) {
    return (await dbPromise).delete('keyval', key);
}
async function clear() {
    return (await dbPromise).clear('keyval');
}
async function keys() {
    return (await dbPromise).getAllKeys('keyval');
}

var intervalID = 0;
var spaceStartTime = Date.now();
var currentlyDown = false;
var endingSpace = false;

setup();

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
