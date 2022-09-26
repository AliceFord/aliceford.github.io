MAINPLOT = document.getElementById('mainPlot');

// For y = x^2 + 9:

let re_x = [];
let re_y = [];
let re_z = [];

for (let i = -10; i < 10; i++) {
    re_x.push(i);
    re_y.push(i ** 2 + 9);
    re_z.push(0);
}

let im_x = [];
let im_y = [];
let im_z = [];

for (let i = -10; i < 10; i++) {
    im_z.push(i);
    let c = new Complex({re: 0, im: i})
    im_y.push(c.pow(2).re + 9);
    im_x.push(0);
}

var real = {
    x: re_x,
    y: re_z,
    z: re_y,
    type: 'scatter3d',
    mode: 'lines',
    name: 'Real',
    hovertemplate: 'x: %{x}<br>y: %{z}<br>z: %{y}i<br>'
};

var imaginary = {
    x: im_x,
    y: im_z,
    z: im_y,
    type: 'scatter3d',
    mode: 'lines',
    name: 'Imaginary',
    hovertemplate: 'x: %{x}<br>y: %{z}<br>z: %{y}i<br>'
}

var layout = {
    scene: {
        xaxis: { title: { text: 'x' } },
        yaxis: { title: { text: 'z' } },
        zaxis: { title: { text: 'y' } }
    },
    
    height: 700
}

var data = [real, imaginary];


Plotly.newPlot(MAINPLOT, data, layout);


function updateEquation() {
    let step = parseFloat(document.getElementById('step').value);
    let positiveRange = parseFloat(document.getElementById('positiveRange').value);
    let negativeRange = parseFloat(document.getElementById('negativeRange').value);
    
    let eqn = document.getElementById('equationInput').value;
    eqn = eqn.replace(/\^/g, "**")

    re_x = [];
    re_y = [];
    re_z = [];

    eqn = eqn.replace(/x/g, 'i');  // to work with loop
    for (let i = -negativeRange; i <= positiveRange; i += step) {
        re_x.push(i);
        re_y.push(eval(eqn));
        re_z.push(0);
    }
    console.log(eqn)

    im_x = [];
    im_y = [];
    im_z = [];

    eqn = eqn.replace(/i/g, 'c');  // to work with loop
    eqn = eqn.replace(/\*\*([\d]+)/gm, (match, num) => `.pow(${num}).re`);
    for (let i = -negativeRange; i <= positiveRange; i += step) {
        im_z.push(i);
        let c = new Complex({re: 0, im: i})
        im_y.push(eval(eqn));
        im_x.push(0);
    }

    real = {
        x: re_x,
        y: re_z,
        z: re_y,
        type: 'scatter3d',
        mode: 'lines',
        name: 'Real',
        hovertemplate: 'x: %{x}<br>y: %{z}<br>z: %{y}i<br>'
    };

    imaginary = {
        x: im_x,
        y: im_z,
        z: im_y,
        type: 'scatter3d',
        mode: 'lines',
        name: 'Imaginary',
        hovertemplate: 'x: %{x}<br>y: %{z}<br>z: %{y}i<br>'
    }

    console.log(imaginary)

    data = [real, imaginary];

    Plotly.newPlot(MAINPLOT, data, layout);
}

// Plotly.newPlot( MAINPLOT, [{
//     type: 'scatter3d',
//     mode: 'lines',
//     x: x,
//     z: y,
//     y: zi,
//     xaxis: { title: { text: 'x' } },
//     yaxis: { title: { text: 'y' } },
//     zaxis: { title: { text: 'z' } }
// }], {
//     margin: { t: 0 } } );