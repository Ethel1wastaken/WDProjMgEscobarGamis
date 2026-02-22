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

let generation = 0;

const createEmpty = (rows, cols) => {
    const out = new Array(rows);
    for (let r = 0; r < rows; r++) out[r] = new Array(cols).fill(0);
    return out;
};

const computePopulation = grid => {
    let pop = 0;
    for (let r = 0; r < grid.length; r++) {
        const row = grid[r];
        for (let c = 0; c < row.length; c++) pop += row[c];
    }
    return pop;
};

const updateCounters = grid => {
    const genEl = document.getElementById('generation');
    const popEl = document.getElementById('population');
    if (genEl) genEl.innerText = `Generation: ${generation}`;
    if (popEl) popEl.innerText = `Population: ${computePopulation(grid)}`;
};

let patternGrid = null;
let bufferGrid = null;
let originalPattern = null;
let mode = 'edit';

const copyGrid = grid => grid.map(row => row.slice());

window.onGridEdited = () => {
    originalPattern = copyGrid(patternGrid);
};

window.addEventListener('keydown', e => {
    if (e.key === 'M' || e.key === 'm') {
        mode = mode === 'edit' ? 'view' : 'edit';
        const modeText = document.getElementById('modeText');
        if (modeText) modeText.innerText = mode === 'edit' ? 'Edit Mode' : 'View Mode';
        const canvas = document.getElementById('gridCanvas');
        if (canvas) canvas.style.cursor = mode === 'edit' ? 'default' : 'grab';
    }
});

window.getMode = () => mode;

const mainLoop = () => {
    if (!patternGrid || !bufferGrid) return;
    nextGeneration(patternGrid, bufferGrid);
    const tmp = patternGrid;
    patternGrid = bufferGrid;
    bufferGrid = tmp;
    state.pattern = patternGrid;
    generation++;
    renderGrid(state);
    updateCounters(patternGrid);
};

const clearGridInPlace = grid => {
    for (let r = 0; r < grid.length; r++) grid[r].fill(0);
};

const resetState = () => {
    const saved = localStorage.getItem('selectedPattern');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            localStorage.removeItem('selectedPattern');
            return parsed;
        } catch (e) {
            return spacerake;
        }
    }
    return spacerake;
};

let state = resetState();
originalPattern = copyGrid(state.pattern);
patternGrid = copyGrid(state.pattern);
state.pattern = patternGrid;
bufferGrid = createEmpty(patternGrid.length, patternGrid[0].length);
generation = 0;
renderGrid(state);
updateCounters(patternGrid);

let intervalId = null;

document.getElementById('start').onclick = () => {
    const delay = 100;
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        document.getElementById('start').innerText = '▶';
    } else {
        mainLoop();
        intervalId = setInterval(mainLoop, delay);
        document.getElementById('start').innerText = '⏸';
    }
};

document.getElementById('reset').onclick = () => {
    patternGrid = copyGrid(originalPattern);
    bufferGrid = createEmpty(patternGrid.length, patternGrid[0].length);
    state.pattern = patternGrid;
    generation = 0;
    renderGrid(state);
    updateCounters(patternGrid);
};

document.getElementById('clear').onclick = () => {
    clearGridInPlace(patternGrid);
    generation = 0;
    state.pattern = patternGrid;
    renderGrid(state);
    updateCounters(patternGrid);
};

document.getElementById('next').onclick = () => {
    nextGeneration(patternGrid, bufferGrid);
    const tmp = patternGrid;
    patternGrid = bufferGrid;
    bufferGrid = tmp;
    state.pattern = patternGrid;
    generation++;
    renderGrid(state);
    updateCounters(patternGrid);
};

document.getElementById('mode').onclick = () => {
    mode = mode === 'edit' ? 'view' : 'edit';
    const modeText = document.getElementById('modeText');
    if (modeText) modeText.innerText = mode === 'edit' ? 'Edit Mode' : 'View Mode';
    const canvas = document.getElementById('gridCanvas');
    if (canvas) canvas.style.cursor = mode === 'edit' ? 'default' : 'grab';
};

document.getElementById('generate').onclick = () => {
    const rows = patternGrid.length;
    const cols = patternGrid[0].length;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            patternGrid[r][c] = Math.random() < 0.25 ? 1 : 0;
        }
    }
    generation = 0;
    state.pattern = patternGrid;
    renderGrid(state);
    updateCounters(patternGrid);
    originalPattern = copyGrid(patternGrid);
};

document.getElementById('newPattern').onclick = () => {
    const rowsStr = prompt('Enter number of rows for new grid (e.g. 60):', String(patternGrid.length));
    if (!rowsStr) return;
    const colsStr = prompt('Enter number of columns for new grid (e.g. 80):', String(patternGrid[0].length));
    if (!colsStr) return;
    const rows = Math.max(4, Math.min(1000, parseInt(rowsStr, 10) || 60));
    const cols = Math.max(4, Math.min(1000, parseInt(colsStr, 10) || 80));
    patternGrid = createEmpty(rows, cols);
    bufferGrid = createEmpty(rows, cols);
    originalPattern = copyGrid(patternGrid);
    state.pattern = patternGrid;
    generation = 0;
    renderGrid(state);
    updateCounters(patternGrid);
};

document.getElementById('saveToBackpack').onclick = () => {
    const choice = confirm('Save from current generation?\n\nOK = Current Generation\nCancel = Last Edit');
    const gridToSave = choice ? copyGrid(patternGrid) : copyGrid(originalPattern);
    const sourceLabel = choice ? 'current generation' : 'last edit';
    const name = prompt(`Enter a name for this pattern (from ${sourceLabel}):`, state.title || 'My Pattern');
    if (!name) return;
    const patternToSave = {
        ...state,
        pattern: gridToSave,
        title: name,
    };
    let backpack = JSON.parse(localStorage.getItem('backpack') || '{"myCreations": [], "recents": [], "otherCreators": []}');
    backpack.myCreations.push(patternToSave);
    backpack.recents.unshift(patternToSave);
    if (backpack.recents.length > 10) backpack.recents.pop();
    localStorage.setItem('backpack', JSON.stringify(backpack));
    alert(`Saved "${name}" to your backpack!`);
};

