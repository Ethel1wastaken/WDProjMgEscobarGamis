import { renderGrid } from '../renderGrid.js';
import { spacerake } from '../patterns/spacerake.js';
import state from './state.js';
import { copy, center, empty } from './utils.js';
import { updateUI } from './display.js';

// Load state
export const load = () => {
    const saved = localStorage.getItem('selectedPattern');
    if (saved) {
        try {
            const p = JSON.parse(saved);
            localStorage.removeItem('selectedPattern');
            return p;
        } catch (e) {
            return spacerake;
        }
    }
    return spacerake;
};

// Initialize
export const initialize = () => {
    const loaded = load();
    state.orig = copy(loaded.pattern);
    state.grid = copy(loaded.pattern);
    state.grid = center(state.grid);
    state.buf = empty(Math.max(800, state.grid.length), Math.max(800, state.grid[0].length));

    if (state.grid.length < 800 || state.grid[0].length < 800) {
        const r = Math.max(800, state.grid.length);
        const c = Math.max(800, state.grid[0].length);
        const big = empty(r, c);
        for (let i = 0; i < state.grid.length; i++) {
            for (let j = 0; j < state.grid[0].length; j++) {
                big[i][j] = state.grid[i][j];
            }
        }
        state.grid = big;
        state.buf = empty(r, c);
        state.orig = copy(state.grid);
    }

    state.gen = 0;
    renderGrid({ pattern: state.grid });
    updateUI();

    return loaded;
};
