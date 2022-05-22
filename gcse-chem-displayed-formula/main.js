var mainInputMethod = "iupac";

class Node {
    constructor(name, children) {
        this.name = name;
        this.children = children;
    }
}

var createTree = function(data) {
    if (mainInputMethod == "iupac") {

    } else if (mainInputMethod == "smiles") {
        for (var i = 0; i < data.length; i++) {
            
        }
    }
}

var changeInputMethod = function(inputMethod) {
    mainInputMethod = inputMethod;
};

var generateDrawing = function() {
    console.log()

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    ctx.putImageData(imageData, 0, 0);
}