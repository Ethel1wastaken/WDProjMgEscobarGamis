const ctxState = {
    canvas: null,
    ctx: null,
    rows: 0,
    cols: 0,
    cellSize: 12,
    scale: 1,
};

const ensureCanvas = (rows, cols) => {
    const wrapper = document.getElementById('gridWrapper') || document.querySelector('.grid-wrapper')
    if (!wrapper) throw new Error('Missing grid wrapper element')
    let canvas = document.getElementById('gridCanvas')
    if (!canvas) {
        canvas = document.createElement('canvas')
        canvas.id = 'gridCanvas'
        canvas.style.display = 'block'
        canvas.style.background = '#ffffff'
        wrapper.appendChild(canvas)
        ctxState.canvas = canvas
        ctxState.ctx = canvas.getContext('2d')

        // helper to toggle cell and update UI
        const toggleCell = (r, c, grid) => {
            if (!grid || r < 0 || c < 0 || r >= grid.length || c >= grid[0].length) return false
            grid[r][c] = grid[r][c] === 1 ? 0 : 1
            return true
        }

        const updatePopDisplay = grid => {
            const popEl = document.getElementById('population')
            if (popEl) {
                let pop = 0
                for (let rr = 0; rr < grid.length; rr++) for (let cc = 0; cc < grid[0].length; cc++) pop += grid[rr][cc]
                popEl.innerText = `Population: ${pop}`
            }
        }

        // click to toggle cell (edit mode) or do nothing (view mode)
        canvas.addEventListener('click', e => {
            if (window.getMode && window.getMode() === 'view') return
            const rect = canvas.getBoundingClientRect()
            const x = (e.clientX - rect.left) / ctxState.scale
            const y = (e.clientY - rect.top) / ctxState.scale
            const c = Math.floor(x / ctxState.cellSize)
            const r = Math.floor(y / ctxState.cellSize)
            const grid = canvas._currentGrid
            if (!toggleCell(r, c, grid)) return
            renderGrid(grid)
            updatePopDisplay(grid)
            if (window.onGridEdited) window.onGridEdited()
        })

        // dragging: pan in view mode, brush edit in edit mode
        let dragging = false
        let lastX = 0
        let lastY = 0
        const toggledCells = new Set()
        canvas.addEventListener('mousedown', e => {
            dragging = true
            lastX = e.clientX
            lastY = e.clientY
            toggledCells.clear()
            const mode = window.getMode ? window.getMode() : 'edit'
            canvas.style.cursor = mode === 'view' ? 'grabbing' : 'crosshair'
        })
        window.addEventListener('mouseup', () => {
            dragging = false
            const mode = window.getMode ? window.getMode() : 'edit'
            canvas.style.cursor = mode === 'view' ? 'grab' : 'default'
        })
        window.addEventListener('mousemove', e => {
            if (!dragging) return
            const mode = window.getMode ? window.getMode() : 'edit'
            if (mode === 'view') {
                // pan mode
                const dx = e.clientX - lastX
                const dy = e.clientY - lastY
                lastX = e.clientX
                lastY = e.clientY
                const wrapper = canvas.parentElement
                wrapper.scrollLeft -= dx
                wrapper.scrollTop -= dy
            } else {
                // brush edit mode
                const rect = canvas.getBoundingClientRect()
                const x = (e.clientX - rect.left) / ctxState.scale
                const y = (e.clientY - rect.top) / ctxState.scale
                const c = Math.floor(x / ctxState.cellSize)
                const r = Math.floor(y / ctxState.cellSize)
                const cellKey = `${r},${c}`
                const grid = canvas._currentGrid
                // toggle only if not already toggled in this drag
                if (!toggledCells.has(cellKey) && toggleCell(r, c, grid)) {
                    toggledCells.add(cellKey)
                    renderGrid(grid)
                    updatePopDisplay(grid)
                    if (window.onGridEdited) window.onGridEdited()
                }
            }
        })

        // wheel to zoom (ctrl or meta) or normal to scroll
        canvas.addEventListener('wheel', e => {
            if (!e.ctrlKey && !e.metaKey) return
            e.preventDefault()
            const delta = e.deltaY < 0 ? 1.1 : 0.9
            const prevScale = ctxState.scale
            const newScale = Math.max(0.2, Math.min(4, prevScale * delta))
            const rect = canvas.getBoundingClientRect()
            const wrapper = canvas.parentElement
            // mouse position relative to canvas content
            const mx = (e.clientX - rect.left + wrapper.scrollLeft) / prevScale
            const my = (e.clientY - rect.top + wrapper.scrollTop) / prevScale
            ctxState.scale = newScale
            resizeCanvas(ctxState.rows, ctxState.cols)
            // adjust scroll to keep zoom focus
            const newScrollLeft = Math.max(0, mx * newScale - (e.clientX - rect.left))
            const newScrollTop = Math.max(0, my * newScale - (e.clientY - rect.top))
            wrapper.scrollLeft = newScrollLeft
            wrapper.scrollTop = newScrollTop
        }, { passive: false })
    }
    ctxState.rows = rows
    ctxState.cols = cols
    return ctxState
}

const resizeCanvas = (rows, cols) => {
    const { canvas, cellSize, scale } = ctxState
    const width = Math.max(1, Math.floor(cols * cellSize * scale))
    const height = Math.max(1, Math.floor(rows * cellSize * scale))
    canvas.width = width
    canvas.height = height
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
}

export const renderGrid = state => {
    const gridObj = state && state.pattern ? state : null
    const grid = gridObj ? gridObj.pattern : state
    const rows = grid.length
    const cols = grid[0].length
    const s = ensureCanvas(rows, cols)
    const canvas = s.canvas
    const ctx = s.ctx
    const cellSize = s.cellSize
    const scale = s.scale
    resizeCanvas(rows, cols)

    // ensure border cells are dead (kill cells reaching border)
    for (let c = 0; c < cols; c++) { grid[0][c] = 0; grid[rows-1][c] = 0 }
    for (let r = 0; r < rows; r++) { grid[r][0] = 0; grid[r][cols-1] = 0 }

    // draw
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const drawCell = (r, c) => {
        if (grid[r][c] !== 1) return
        ctx.fillStyle = '#222'
        const x = Math.floor(c * cellSize * scale)
        const y = Math.floor(r * cellSize * scale)
        const w = Math.ceil(cellSize * scale)
        const h = Math.ceil(cellSize * scale)
        ctx.fillRect(x, y, w, h)
    }

    // draw cells
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) drawCell(r, c)

    // optional grid lines (light)
    ctx.strokeStyle = 'rgba(0,0,0,0.06)'
    ctx.lineWidth = 1
    for (let r = 0; r <= rows; r++) {
        const y = Math.round(r * cellSize * scale) + 0.5
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke()
    }
    for (let c = 0; c <= cols; c++) {
        const x = Math.round(c * cellSize * scale) + 0.5
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke()
    }

    canvas._currentGrid = grid

    // update pattern info if available (accept either object with metadata or plain grid)
    const titleEl = document.getElementById('patternTitle')
    const descEl = document.getElementById('patternDescription')
    const tagsEl = document.getElementById('patternTags')
    if (titleEl) titleEl.innerText = (gridObj && gridObj.title) ? gridObj.title : 'Pattern'
    if (descEl) descEl.innerText = (gridObj && gridObj.description) ? gridObj.description : ''
    if (tagsEl) tagsEl.innerText = (gridObj && gridObj.tags) ? gridObj.tags.join(', ') : ''
}
