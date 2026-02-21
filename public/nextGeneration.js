
export const nextGeneration = (state, out) => {
    const rows = state.length
    const cols = state[0].length
    let allocate = false
    if (!out) { out = new Array(rows); allocate = true }
    for (let r = 0; r < rows; r++) {
        if (allocate) out[r] = new Array(cols)
        for (let c = 0; c < cols; c++) out[r][c] = checkCell(state, r, c)
    }
    return out
}

export const checkCell = (state, row, col) => {
    const rows = state.length
    const cols = state[0].length
    let aliveNeighbors = 0
    for (let r = row - 1; r <= row + 1; r++) {
        if (r < 0 || r >= rows) continue
        for (let c = col - 1; c <= col + 1; c++) {
            if (c < 0 || c >= cols) continue
            if (r === row && c === col) continue
            if (state[r][c] === 1) aliveNeighbors++
        }
    }
    if (state[row][col] === 1) {
        if (aliveNeighbors < 2) return 0
        if (aliveNeighbors > 3) return 0
        return 1
    }
    if (aliveNeighbors === 3) return 1
    return 0
}

