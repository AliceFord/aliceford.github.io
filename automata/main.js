const canvas = document.getElementById('automata-canvas');
const ctx = canvas.getContext('2d');
var Q = [];
var t0 = 0;
var delta = {};
var hovering = false;
var selectedState = null;

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
        for (const [symbol, toStateName] of delta[fromStateName]) {
            const toState = Q.find(s => s.name === toStateName);

            // draw line. Note it should start and end at edge of circle
            const r = 55;

            const angle = Math.atan2(toState.y - fromState.y, toState.x - fromState.x);
            var fromX = fromState.x + (r+5) * Math.cos(angle);
            var fromY = fromState.y + (r+5) * Math.sin(angle);
            var toX = toState.x - (r+5) * Math.cos(angle);
            var toY = toState.y - (r+5) * Math.sin(angle);

            ctx.beginPath();
            ctx.moveTo(fromX, fromY);
            ctx.lineTo(toX, toY);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.stroke();

            // draw arrow head

            fromX = fromState.x + r * Math.cos(angle);
            fromY = fromState.y + r * Math.sin(angle);
            toX = toState.x - r * Math.cos(angle);
            toY = toState.y - r * Math.sin(angle);

            const arrowAngle = Math.atan2(toY - fromY, toX - fromX);
            const arrowLength = 10;
            ctx.beginPath();
            ctx.moveTo(toX, toY);
            ctx.lineTo(toX - arrowLength * Math.cos(arrowAngle - Math.PI / 6), toY - arrowLength * Math.sin(angle - Math.PI / 6));
            ctx.lineTo(toX - arrowLength * Math.cos(arrowAngle + Math.PI / 6), toY - arrowLength * Math.sin(angle + Math.PI / 6));
            ctx.lineTo(toX, toY);
            ctx.fillStyle = 'black';
            ctx.fill();

            // // draw symbol label at midpoint
            // const midX = (fromX + toX) / 2;
            // const midY = (fromY + toY) / 2;
            // ctx.fillStyle = 'red';
            // ctx.font = '16px Arial';
            // ctx.fillText(symbol, midX, midY);
        }
    }
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
            for (const state of Q) {
                if (state !== selectedState) {
                    const dx2 = x - state.x;
                    const dy2 = y - state.y;
                    const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                    if (dist2 < 50) {
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
    Q.push(new State("q0", false, 100, 100));
    Q.push(new State("q1", false, 350, 100));
    Q.push(new State("q2", true, 600, 120));

    delta["q0"] = [['0', "q1"]];
    delta["q1"] = [['1', "q2"], ['0', "q0"]];
    delta["q2"] = [['0', "q0"]];

    t0 = performance.now();
    setInterval(() => {
        updatePhysics();
        drawStates();
        drawTransitions();
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
    let activeStates = epsilonClosure([{ state: Q[0], path: [Q[0].name] }]);

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

beginPhysics();