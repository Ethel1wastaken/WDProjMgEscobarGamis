const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const squareSize = canvas.width / gridSize;
const grid = [];

for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        grid.push({
            x: i*squareSize,
            y: j*squareSize,
            color: "red",
        })
    }
}

function drawGrid () {
    for (const square of grid) {
        ctx.fillStyle = square.color;
        ctx.strokeStyle = "black";
        ctx.fillRect(square.x, square.y, squareSize, squareSize);
        ctx.strokeRect(square.x, square.y, squareSize, squareSize);
    }
}

function toggleColor(clickedSquare) {
    clickedSquare.color = clickedSquare.color === "red" ? "green" : "red";
}

canvas.addEventListener("click", function(event) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    const clickedSquare = grid.find(
        (square) =>
            mouseX >= square.x &&
            mouseX <= square.x + squareSize &&
            mouseY >= square.y &&
            mouseY <= square.y + squareSize
    );

    if (clickedSquare) {
        toggleColor(clickedSquare);
    }

    drawGrid();
});

drawGrid();