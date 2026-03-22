const ctxState = {
    canvas: null,
    ctx: null,
    rows: 0,
    cols: 0,
    cellSize: 12,
    scale: 1,
};

window._ctxState = ctxState;

const ensureCanvas = (rows, cols) => {
    const wrapper = document.getElementById('gridWrapper') || document.querySelector('.grid-wrapper');
    if (!wrapper) throw new Error('Missing wrapper');
    
    let canvas = document.getElementById('gridCanvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'gridCanvas';
        canvas.style.display = 'block';
        canvas.style.background = '#ffffff';
        wrapper.appendChild(canvas);
        ctxState.canvas = canvas;
        ctxState.ctx = canvas.getContext('2d');
        window._ctxState = ctxState;

        const toggle = (r, c, g) => {
            if (!g || r < 0 || c < 0 || r >= g.length || c >= g[0].length) return false;
            g[r][c] = g[r][c] === 1 ? 0 : 1;
            return true;
        };

        const updatePop = g => {
            const el = document.getElementById('population');
            if (el) {
                let cnt = 0;
                for (let rr = 0; rr < g.length; rr++) for (let cc = 0; cc < g[0].length; cc++) cnt += g[rr][cc];
                el.innerText = `Pop: ${cnt}`;
            }
        };

        canvas.addEventListener('click', e => {
            const m = window.getMode ? window.getMode() : 'draw';
            if (m === 'view' || m === 'select') return;
            
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) / ctxState.scale;
            const y = (e.clientY - rect.top) / ctxState.scale;
            const c = Math.floor(x / ctxState.cellSize);
            const r = Math.floor(y / ctxState.cellSize);
            const g = canvas._currentGrid;
            
            if (!toggle(r, c, g)) return;
            renderGrid({ pattern: g });
            updatePop(g);
            if (window.onGridEdited) window.onGridEdited();
        });

        let dragging = false;
        let lastX = 0;
        let lastY = 0;
        const toggled = new Set();
        let selectDrag = false;
        
        canvas.addEventListener('mousedown', e => {
            const m = window.getMode ? window.getMode() : 'draw';
            if (e.button !== 0) return;
            
            if (m === 'select') {
                selectDrag = true;
                const rect = canvas.getBoundingClientRect();
                const x = (e.clientX - rect.left) / ctxState.scale;
                const y = (e.clientY - rect.top) / ctxState.scale;
                const c = Math.floor(x / ctxState.cellSize);
                const r = Math.floor(y / ctxState.cellSize);
                window._s1 = { r, c };
                window._s2 = { r, c };
                canvas.style.cursor = 'crosshair';
                return;
            }
            
            dragging = true;
            lastX = e.clientX;
            lastY = e.clientY;
            toggled.clear();
            canvas.style.cursor = m === 'view' ? 'grabbing' : 'crosshair';
        });
        
        window.addEventListener('mouseup', () => {
            dragging = false;
            selectDrag = false;
            const m = window.getMode ? window.getMode() : 'draw';
            if (m === 'select') canvas.style.cursor = 'crosshair';
            else canvas.style.cursor = m === 'view' ? 'grab' : 'default';
        });
        
        window.addEventListener('mousemove', e => {
            const m = window.getMode ? window.getMode() : 'draw';
            
            if (selectDrag) {
                const rect = canvas.getBoundingClientRect();
                const x = (e.clientX - rect.left) / ctxState.scale;
                const y = (e.clientY - rect.top) / ctxState.scale;
                const c = Math.floor(x / ctxState.cellSize);
                const r = Math.floor(y / ctxState.cellSize);
                window._s2 = { r, c };
                renderGrid({ pattern: canvas._currentGrid });
                return;
            }
            
            if (!dragging) return;
            
            if (m === 'view') {
                const dx = e.clientX - lastX;
                const dy = e.clientY - lastY;
                lastX = e.clientX;
                lastY = e.clientY;
                const wr = canvas.parentElement;
                wr.scrollLeft -= dx;
                wr.scrollTop -= dy;
            } else {
                const rect = canvas.getBoundingClientRect();
                const x = (e.clientX - rect.left) / ctxState.scale;
                const y = (e.clientY - rect.top) / ctxState.scale;
                const c = Math.floor(x / ctxState.cellSize);
                const r = Math.floor(y / ctxState.cellSize);
                const key = `${r},${c}`;
                const g = canvas._currentGrid;
                
                if (!toggled.has(key) && toggle(r, c, g)) {
                    toggled.add(key);
                    renderGrid({ pattern: g });
                    updatePop(g);
                    if (window.onGridEdited) window.onGridEdited();
                }
            }
        });

        canvas.addEventListener('wheel', e => {
            if (!e.ctrlKey && !e.metaKey) return;
            e.preventDefault();
            const delta = e.deltaY < 0 ? 1.1 : 0.9;
            const prev = ctxState.scale;
            const next = Math.max(0.2, Math.min(4, prev * delta));
            const rect = canvas.getBoundingClientRect();
            const wr = canvas.parentElement;
            
            const mx = (e.clientX - rect.left + wr.scrollLeft) / prev;
            const my = (e.clientY - rect.top + wr.scrollTop) / prev;
            ctxState.scale = next;
            resizeCanvas(ctxState.rows, ctxState.cols);
            
            const nsl = Math.max(0, mx * next - (e.clientX - rect.left));
            const nst = Math.max(0, my * next - (e.clientY - rect.top));
            wr.scrollLeft = nsl;
            wr.scrollTop = nst;
        }, { passive: false });
    }
    ctxState.rows = rows;
    ctxState.cols = cols;
    window._ctxState = ctxState;
    return ctxState;
};

const resizeCanvas = (rows, cols) => {
    const { canvas, cellSize, scale } = ctxState;
    const w = Math.max(1, Math.floor(cols * cellSize * scale));
    const h = Math.max(1, Math.floor(rows * cellSize * scale));
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
};

export const renderGrid = state => {
    const obj = state && state.pattern ? state : null;
    const g = obj ? obj.pattern : state;
    const rows = g.length;
    const cols = g[0].length;
    
    const s = ensureCanvas(rows, cols);
    const canvas = s.canvas;
    const ctx = s.ctx;
    const cs = s.cellSize;
    const sc = s.scale;
    resizeCanvas(rows, cols);

    for (let c = 0; c < cols; c++) { g[0][c] = 0; g[rows-1][c] = 0; }
    for (let r = 0; r < rows; r++) { g[r][0] = 0; g[r][cols-1] = 0; }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const draw = (r, c) => {
        if (g[r][c] !== 1) return;
        ctx.fillStyle = '#222';
        const x = Math.floor(c * cs * sc);
        const y = Math.floor(r * cs * sc);
        const w = Math.ceil(cs * sc);
        const h = Math.ceil(cs * sc);
        ctx.fillRect(x, y, w, h);
    };

    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) draw(r, c);

    ctx.strokeStyle = 'rgba(0,0,0,0.06)';
    ctx.lineWidth = 1;
    for (let r = 0; r <= rows; r++) {
        const y = Math.round(r * cs * sc) + 0.5;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }
    for (let c = 0; c <= cols; c++) {
        const x = Math.round(c * cs * sc) + 0.5;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }

    if (window._s1 && window._s2) {
        const s = window._s1;
        const e = window._s2;
        const mr = Math.min(s.r, e.r);
        const mr2 = Math.max(s.r, e.r);
        const mc = Math.min(s.c, e.c);
        const mc2 = Math.max(s.c, e.c);
        
        const x1 = Math.floor(mc * cs * sc);
        const y1 = Math.floor(mr * cs * sc);
        const x2 = Math.floor((mc2 + 1) * cs * sc);
        const y2 = Math.floor((mr2 + 1) * cs * sc);
        
        ctx.strokeStyle = '#0066ff';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
        ctx.setLineDash([]);
    }

    const p = window.getPaste ? window.getPaste() : false;
    const pp = window.getPastePos ? window.getPastePos() : null;
    
    if (p && pp) {
        const ch = window._clip ? window._clip.length : 0;
        const cw = window._clip ? window._clip[0].length : 0;
        
        const x1 = Math.floor(pp.c * cs * sc);
        const y1 = Math.floor(pp.r * cs * sc);
        const x2 = Math.floor((pp.c + cw) * cs * sc);
        const y2 = Math.floor((pp.r + ch) * cs * sc);
        
        ctx.fillStyle = 'rgba(0, 100, 255, 0.1)';
        ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
        
        ctx.strokeStyle = '#0064ff';
        ctx.lineWidth = 2;
        ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
    }

    canvas._currentGrid = g;
};
