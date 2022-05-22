//grid width and height
var bw = 1000;
var bh = 800;
//padding around grid
var p = 10;
//size of canvas
var cw = bw + (p*2) + 1;
var ch = bh + (p*2) + 1;

const GRID_RES = 40;

var horizontalGridLines = bw / GRID_RES;
var verticalGridLines = bh / GRID_RES;

var canvas = $('<canvas/>').attr({width: cw, height: ch}).appendTo('body');

var context = canvas.get(0).getContext("2d");

function drawTargetPixel(x, y) {
    var index = (x + p + y * p * cw) * 4;
    
    canvasData.data[index + 0] = 255;
    canvasData.data[index + 1] = 255;
    canvasData.data[index + 2] = 0;
    canvasData.data[index + 3] = 255;
}

function drawBoard(){
    for (var x = 0; x <= bw; x += GRID_RES) {
        context.moveTo(0.5 + x + p, p);
        context.lineTo(0.5 + x + p, bh + p);
    }


    for (var x = 0; x <= bh; x += GRID_RES) {
        context.moveTo(p, 0.5 + x + p);
        context.lineTo(bw + p, 0.5 + x + p);
    }

    context.strokeStyle = "black";
    context.stroke();
}

function eqn(x, y){
    let val = x - 5;
    return val;
}

function march() {
    for (var x = 0; x <= horizontalGridLines; x++) {
        for (var y = 0; y <= verticalGridLines; y++) {
            let a = eqn(x, y);
            let b = eqn(x, y + 1);
            let c = eqn(x + 1, y);
            let d = eqn(x + 1, y + 1);
            if (a > 0 && b > 0 && c > 0 && d > 0) {
                continue;
            } else if (a < 0 && b < 0 && c < 0 && d < 0) {
                continue;
            } else {
                // Marching squares algorithm on a, b, c and d
                
                // Singles first
                if (a >= 0 && b < 0 && c < 0 && d < 0) {
                    drawTargetPixel(x + (a / (a - b)), y);
                }
            }
            context.fillStyle = eqn(x, y) >= 0 ? "black" : "white";
            context.fillRect(x * GRID_RES + p, y * GRID_RES + p, GRID_RES, GRID_RES);
        }
    }
}

march();
drawBoard();
