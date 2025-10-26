const canvas = document.getElementById('automata-canvas');
const ctx = canvas.getContext('2d');
var Q = [];
var q0 = null;
var t0 = 0;
var delta = {};
var hovering = false;
var selectedState = null;
var currentSolution = null;

class State {
    constructor(name, accepting, x, y) {
        this.name = name;
        this.accepting = accepting;
        this.x = x;
        this.y = y;
        this.velocity = {x: 0, y: 0};
        this.colour = 'black';
    }
}

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

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(state.name, state.x, state.y);
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

function applySpringForce(q0, q1, dt) {
    let r_ij_vec = {x: q1.x - q0.x, y: q1.y - q0.y};
    let r_ij_mag = Math.sqrt(r_ij_vec.x * r_ij_vec.x + r_ij_vec.y * r_ij_vec.y);
    let r_ij_hat = {x: r_ij_vec.x / r_ij_mag, y: r_ij_vec.y / r_ij_mag};

    const k = 2; // spring constant
    const F_ij_mag = k * (r_ij_mag - 200); // rest length of 200 pixels
    const F_ij = {x: F_ij_mag * r_ij_hat.x, y: F_ij_mag * r_ij_hat.y};

    // // apply damping
    // const damping = 0.9;
    // F_ij.x -= damping * (q0.velocity.x - q1.velocity.x);
    // F_ij.y -= damping * (q0.velocity.y - q1.velocity.y);

    // update velocity and position with time step
    q0.velocity.x += F_ij.x * dt;
    q0.velocity.y += F_ij.y * dt;
    q1.velocity.x -= F_ij.x * dt;
    q1.velocity.y -= F_ij.y * dt;
}

function updatePhysics() {
    let t1 = performance.now();
    let dt = (t1 - t0) / 1000; // convert ms to s
    t0 = t1;

    // spring force for each pair of states

    if (Q.length < 2) return;
    for (let i = 0; i < Q.length - 1; i++) {
        for (let j = i + 1; j < Q.length; j++) {
            // if states have transition between them, apply force
            if (delta[Q[i].name] && delta[Q[i].name].some(([symbol, toStateName]) => toStateName === Q[j].name) ||
                delta[Q[j].name] && delta[Q[j].name].some(([symbol, toStateName]) => toStateName === Q[i].name)) {
                applySpringForce(Q[i], Q[j], dt);
            } else {
                // apply repulsive force
                const dx = Q[j].x - Q[i].x;
                const dy = Q[j].y - Q[i].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    const force = (200 - dist) * 0.01;
                    Q[i].velocity.x -= force * (dx / dist);
                    Q[i].velocity.y -= force * (dy / dist);
                    Q[j].velocity.x += force * (dx / dist);
                    Q[j].velocity.y += force * (dy / dist);
                }
            }
        }
    }

    // add extra force if close to wall
    const wallThreshold = 100;
    for (const state of Q) {
        if (state.x < wallThreshold) {
            state.velocity.x *= state.x / wallThreshold
        } else if (state.x > canvas.width - wallThreshold) {
            state.velocity.x *= (canvas.width - state.x) / wallThreshold
        } else if (state.y < wallThreshold) {
            state.velocity.y *= state.y / wallThreshold
        } else if (state.y > canvas.height - wallThreshold) {
            state.velocity.y *= (canvas.height - state.y) / wallThreshold
        }
    }

    // damp all velocities
    const dampingFactor = 0.95;
    for (const state of Q) {
        state.velocity.x *= dampingFactor;
        state.velocity.y *= dampingFactor;
    }

    // force q0 to have velocity 0
    if (q0) {
        q0.velocity.x = 0;
        q0.velocity.y = 0;
    }

    // update positions
    for (const state of Q) {
        state.x += state.velocity.x * dt;
        state.y += state.velocity.y * dt;
    }
}

function canvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (hovering) {
        if (selectedState) {
            // add transition from selectedState to clicked state
            let found = false;
            for (const state of Q) {
                if (state !== selectedState) {
                    const dx2 = x - state.x;
                    const dy2 = y - state.y;
                    const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                    if (dist2 < 50) {
                        found = true;
                        // const symbol = prompt("Enter transition symbol:");
                        const symbol = '0'; // hardcoded for testing
                        if (symbol) {
                            if (!delta[selectedState.name]) {
                                delta[selectedState.name] = [];
                            }
                            delta[selectedState.name].push([symbol, state.name]);
                        }
                        break;
                    }
                }
            } 
            if (!found) { // clicked on same state again, toggle accepting
                selectedState.accepting = !selectedState.accepting;
            }
            selectedState = null;
        } else {
            // find first (should be only) state being hovered over and set colour to blue
            for (const state of Q) {
                const dx = x - state.x;
                const dy = y - state.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 50) {
                    state.colour = 'blue';
                    selectedState = state;
                    break;
                }
            }
        }
    } else {
        Q.push(new State("q" + Q.length, false, x, y));
    }
}

function beginPhysics() {
    setStateAsInitial(addNewState());
    var q1 = addNewState();
    var q2 = addNewState(true);

    delta[q0.name] = [['0', q1.name]];
    delta[q1.name] = [['1', q2.name], ['0', q0.name]];
    delta[q2.name] = [['0', q0.name]];

    t0 = performance.now();
    setInterval(() => {
        updatePhysics();
        drawStates();
        drawTransitions();
        drawQ0Transition();
    }, 1000 / 60);
}

function epsilonClosure(statePaths) {
    let stack = [...statePaths];
    let closure = new Map(); // stateName -> path (shortest found)

    while (stack.length > 0) {
        const { state, path } = stack.pop();

        if (closure.has(state.name)) continue; // already visited
        closure.set(state.name, path);

        const transitions = delta[state.name] || [];
        for (const [symbol, toName] of transitions) {
            if (symbol === "ε") { // epsilon move
                const toState = Q.find(s => s.name === toName);
                if (toState) {
                    stack.push({ state: toState, path: [...path, toState.name] });
                }
            }
        }
    }

    // return as array of {state, path}
    return [...closure.entries()].map(([_, path]) => {
        const s = Q.find(q => q.name === path[path.length - 1]);
        return { state: s, path };
    });
}

function acceptedByAutomaton(str) {
    // start at initial state's epsilon-closure
    let activeStates = epsilonClosure([{ state: q0, path: [q0.name] }]);

    for (const symbol of str) {
        let newStates = [];

        // follow symbol transitions
        for (const { state, path } of activeStates) {
            const transitions = delta[state.name] || [];

            for (const [transSymbol, toStateName] of transitions) {
                if (transSymbol === symbol) {
                    const toState = Q.find(s => s.name === toStateName);
                    if (toState) {
                        newStates.push({ state: toState, path: [...path, toState.name] });
                    }
                }
            }
        }

        // after consuming symbol, expand via epsilon again
        activeStates = epsilonClosure(newStates);
    }

    // filter to accepting states
    activeStates = activeStates.filter(({ state, path }) => state.accepting);

    return activeStates;
}

canvas.onmousemove = function(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    var currentlyHovering = false;
    for (const state of Q) {
        const dx = mouseX - state.x;
        const dy = mouseY - state.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 50 && !currentlyHovering) {
            if (state !== selectedState) {
                state.colour = 'yellow';
            }
            currentlyHovering = true;
        } else {
            if (state !== selectedState) {
                state.colour = 'black';
            }
        }
    }
    hovering = currentlyHovering;
}

function testString() {
    const input = document.getElementById("string-to-test").value;
    document.getElementById("string-to-test").value = "";
    const result = acceptedByAutomaton(input);
    if (result.length !== 0) {
        document.getElementById("test-result").innerText = "Accepted";
        document.getElementById("display-solution-button").disabled = false;
        currentSolution = result[0]; // take first solution
    } else {
        document.getElementById("test-result").innerText = "Rejected";
        document.getElementById("display-solution-button").disabled = true;
        currentSolution = null;
    }
}

function displaySolution() {
    if (!currentSolution) {
        console.error("No current solution to display.");
        return;
    }

    // highlight states in solution path, one by one
    let index = 0;
    const interval = setInterval(() => {
        if (index > 0) {
            const prevStateName = currentSolution.path[index - 1];
            const prevState = Q.find(s => s.name === prevStateName);
            prevState.colour = 'black';
        }
        if (index < currentSolution.path.length) {
            const stateName = currentSolution.path[index];
            const state = Q.find(s => s.name === stateName);
            state.colour = 'green';
            index++;
        } else {
            clearInterval(interval);
        }
    }, 3000 / currentSolution.path.length);
}

function convertToAutomata() {
    var regexInput = document.getElementById("regex-to-automata").value;

    regexInput = "0"

    // Clear existing automaton
    Q = [];
    delta = {};
    selectedState = null;
    currentSolution = null;
    document.getElementById("test-result").innerText = "";
    document.getElementById("display-solution-button").disabled = true;

    // Parsing time!!
    let state1 = addNewState();
    setStateAsInitial(state1);
    let state2 = addNewState(accepting=true);

    delta[state1.name] = [['0', state2.name]];
}

function addNewState(accepting = false) {
    let state = new State("q" + Q.length, accepting, Math.random() * (canvas.width - 100) + 50, Math.random() * (canvas.height - 100) + 50);
    Q.push(state);
    return state;
}

function setStateAsInitial(state) {
    q0 = state;

    // set to left hand side of the canvas in the middle vertically
    state.x = 100;
    state.y = canvas.height / 2;
}

beginPhysics();