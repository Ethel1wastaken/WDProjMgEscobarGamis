export const renderGrid = state => {
    const mainEl = document.querySelector('main')
    let gridEl = document.getElementById('grid')
    const rows = state.length
    const cols = state[0].length
    if (!gridEl) {
        gridEl = document.createElement('section')
        gridEl.id = 'grid'
        mainEl.appendChild(gridEl)
        gridEl._cells = new Array(rows)
        for (let r = 0; r < rows; r++) {
            const row = document.createElement('div')
            row.classList.add('row')
            gridEl.appendChild(row)
            gridEl._cells[r] = new Array(cols)
            for (let c = 0; c < cols; c++) {
                const cell = document.createElement('div')
                cell.classList.add('cell')
                cell.dataset.r = String(r)
                cell.dataset.c = String(c)
                row.appendChild(cell)
                cell.addEventListener('click', () => {
                    const grid = gridEl._currentGrid
                    if (!grid) return
                    grid[r][c] = grid[r][c] === 1 ? 0 : 1
                    cell.classList.toggle('alive', grid[r][c] === 1)
                    const popEl = document.getElementById('population')
                    if (popEl) {
                        let pop = 0
                        for (let rr = 0; rr < grid.length; rr++) for (let cc = 0; cc < grid[0].length; cc++) pop += grid[rr][cc]
                        popEl.innerText = `Population: ${pop}`
                    }
                })
                gridEl._cells[r][c] = cell
            }
        }
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) gridEl._cells[r][c].classList.toggle('alive', state[r][c] === 1)
        gridEl._currentGrid = state
    } else {
        const cells = gridEl._cells
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells[r][c].classList.toggle('alive', state[r][c] === 1)
        gridEl._currentGrid = state
    }
}
