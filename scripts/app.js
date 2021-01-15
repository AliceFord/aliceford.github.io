document.addEventListener("DOMContentLoaded", () => {

    var lines = []
    var trainTimers = []
    var currentSelectedStation = null
    var flag = false;
    var paper = Raphael(0, 0, window.innerWidth, window.innerHeight);
    var spawnTimer = 240; // In frames (Basically in 1/60ths of a second)
    var gameSpeed = 0.25; // Factor of 1

    var fabricCanvas = new fabric.Canvas('mainCanvas');

    function* driveTrain(train) {
        if (parseInt(lines[train][1].textContent) > 0) {
            console.log(`Train ${train} now starting.`)
            let line = lines[train][0];
            var circle = paper.circle(line[0][1], line[0][0], 10);
            //var rect = paper.rect(line[0][1], line[0][0], 30, 30).attr({'fill': 'red', 'stroke-width': 0});

            circle.attr('fill', '#f00');
            circle.attr('stroke', '#fff');
            // var train = new fabric.Circle({
            //     radius: 15,
            //     fill: 'red',
            //     stroke: 'red',
            //     strokeWidth: 3,
            //     left: line[0][1]-11,
            //     top: line[0][0]-11
            // });
            // fabricCanvas.add(train)
            for (let i=0;i<line.length;i+=gameSpeed) {
                // train.left = line[i][1];
                // train.top = line[i][0];
                // fabricCanvas.renderAll();
                //rect.animate({x:line[i][1], y:line[i][0], 'transform': 'r' + i}, 0);
                circle.animate({cx:line[Math.floor(i)][1]+11, cy:line[Math.floor(i)][0]+11}, 0);
                yield;
            }
            //rect.remove();
            circle.remove();
            //fabricCanvas.remove(train);
            lines[train][1].textContent = parseInt(lines[train][1].textContent) - 1;
            lines[train][2].textContent = parseInt(lines[train][2].textContent) + 1;
            return train;
        }
        return train;
    }

    var trainIterators = [];

    function draw() {
        for (let i=0;i<trainTimers.length;i++) {
            if (trainTimers[i] === 0) {
                trainIterators.push(driveTrain(i));
                trainTimers[i]--;
            } else if  (trainTimers[i] > 0) {
                trainTimers[i]--;
            }
        }
        for (let i=0;i<trainIterators.length;i++) {
            let currentVal = trainIterators[i].next().value;
            if (currentVal !== undefined) {
                trainTimers[currentVal] = spawnTimer;
                console.log(`Train ${currentVal} arrived.`)
            }
        }
    }

    function gameLoop() {
        draw();
        requestAnimationFrame(gameLoop);
    }

    function drawBetweenButtons(b1, b2) {
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
        
        for (let i=0;i<path.length;i++) {
            fabricCanvas.add(new fabric.Line([i===0?b1y:path[i-1][1], i===0?b1x:path[i-1][0], path[i][1], path[i][0]], {
                fill: 'red',
                stroke: 'red',
                strokeWidth: 5,
                selectable: false
            }));
        }
        flag = true;
    }

    function stationButtonClicked() {
        if (currentSelectedStation === null) {
            this.disabled = true;
            currentSelectedStation = this;
        } else {
            currentSelectedStation.disabled = false;
            drawBetweenButtons(currentSelectedStation, this);
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

    function setup() {
        foundGameSpeed = parseFloat(findGetParameter("gameSpeed"));
        if (foundGameSpeed < 0.5 || (foundGameSpeed === 1)) {
            gameSpeed = parseFloat(foundGameSpeed);
        } else {
            console.log(`Invalid game speed '${foundGameSpeed}'.`);  
        }

        fabricCanvas.setHeight(window.innerHeight);
        fabricCanvas.setWidth(window.innerWidth);
        for (var i=1;i<=10;i++) {
            var button = document.createElement("button");
            button.textContent = "10";
            button.className = "circleButton";
            button.style.color = "white";
            button.style.background = "red";
            button.style.top = Math.floor(Math.random()*window.innerHeight) + "px";
            button.style.left = Math.floor(Math.random()*window.innerWidth) + "px";
            button.addEventListener('click', function(event) { stationButtonClicked.call(this); })
            document.body.appendChild(button);
            gameLoop();
        }
    }

    setup();

    // TODO: Transport from side to side, not too many in one node, limited number of lines.
})
