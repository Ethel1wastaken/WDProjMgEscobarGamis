const canvas = document.getElementById('canvas') //gets html element
const ctx = canvas.getContext('2d') //2D drawing context

if (!ctx) //checks if supported by the browser
  alert("Canvas 2D context is not supported by your browser.");

//Grid Stuff - joanna
const gridSize = 50; //size of each cell
const canvasWidth = canvas.width;  
const canvasHeight = canvas.height;  

const rows = canvasHeight / gridSize;
const cols = canvasWidth / gridSize;

//grid styling
ctx.strokeStyle = '#6a99ffff';
ctx.lineWidth = 5;


console.log(`Grid: ${cols} columns x ${rows} rows`); // Optional: Debug info  

// horizontal lines
for (let y = gridSize; y < canvasHeight; y += gridSize) {  
    ctx.beginPath(); // Start a new path  
    ctx.moveTo(0, y); // Move pen to (left edge, current y)  
    ctx.lineTo(canvasWidth, y); // Draw line to (right edge, current y)  
    ctx.stroke(); // Render the line  
}

//vertical lines
for (let x = gridSize; x < canvasWidth; x += gridSize) {  
    ctx.beginPath();  
    ctx.moveTo(x, 0); // Move pen to (current x, top edge)  
    ctx.lineTo(x, canvasHeight); // Draw line to (current x, bottom edge)  
    ctx.stroke();  
}

//interactive grids
// Add click interaction  
canvas.addEventListener('click', (e) => {  
    const rect = canvas.getBoundingClientRect();  
    const mouseX = e.clientX - rect.left;  
    const mouseY = e.clientY - rect.top;  
 
    // Calculate cell coordinates  
    const cellX = Math.floor(mouseX / gridSize);  
    const cellY = Math.floor(mouseY / gridSize);  
 
    alert(`Clicked cell: (${cellX}, ${cellY})`);  
});  

const viewportTransform = {
      x: 0,
      y: 0,
      scale: 1
    }

    // From here on, everything we'll write will go below 👇
    const drawRect = (x, y, width, height, color) => {
      ctx.fillStyle = color
      ctx.fillRect(x, y, width, height)
    }

    const render = () => {
      // New code 👇
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(viewportTransform.scale, 0, 0, viewportTransform.scale, viewportTransform.x, viewportTransform.y);
      // New Code 👆
      
      //insert shapes
      drawRect(0, 0, 100, 100, 'red');
      drawRect(200, 200, 100, 100, 'blue');

      ctx.fillStyle = 'blue';
      ctx.fillRect(60, 60, 50, 50);

      ctx.fillStyle = 'green';
      ctx.beginPath();
      ctx.arc(120, 120, 20, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'purple';
      ctx.beginPath();
      ctx.rect(180, 180, 50, 50);
      ctx.stroke();
    }

    // We need to keep track of our previous mouse position for later
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