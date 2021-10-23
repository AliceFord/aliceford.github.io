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

function updateDrawnScramble() {
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

var greenTimerFunction = function() {
    hideWhileRunning();
    
    document.getElementById("timer").style.color = "var(--green)";
}

var store;
var dbPromise;
var isMobile = false;

async function setup() {
    let a = navigator.userAgent||navigator.vendor||window.opera;
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) isMobile = true;

    console.log(isMobile);

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

var greenColourID = 0;
var intervalID = 0;
var spaceStartTime = Date.now();
var currentlyDown = false;
var endingSpace = false;

setup();

function hideWhileRunning() {
    $('.hide-on-solve').attr('style', 'display:none !important;');
}

function showAfterRunning() {
    $('.hide-on-solve').attr('style', '');
}

function keydownFunction() {
    if (!running) {
        if (!currentlyDown) {
            spaceStartTime = Date.now();
            currentlyDown = true;
            greenColourID = setTimeout(greenTimerFunction, 500);
            document.getElementById("timer").style.color = "var(--red)";
        }
    } else { // Stop as soon as possible, on keydown
        let finalTime = Date.now() - startTime;
        clearInterval(intervalID);
        document.getElementById("timer").innerHTML = formatTime(finalTime); // In case .01 difference occurs due to timer stop time

        timerFinished(finalTime);
        running = false;
        showAfterRunning();
        endingSpace = true;
    }
}

function keyupFunction() {
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

            document.getElementById("timer").style.color = "";
        } else {
            spaceStartTime = Infinity;
            console.log("Released too early.");
            clearTimeout(greenColourID);
            document.getElementById("timer").style.color = "";
        }
    }
}

if (isMobile) {
    $(document.body).on("touchstart", function(e) {
        keydownFunction();
    });

    $(document).on("touchend", function(e) {
        keyupFunction();
    });
} else {
    $(document).on("keydown", function(e) {
        if (e.which == 32) {
            keydownFunction();
        }
    });

    $(document).on("keyup", function(e) {
        if (e.which == 32) {
            keyupFunction();
        }
    });    
}



