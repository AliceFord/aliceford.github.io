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

function updateDarkMode() {
    if (document.getElementById("dark-mode-check").checked) {
        setDarkMode();
    } else {
        unsetDarkMode();
    }
}

function updateToolBox() {
    if (document.getElementById("tool-box-check").checked) {

    }
}

function aoLastN(times, n) {
    let lastTimes = [];
    times.reverse().some((item, index) => {
        lastTimes.push(item);
        if (index + 1 >= n) {
            return true;
        }
    });

    lastTimes.sort((a, b) => a - b); // ascending

    for (let i = 0; i < Math.ceil(0.05 * lastTimes.length); i++) {
        lastTimes.pop();
    }

    lastTimes.sort((a, b) => b - a); // descending

    for (let i = 0; i < Math.ceil(0.05 * lastTimes.length); i++) {
        lastTimes.pop();
    }

    return (lastTimes.reduce((a, b) => a + b, 0) / lastTimes.length) || 0;
}

function addTime(time, prevTimes) { // prevTimes should include current time, should be sorted with most recent at start
    let table = document.getElementById("times-table");
    let row = table.insertRow(-1);

    let noCell = document.createElement("th");
    noCell.innerHTML = $('#times-table tr').length - 1;
    row.appendChild(noCell);

    let timeCell = row.insertCell(1);
    timeCell.innerHTML = formatTime(time);

    let currentPrevTimes = JSON.parse(JSON.stringify(prevTimes));

    let ao5Cell = row.insertCell(2);
    if (currentPrevTimes.length >= 5) {
        ao5Cell.innerHTML = formatTime(aoLastN(currentPrevTimes, 5));
    } else {
        ao5Cell.innerHTML = "-";
    }

    currentPrevTimes = JSON.parse(JSON.stringify(prevTimes));

    let ao12Cell = row.insertCell(3);
    if (currentPrevTimes.length >= 12) {
        ao12Cell.innerHTML = formatTime(aoLastN(currentPrevTimes, 12));
    } else {
        ao12Cell.innerHTML = "-";
    }
}

function removeAllTimes() {
    clear();
    $('#times-table').find('tr:not(:first)').remove();
}

async function timerFinished(finalTime) {
    let storedData = await get("times");
    if (storedData !== undefined) {
        storedData["times"].push({
            "scr": document.getElementById("scrambleText").innerHTML,
            "time": finalTime,
            "date": Math.floor(new Date().getTime() / 1000)
        });
        await set("times", storedData);
    } else {
        await set("times", {"times": [{
            "scr": document.getElementById("scrambleText").innerHTML,
            "time": finalTime,
            "date": Math.floor(new Date().getTime() / 1000)
        }]});
    }

    storedData = [];
    storedData = (await get("times"))["times"];
    storedData.sort((a, b) => a["date"] - b["date"]);
    let prevTimes = [];

    storedData.forEach((item, index) => {
        prevTimes.push(item["time"]);
    });

    addTime(finalTime, prevTimes);

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
    let prevTimes = [];
    if (storedTimes !== undefined) {
        let currentTimes = storedTimes["times"];
        currentTimes.sort((a, b) => a["date"] - b["date"]);
        currentTimes.forEach((item, index) => {
            prevTimes.push(item["time"]);
            addTime(item["time"], prevTimes);
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
