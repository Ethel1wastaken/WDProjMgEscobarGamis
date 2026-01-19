import { glider } from "./patterns/glider.js";
import { pulsar } from "./patterns/pulsar.js";
import { pentomino } from "./patterns/pentomino.js";
import { renderGrid } from "./renderGrid.js";
import { nextGeneration } from "./nextGeneration.js";
import { gosper } from "./patterns/gosper.js";
import { blank } from "./patterns/blank.js";
import { puffertrain } from "./patterns/puffertrain.js";
import { boatmaker } from "./patterns/boatmaker.js";
import { slidegun } from "./patterns/slidegun.js";
import { sombreros } from "./patterns/sombreros.js";
import { spacerake } from "./patterns/spacerake.js";

function mainLoop() {
    renderGrid(state.pattern);
    state.pattern = nextGeneration(state.pattern);
}

function clearState(state) {
    const rows = state.length;
    const cols = state[0].length;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            state[r][c] = 0;
        }
    }
    return state;
}

function resetState() {
    let newState = spacerake;
    return newState;
}


let state = resetState();
renderGrid(state.pattern);

let intervalId = null;

document.getElementById("start").onclick = function() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        document.getElementById("start").innerText = "▶";
    }
    else {
        mainLoop();
        intervalId = setInterval(mainLoop, 100);
        document.getElementById("start").innerText = "⏸";
    }
}

document.getElementById("reset").onclick = function() {
    state = resetState();
    renderGrid(state.pattern);
} 

document.getElementById("clear").onclick = function() {
    state.pattern = clearState(state.pattern);
    renderGrid(state.pattern);
}

document.getElementById("next").onclick = function() {
    state.pattern = nextGeneration(state.pattern);
    renderGrid(state.pattern);
}
