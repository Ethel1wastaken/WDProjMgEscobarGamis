import { renderGrid } from '../renderGrid.js';
import state from './state.js';
import { updateUI, updateTime } from './display.js';
import { saveUndo } from './utils.js';

// Attach paste handlers
export const attachPasteHandlers = () => {
    document.addEventListener('mousemove', e => {
        if (!state.pasting || !window._clip) return;
        const canvas = document.getElementById('gridCanvas');
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return;
        
        const ctx = window._ctxState || { cellSize: 12, scale: 1 };
        const x = (e.clientX - rect.left) / ctx.scale;
        const y = (e.clientY - rect.top) / ctx.scale;
        const c = Math.floor(x / ctx.cellSize);
        const r = Math.floor(y / ctx.cellSize);
        
        if (!state.pastePos || state.pastePos.r !== r || state.pastePos.c !== c) {
            state.pastePos = { r, c };
            renderGrid({ pattern: state.grid });
        }
    });

    document.addEventListener('click', e => {
        if (!state.pasting || !window._clip || !state.pastePos) return;
        const canvas = document.getElementById('gridCanvas');
        if (!canvas || e.target !== canvas) return;
        
        saveUndo();
        const { r, c } = state.pastePos;
        for (let pr = 0; pr < window._clip.length; pr++) {
            for (let pc = 0; pc < window._clip[0].length; pc++) {
                const nr = r + pr;
                const nc = c + pc;
                if (nr >= 0 && nr < state.grid.length && nc >= 0 && nc < state.grid[0].length) {
                    state.grid[nr][nc] = window._clip[pr][pc];
                }
            }
        }
        
        renderGrid({ pattern: state.grid });
        updateUI();
        updateTime();
        state.pasting = false;
        state.pastePos = null;
    }, true);
};
