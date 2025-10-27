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
        if (dist < 15 && !currentlyHovering) {
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

    // Clear existing automaton
    Q = [];
    delta = {};
    selectedState = null;
    currentSolution = null;
    document.getElementById("test-result").innerText = "";
    document.getElementById("display-solution-button").disabled = true;

    // Parsing time!!
    // let state1 = addNewState();
    // setStateAsInitial(state1);
    // let state2 = addNewState(accepting=true);
    let [newQ, newDelta, newQ0] = getAutomataFromTree(regexToTree(regexInput))

    Q = newQ
    delta = newDelta
    setStateAsInitial(newQ0)

    // delta[state1.name] = [['0', state2.name]];
}

function getAutomataFromTree(tree) {
    // addAutomataFromTree(left branch), addAutomataFromTree(right branch), then tie them together. 
    // function returns which nodes were added

    console.log(tree)

    if (tree.type == 'symbol') {
        let newQ0 = getNewState(accepting=false)
        let q1 = getNewState(accepting=true)
        let newDelta = {}
        newDelta[newQ0.name] = [[tree.value, q1.name]]
        return [[newQ0, q1], newDelta, newQ0]
    }

    else if (tree.type == 'concat') {
        let [leftQ, leftDelta, leftQ0] = getAutomataFromTree(tree.left)
        let [rightQ, rightDelta, rightQ0] = getAutomataFromTree(tree.right)
        // tie left's accepting states to right's initial state
        for (const state of leftQ) {
            if (state.accepting) {
                if (!leftDelta[state.name]) {
                    leftDelta[state.name] = [];
                }
                leftDelta[state.name].push(['ε', rightQ0.name]);
                state.accepting = false; // no longer accepting
            }
        }
        console.log(leftDelta)
        return [[...leftQ, ...rightQ], {...leftDelta, ...rightDelta}, leftQ0]
    }

    else if (tree.type == 'union') {
        let [leftQ, leftDelta, leftQ0] = getAutomataFromTree(tree.left)
        let [rightQ, rightDelta, rightQ0] = getAutomataFromTree(tree.right)

        let newQ0 = getNewState()
        let newDelta = {}
        newDelta[newQ0.name] = [['ε', leftQ0.name], ['ε', rightQ0.name]]

        return [[...leftQ, ...rightQ, newQ0], {...leftDelta, ...rightDelta, ...newDelta}, newQ0]
    }

    else if (tree.type == 'star') {
        let [leftQ, leftDelta, leftQ0] = getAutomataFromTree(tree.left)

        let newQ0 = getNewState(accepted=true)
        let newDelta = {}
        newDelta[newQ0.name] = [['ε', leftQ0.name]]

        for (const state of leftQ) {
            if (state.accepting) {
                if (!leftDelta[state.name]) {
                    leftDelta[state.name] = [];
                }
                leftDelta[state.name].push(['ε', leftQ0.name]);
            }
        }

        return [[...leftQ, newQ0], {...leftDelta, ...newDelta}, newQ0]
    }
}

class RegexNode {
    constructor(type, value=null) {
        this.type = type; // 'symbol', 'concat', 'union', 'star'
        this.value = value; // for 'symbol' type
        this.left = null;
        this.right = null;
    }
}

function regexToTree(regex) {
    // symbols: literals (a,b,c...), operators (*, +), parentheses

    // Character by character parsing
    var tree = null;
    var justConcludedBracket = 0;
    var firstSymbol = 2;
    let i = 0;
    while (i < regex.length) {
        const char = regex[i];

        let dataAdded = null;

        if (char === '(') { 
            // find close bracket
            let openCount = 1;
            let closeCount = 0;
            for (var j = i+1; j < regex.length; j++) {
                if (regex[j] === '(') openCount++;
                else if (regex[j] === ')') closeCount++;
                
                if (openCount === closeCount) break;
            }

            dataAdded = regexToTree(regex.slice(i+1, j))
            justConcludedBracket = 2

            i = j;
        }

        else if (char === '*') {
            let starTree = new RegexNode('star')
            if (tree.left === null || (justConcludedBracket > 0 && firstSymbol > 0)) {
                starTree.left = tree
                tree = starTree
            } else {
                starTree.left = tree.right
                tree.right = starTree
            }
        }

        else if (char === '+') {
            let newTree = new RegexNode('union')
            newTree.left = tree
            
            // now find next + in current scope, and set right subtree to that
            let openCount = 1;
            let closeCount = 0;
            for (var j = i+1; j < regex.length; j++) {
                if (regex[j] === '+') break;
                else if (regex[j] === '(') openCount++;
                else if (regex[j] === ')') closeCount++;

                if (openCount === closeCount) break;
            }

            newTree.right = regexToTree(regex.slice(i+1, j))
            tree = newTree

            i = j;
        }

        else if (char === ' ') {}

        else {
            dataAdded = new RegexNode('symbol', value=char)
        }

        if (dataAdded != null) {
            // (a). if current tree is empty, make node the tree
            // (b). if current tree has left subtree not empty and right subtree empty, we must have a unison so insert into right (should be empty)
            // (c). if not, then we have concat, insert concat node and put item on right

            if (tree == null) {
                tree = dataAdded
            } else if (tree.left != null && tree.right == null && tree.type != 'star') {
                tree.right = dataAdded
            } else {
                let newTree = new RegexNode('concat')
                newTree.left = tree
                newTree.right = dataAdded
                tree = newTree
            }
            firstSymbol--;
        }

        if (justConcludedBracket > 0) justConcludedBracket--;

        i++;
    }

    return tree
}

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}

function getNewState(accepting = false) {
    return new State("q" + uuidv4(), accepting, Math.random() * (canvas.width - 100) + 50, Math.random() * (canvas.height - 100) + 50);
}

function addNewState(accepting = false) {
    let state = new State("q" + Q.length, accepting, Math.random() * (canvas.width - 100) + 50, Math.random() * (canvas.height - 100) + 50);
    Q.push(state);
    return state;
}

function setStateAsInitial(state) {
    q0 = state;

    // set to left hand side of the canvas in the middle vertically
    state.x = 70;
    state.y = canvas.height / 2;
}

beginPhysics();