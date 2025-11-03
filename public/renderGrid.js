export function renderGrid(state) {
    const mainEl = document.querySelector("main");
    const existing = document.getElementById("grid");
    if (existing) existing.remove();

    const gridEl = document.createElement("section");
    gridEl.id = "grid";
    mainEl.appendChild(gridEl);

    const rows = state.length;
    const cols = state[0].length;

    for (let r = 0; r < rows; r++) {
        const row = document.createElement("div");
        row.classList.add("row");
        gridEl.appendChild(row);

        for (let c = 0; c < cols; c++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            cell.dataset.r = String(r);
            cell.dataset.c = String(c);
            row.appendChild(cell);

            if (state[r][c] === 1) {
                cell.classList.add("alive");
            }

            cell.addEventListener('click', () => {
                state[r][c] = state[r][c] === 1 ? 0 : 1;
                cell.classList.toggle('alive', state[r][c] === 1);
            });
        }
    }
}
