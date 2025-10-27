function drawState(state) {
    ctx.beginPath();
    ctx.arc(state.x, state.y, 50, 0, 2 * Math.PI);
    ctx.lineWidth = 5;
    ctx.strokeStyle = state.colour;
    ctx.stroke();

    if (state.accepting) {
        ctx.beginPath();
        ctx.arc(state.x, state.y, 40, 0, 2 * Math.PI);
        ctx.lineWidth = 3;
        ctx.strokeStyle = state.colour;
        ctx.stroke();
    }

    // ctx.fillStyle = 'black';
    // ctx.font = '20px Arial';
    // ctx.textAlign = 'center';
    // ctx.textBaseline = 'middle';
    // ctx.fillText(state.name, state.x, state.y);
}

function drawStates() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const state of Q) {
        drawState(state);
    }
}

function drawTransitions() {
    for (const fromStateName in delta) {
        const fromState = Q.find(s => s.name === fromStateName);
        var toStates = {}
        for (const [symbol, toStateName] of delta[fromStateName]) {
            if (!toStates[toStateName]) {
                toStates[toStateName] = [];
            }
            toStates[toStateName].push(symbol);
        }
        for (const toStateName in toStates) {
            const toState = Q.find(s => s.name === toStateName);

            // draw line. Note it should start and end at edge of circle
            const r = 55;

            const angle = Math.atan2(toState.y - fromState.y, toState.x - fromState.x);
            // offset along normal to the line so the segment is translated slightly
            const offset = 6;
            const nx = -Math.sin(angle); // normal x
            const ny = Math.cos(angle);  // normal y

            var fromX = fromState.x + (r+5) * Math.cos(angle) + nx * offset;
            var fromY = fromState.y + (r+5) * Math.sin(angle) + ny * offset;
            var toX = toState.x - (r+5) * Math.cos(angle) + nx * offset;
            var toY = toState.y - (r+5) * Math.sin(angle) + ny * offset;

            ctx.beginPath();
            ctx.moveTo(fromX, fromY);
            ctx.lineTo(toX, toY);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.stroke();

            // draw arrow head

            fromX = fromState.x + r * Math.cos(angle) + nx * offset;
            fromY = fromState.y + r * Math.sin(angle) + ny * offset;
            toX = toState.x - r * Math.cos(angle) + nx * offset;
            toY = toState.y - r * Math.sin(angle) + ny * offset;

            const arrowAngle = Math.atan2(toY - fromY, toX - fromX);
            const arrowLength = 10;
            ctx.beginPath();
            ctx.moveTo(toX, toY);
            ctx.lineTo(toX - arrowLength * Math.cos(arrowAngle - Math.PI / 6), toY - arrowLength * Math.sin(arrowAngle - Math.PI / 6));
            ctx.lineTo(toX - arrowLength * Math.cos(arrowAngle + Math.PI / 6), toY - arrowLength * Math.sin(arrowAngle + Math.PI / 6));
            ctx.lineTo(toX, toY);
            ctx.fillStyle = 'black';
            ctx.fill();

            // // draw symbol label at midpoint

            const symbols = toStates[toStateName].join(',');
            let midX = (fromX + toX) / 2 + nx * 15;
            let midY = (fromY + toY) / 2 + ny * 15;
            ctx.fillStyle = 'red';
            ctx.font = '16px Arial';
            ctx.fillText(symbols, midX, midY);
        }
    }
}

function drawQ0Transition() {
    if (!q0) return;
    // draw line from left side of canvas to q0
    ctx.beginPath();
    ctx.moveTo(q0.x - 100, q0.y);
    ctx.lineTo(q0.x - 50, q0.y);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

    // draw arrow head
    const toX = q0.x - 50;
    const toY = q0.y;
    const arrowAngle = Math.PI * 2; // pointing right
    const arrowLength = 10;
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - arrowLength * Math.cos(arrowAngle - Math.PI / 6), toY - arrowLength * Math.sin(arrowAngle - Math.PI / 6));
    ctx.lineTo(toX - arrowLength * Math.cos(arrowAngle + Math.PI / 6), toY - arrowLength * Math.sin(arrowAngle + Math.PI / 6));
    ctx.lineTo(toX, toY);
    ctx.fillStyle = 'black';
    ctx.fill();
}