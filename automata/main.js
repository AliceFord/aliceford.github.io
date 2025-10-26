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