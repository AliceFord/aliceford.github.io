document.addEventListener("DOMContentLoaded", () => {

    var lines = []
    var trainTimers = []
    var trainIterators = [];
    var currentSelectedStation = null
    var flag = false;
    var paper = Raphael(0, 0, window.innerWidth, window.innerHeight);
    var gameSpeed = 0.25;
    var totalAvailablePoints = 0;
    var startTime;
    const spawnTimer = 40; // In 1/100s
    const buttonSizeModifier = 1;

    function* driveTrain(train) {
        if (parseInt(lines[train][1].textContent) > 0) {
            console.log(`Train ${train} now starting.`)
            let line = lines[train][0];
            lines[train][1].textContent = parseInt(lines[train][1].textContent) - 1;
            if (stripPx(lines[train][1].style.height) != window.innerHeight) {
                lines[train][1].style.height = 30 + parseInt(lines[train][1].textContent) * buttonSizeModifier + "px";
                lines[train][1].style.width = 30 + parseInt(lines[train][1].textContent) * buttonSizeModifier + "px";
            }

            var circle = paper.circle(line[0][1], line[0][0], 10);
            var text = paper.text(line[0][1], line[0][0], "1")
            var pointTransmitter = paper.set();
            
            circle.attr('fill', '#f00');
            circle.attr('stroke', '#fff');
            pointTransmitter.push(text, circle)
            for (let i=0;i<line.length;i+=gameSpeed) {
                pointTransmitter.animate({x:line[Math.floor(i)][1]+11, y:line[Math.floor(i)][0]+11, cx:line[Math.floor(i)][1]+11, cy:line[Math.floor(i)][0]+11}, 0);
                yield -2;
            }
            pointTransmitter.remove();
            lines[train][2].textContent = parseInt(lines[train][2].textContent) + 1;
            if (stripPx(lines[train][2].style.height) != window.innerHeight) {
                lines[train][2].style.height = 30 + parseInt(lines[train][2].textContent) * buttonSizeModifier + "px";
                lines[train][2].style.width = 30 + parseInt(lines[train][2].textContent) * buttonSizeModifier + "px";
            } else {
                if (parseInt(lines[train][2].textContent) === totalAvailablePoints) {
                    var timeNow = performance.now();
                    alert("Level completed! Hours: " + Math.floor((timeNow - startTime)/3600000) + ", Minutes: " + Math.floor((timeNow - startTime)/60000) + ", Seconds: " + Math.floor((timeNow - startTime)/1000) + ", Milliseconds: " + Math.floor(timeNow - startTime));
                }
            }
            return train;
        }
        return train;
    }

    function draw() {
        for (let i=0;i<trainTimers.length;i++) {
            if (trainTimers[i] === 0) {
                trainIterators.push([driveTrain(i), i]);
                trainTimers[i]--;
            } else if  (trainTimers[i] > 0) {
                trainTimers[i]--;
            }
        }
        for (let i=0;i<trainIterators.length;i++) {
            if (trainIterators[i] !== -1) {
                let currentVal = trainIterators[i][0].next().value;
                if (currentVal !== -2) {
                    trainTimers[currentVal] = spawnTimer;
                }
            }
        }
    }

    function gameLoop() {
        draw();
        requestAnimationFrame(gameLoop);
    }

    function drawBetweenButtons(b1, b2) {
        if (parseInt(document.getElementById('lineCount').innerHTML.substr(17)) > 0) {
            document.getElementById('lineCount').innerHTML = "Available Lines: " + (parseInt(document.getElementById('lineCount').innerHTML.substr(17))-1).toString();
            b1x = parseInt(b1.style.top, 10)+5;
            b1y = parseInt(b1.style.left, 10)+5;
            b2x = parseInt(b2.style.top, 10)+5;
            b2y = parseInt(b2.style.left, 10)+5;
            let path = [[b1x, b1y]];
            while (path[path.length-1][0]!==b2x || path[path.length-1][1]!==b2y) {
                currentPosX = path[path.length-1][0];
                currentPosY = path[path.length-1][1];
                if (currentPosX<b2x) {
                    path.push([currentPosX+1, currentPosY]);
                } else if (currentPosX>b2x) {
                    path.push([currentPosX-1, currentPosY]);
                } else if (currentPosY<b2y) {
                    path.push([currentPosX, currentPosY+1]);
                } else if (currentPosY>b2y) {
                    path.push([currentPosX, currentPosY-1]);
                }
            }
            lines.push([path, b1, b2]);
            trainTimers.push(1);
            var linePath = ["M", b1y, b1x];
            for (let i=1;i<path.length;i++) {
                linePath.push("L", path[i-1][1]+11, path[i-1][0]+11);
            }
            const thisTimerIndex = trainTimers.length-1;
            paper.path(linePath)
                .attr({"stroke": "#f00", "stroke-width": "5px"})
                .click((
                    function() {
                        removeLine(this, thisTimerIndex );
                    }
                ));
            flag = true;
        }
    }

    function trainIteratorFinder(index) {
        for (let i=0;i<trainIterators.length;i++) {
            if (trainIterators[i][1] === index) {
                return i;
            }
        }
    }

    function removeLine(line, index) {
        document.getElementById('lineCount').innerHTML = "Available Lines: " + (parseInt(document.getElementById('lineCount').innerHTML.substr(17))+1).toString();
        trainTimers[index] = -1;
        
        while (trainIterators[trainIteratorFinder(index)][0].next().value === -2) {
            console.log("DELTE IN PROGRESS.");
        }
        trainIterators[trainIteratorFinder(index)] = -1;
        line.remove();
    }

    function drawBetweenStartAndButton(start, button) {
        if (parseInt(document.getElementById('lineCount').innerHTML.substr(17)) > 0) {
            document.getElementById('lineCount').innerHTML = "Available Lines: " + (parseInt(document.getElementById('lineCount').innerHTML.substr(17))-1).toString();
            b1y = parseInt(start.style.left, 10)+5;
            b2x = parseInt(button.style.top, 10)+5;
            b2y = parseInt(button.style.left, 10)+5;
            let path = [[b2x, b1y]];
            while (path[path.length-1][1]!==b2y) {
                currentPosY = path[path.length-1][1];
                if (currentPosY<b2y) {
                    path.push([b2x, currentPosY+1]);
                } else if (currentPosY>b2y) {
                    path.push([b2x, currentPosY-1]);
                }
            }
            lines.push([path, start, button]);
            trainTimers.push(1);
            var linePath = ["M", b1y, b2x];
            for (let i=1;i<path.length;i++) {
                linePath.push("L", path[i-1][1]+11, path[i-1][0]+11);
            }
            const thisTimerIndex = trainTimers.length-1;
            paper.path(linePath)
                .attr({"stroke": "#f00", "stroke-width": "5px"})
                .click((
                    function() {
                        removeLine(this, thisTimerIndex);
                    }
                ));
            flag = true;
        }
    }

    function drawBetweenButtonAndEnd(button, end) {
        if (parseInt(document.getElementById('lineCount').innerHTML.substr(17)) > 0) {
            document.getElementById('lineCount').innerHTML = "Available Lines: " + (parseInt(document.getElementById('lineCount').innerHTML.substr(17))-1).toString();
            b1y = parseInt(button.style.left, 10)+5;
            b2x = parseInt(button.style.top, 10)+5;
            b2y = parseInt(end.style.left, 10)+5;
            let path = [[b2x, b1y]];
            while (path[path.length-1][1]!==b2y) {
                currentPosY = path[path.length-1][1];
                if (currentPosY<b2y) {
                    path.push([b2x, currentPosY+1]);
                } else if (currentPosY>b2y) {
                    path.push([b2x, currentPosY-1]);
                }
            }
            lines.push([path, button, end]);
            trainTimers.push(1);
            var linePath = ["M", b1y, b2x];
            for (let i=1;i<path.length;i++) {
                linePath.push("L", path[i-1][1]+11, path[i-1][0]+11);
            }
            const thisTimerIndex = trainTimers.length-1;
            paper.path(linePath)
                .attr({"stroke": "#f00", "stroke-width": "5px"})
                .click((
                    function() {
                        removeLine(this, thisTimerIndex);
                    }
                ));
            flag = true;
        }
    }

    function stationButtonClicked() {
        if (currentSelectedStation === null) {
            this.disabled = true;
            currentSelectedStation = this;
        } else {
            currentSelectedStation.disabled = false;
            if (stripPx(currentSelectedStation.style.height) == window.innerHeight) {  // Check if click is between start and button or two buttons
                drawBetweenStartAndButton(currentSelectedStation, this);
            } else if (stripPx(this.style.height) == window.innerHeight) {
                drawBetweenButtonAndEnd(currentSelectedStation, this);
            } else {
                drawBetweenButtons(currentSelectedStation, this);
            }
            currentSelectedStation = null;
        }
    }

    function findGetParameter(parameterName) {
        var result = null, tmp = [];
        location.search
            .substr(1)
            .split("&")
            .forEach(function (item) {
                tmp = item.split("=");
                if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
            });
        
        return result;
    }

    function stripPx(value) {
        return value.substr(0, value.length-2);
    }

    function updateTimer() {
        let timer = document.getElementById('timer')
        let minutes = parseInt(timer.innerHTML.substr(0, 2));
        let seconds = parseInt(timer.innerHTML.substr(3, 5));
        if (seconds < 60) {
            timer.innerHTML = minutes.toString().padStart(2, '0') + ":" + (seconds+1).toString().padStart(2, '0');
        } else {
            timer.innerHTML = (minutes+1).toString().padStart(2, '0') + ":00";
        }
    }

    function setupTimer() {
        startTime = performance.now();
        var text = document.createElement('p');
        text.id = "timer";
        text.innerHTML = "00:00";
        text.style.top = "0px";
        text.style.left = window.innerWidth / 2 - 40 + "px";
        text.style.position = "absolute";
        document.body.appendChild(text);
        setInterval(function() {
            updateTimer();
        }, 1000);
    }

    function setupLineCounter() {
        var lineText = document.createElement('p');
        lineText.id = "lineCount";
        lineText.innerHTML = "Available Lines: 10";
        lineText.style.top = "0px";
        lineText.style.left = window.innerWidth*3 / 4 - 40 + "px";
        lineText.style.position = "absolute";
        document.body.appendChild(lineText);
    }

    function setupDividers() {
        paper.path(["M", 1/10 * window.innerWidth, 0, "L", 1/10 * window.innerWidth, window.innerHeight]).attr({"stroke-width": 5, "stroke": "grey"})
        paper.path(["M", 9/10 * window.innerWidth, 0, "L", 9/10 * window.innerWidth, window.innerHeight]).attr({"stroke-width": 5, "stroke": "grey"})
    }

    function setup() {
        setupDividers();
        setupTimer();
        setupLineCounter();
        foundGameSpeed = parseFloat(findGetParameter("gameSpeed"));
        if (foundGameSpeed < 0.5 || Number.isInteger(foundGameSpeed)) {
            gameSpeed = parseFloat(foundGameSpeed);
        } else {
            console.log(`Invalid game speed '${foundGameSpeed}'.`);  
        }

        // Starting divider
        let button = document.createElement("button");
        button.textContent = "10";
        totalAvailablePoints += 10;
        button.className = "startEndBarrier";
        button.style.color = "white";
        button.style.background = "red";
        button.style.height = window.innerHeight + "px";
        button.style.width = 20 + "px";
        button.style.top = 0 + "px";
        button.style.left = 0 + "px";
        button.addEventListener('click', function(event) { stationButtonClicked.call(this); })
        document.body.appendChild(button);

        // Ending divider
        button = document.createElement("button");
        button.textContent = "0";
        button.className = "startEndBarrier";
        button.style.color = "white";
        button.style.background = "red";
        button.style.height = window.innerHeight + "px";
        button.style.width = 20 + "px";
        button.style.top = 0 + "px";
        button.style.left = window.innerWidth-20 + "px";
        button.addEventListener('click', function(event) { stationButtonClicked.call(this); })
        document.body.appendChild(button);

        for (let i=1;i<=10;i++) {  // Intermediary Buttons
            button = document.createElement("button");
            button.textContent = "5";
            totalAvailablePoints += 5;
            button.className = "circleButton";
            button.style.color = "white";
            button.style.background = "red";
            button.style.top = Math.floor(Math.random() * (window.innerHeight - 25))  + "px";
            button.style.left = Math.floor(Math.random() * (window.innerWidth * 8/10)) + window.innerHeight * 1/10 + "px";
            button.addEventListener('click', function(event) { stationButtonClicked.call(this); })
            document.body.appendChild(button);
        }
        
        gameLoop();
    }
    
    setup();
})
