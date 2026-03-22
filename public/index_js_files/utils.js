import state from './state.js';

// Create empty grid
export const empty = (r, c) => {
    const out = new Array(r);
    for (let i = 0; i < r; i++) out[i] = new Array(c).fill(0);
    return out;
};

// Population count
export const pop = g => {
    let count = 0;
    for (let r = 0; r < g.length; r++) {
        for (let c = 0; c < g[r].length; c++) count += g[r][c];
    }
    return count;
};

// Copy grid
export const copy = g => g.map(row => row.slice());

// Center pattern
export const center = g => {
    let minR = g.length, maxR = -1;
    let minC = g[0].length, maxC = -1;
    
    for (let r = 0; r < g.length; r++) {
        for (let c = 0; c < g[0].length; c++) {
            if (g[r][c] === 1) {
                minR = Math.min(minR, r);
                maxR = Math.max(maxR, r);
                minC = Math.min(minC, c);
                maxC = Math.max(maxC, c);
            }
        }
    }
    
    if (minR === g.length) return copy(g);
    
    const h = maxR - minR + 1;
    const w = maxC - minC + 1;
    const gr = g.length;
    const gc = g[0].length;
    const cr = Math.floor((gr - h) / 2);
    const cc = Math.floor((gc - w) / 2);
    
    const out = empty(gr, gc);
    for (let r = minR; r <= maxR; r++) {
        for (let c = minC; c <= maxC; c++) {
            const nr = cr + (r - minR);
            const nc = cc + (c - minC);
            if (nr >= 0 && nr < gr && nc >= 0 && nc < gc) {
                out[nr][nc] = g[r][c];
            }
        }
    }
    return out;
};

// Save undo
export const saveUndo = () => {
    state.redos = [];
    state.undos.push(copy(state.grid));
    if (state.undos.length > 50) state.undos.shift();
};
