import { renderGrid } from '../renderGrid.js';
import { nextGeneration } from '../nextGeneration.js';
import state from './state.js';
import { updateUI } from './display.js';

// Main game loop
export const run = () => {
    if (!state.grid || !state.buf) return;
    nextGeneration(state.grid, state.buf);
    [state.grid, state.buf] = [state.buf, state.grid];
    state.gen++;
    renderGrid({ pattern: state.grid });
    updateUI();
};
