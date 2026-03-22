// State object
const state = {
    gen: 0,
    grid: null,
    buf: null,
    orig: null,
    mode: 'draw',
    playing: false,
    interval: null,
    s1: null,
    s2: null,
    clip: null,
    pasting: false,
    pastePos: null,
    undos: [],
    redos: []
};

// Window exports
window._s1 = null;
window._s2 = null;
window._clip = null;

export default state;

// Expose for renderGrid
window.getMode = () => state.mode;
window.getPaste = () => state.pasting;
window.getPastePos = () => state.pastePos;

