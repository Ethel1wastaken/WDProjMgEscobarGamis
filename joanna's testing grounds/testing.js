const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const viewportTransform = {
      x: 0,
      y: 0,
      scale: 1
    }

    const drawRect = (x, y, width, height, color) => {
      ctx.fillStyle = color
      ctx.fillRect(x, y, width, height)
    }

    const render = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(viewportTransform.scale, 0, 0, viewportTransform.scale, viewportTransform.x, viewportTransform.y);
    }

    let previousX = 0, previousY = 0;

    const updatePanning = (e) => {
      const localX = e.clientX;
      const localY = e.clientY;

      viewportTransform.x += localX - previousX;
      viewportTransform.y += localY - previousY;

      previousX = localX;
      previousY = localY;
    }

    const updateZooming = (e) => {

      const oldScale = viewportTransform.scale;
      const oldX = viewportTransform.x;
      const oldY = viewportTransform.y;

      const localX = e.clientX;
      const localY = e.clientY;

      const previousScale = viewportTransform.scale;

      const newScale = viewportTransform.scale += e.deltaY * -0.01;

      const newX = localX - (localX - oldX) * (newScale / previousScale);
      const newY = localY - (localY - oldY) * (newScale / previousScale);

      viewportTransform.x = newX;
      viewportTransform.y = newY;
      viewportTransform.scale = newScale;
    }

    const onMouseMove = (e) => {
      updatePanning(e)

      render()

      console.log(e)
    }

    const onMouseWheel = (e) => {
      updateZooming(e)

      render()

      console.log(e)
    }

    canvas.addEventListener("wheel", onMouseWheel);

    canvas.addEventListener("mousedown", (e) => {
      previousX = e.clientX;
      previousY = e.clientY;

      canvas.addEventListener("mousemove", onMouseMove);
    })

    canvas.addEventListener("mouseup", (e) => {
      canvas.removeEventListener("mousemove", onMouseMove);
    })

    
    render()

render();

const gridSize = 25;
const squareSize = canvas.width / gridSize;
const grid = [];

for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        grid.push({
            x: i*squareSize,
            y: j*squareSize,
            color: "blue",
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
    clickedSquare.color = clickedSquare.color === "blue" ? "green" : "blue";
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