import { renderGrid } from '../renderGrid.js';
import state from './state.js';
import { updateUI, updateTime } from './display.js';
import { empty, copy, saveUndo } from './utils.js';

// Attach keyboard shortcuts
export const attachKeyboardHandlers = () => {
    // Cut/Copy/Paste
    window.addEventListener('keydown', e => {
        if (state.mode !== 'select') return;
        
        if (e.ctrlKey && e.key === 'x') {
            if (!window._s1 || !window._s2) return;
            e.preventDefault();
            const r1 = Math.min(window._s1.r, window._s2.r);
            const r2 = Math.max(window._s1.r, window._s2.r);
            const c1 = Math.min(window._s1.c, window._s2.c);
            const c2 = Math.max(window._s1.c, window._s2.c);
            
            window._clip = empty(r2 - r1 + 1, c2 - c1 + 1);
            for (let r = r1; r <= r2; r++) {
                for (let c = c1; c <= c2; c++) {
                    window._clip[r - r1][c - c1] = state.grid[r][c];
                    state.grid[r][c] = 0;
                }
            }
            state.clip = window._clip;
            saveUndo();
            renderGrid({ pattern: state.grid });
            updateUI();
            updateTime();
            window._s1 = window._s2 = state.s1 = state.s2 = null;
        }
        else if (e.ctrlKey && e.key === 'c') {
            if (!window._s1 || !window._s2) return;
            e.preventDefault();
            const r1 = Math.min(window._s1.r, window._s2.r);
            const r2 = Math.max(window._s1.r, window._s2.r);
            const c1 = Math.min(window._s1.c, window._s2.c);
            const c2 = Math.max(window._s1.c, window._s2.c);
            
            window._clip = empty(r2 - r1 + 1, c2 - c1 + 1);
            for (let r = r1; r <= r2; r++) {
                for (let c = c1; c <= c2; c++) {
                    window._clip[r - r1][c - c1] = state.grid[r][c];
                }
            }
            state.clip = window._clip;
        }
        else if (e.ctrlKey && e.key === 'v') {
            if (!window._clip) return;
            e.preventDefault();
            state.pasting = true;
            state.pastePos = null;
        }
    });

    // Undo/Redo
    window.addEventListener('keydown', e => {
        if (e.ctrlKey && e.key === 'z') {
            e.preventDefault();
            if (state.undos.length > 0) {
                state.redos.push(copy(state.grid));
                state.grid = state.undos.pop();
                renderGrid({ pattern: state.grid });
                updateUI();
                state.pasting = false;
                state.pastePos = null;
            }
        }
        else if (e.ctrlKey && e.key === 'y') {
            e.preventDefault();
            if (state.redos.length > 0) {
                state.undos.push(copy(state.grid));
                state.grid = state.redos.pop();
                renderGrid({ pattern: state.grid });
                updateUI();
                state.pasting = false;
                state.pastePos = null;
            }
        }
    });
};
