// CONCEPTUAL

let textContent = "Color bands and black blob. The wall is divided vertically into six equal bands; red; yellow; blue; orange; purple; green. In the center is a black glossy blob.";
let lines = [];
let colorPicker, weightSlider, clearButton, undoButton, linkButton;
let drawing = false;
let drawAreaSize = 600;
let drawAreaX, drawAreaY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorPicker = createColorPicker('#000000'); // Default black
  colorPicker.position(10, 460);
  
  weightSlider = createSlider(1, 10, 2);
  weightSlider.position(80, 460);

 // clear button
  clearButton = createButton('Clear Drawing');
  clearButton.position(10, 500);
  clearButton.mousePressed(() => lines = []);

 // Create undo button
  undoButton = createButton('Erase'); // changed to erase based off of function
  undoButton.position(120, 500);
  undoButton.mousePressed(() => lines.pop());

 // Create the link button
  linkButton = createButton('View Image');
  linkButton.position(10, 540);
  linkButton.mousePressed(() => window.open('https://massmoca.org/event/walldrawing901/', '_blank'));
  
  drawAreaX = windowWidth / 2;
  drawAreaY = (windowHeight - drawAreaSize) / 2;

}

function draw() {
  background(0);
  
  // Draw text content separately to ensure it is unaffected
  push();
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  
  text(textContent, 10, 180, windowWidth / 2 - 10);
  pop();
  
  fill(255);
  noStroke();
  rect(drawAreaX, drawAreaY, drawAreaSize, drawAreaSize);
  
  // Draw previous lines
  for (let l of lines) {
    stroke(l.color);
    strokeWeight(l.weight);
    line(l.x1, l.y1, l.x2, l.y2);
  }
}

function mousePressed() {
  if (mouseX > drawAreaX && mouseX < drawAreaX + drawAreaSize && mouseY > drawAreaY && mouseY < drawAreaY + drawAreaSize) {
    drawing = true;
  }
}

function mouseDragged() {
  if (drawing) {
    // Constrain both current and previous mouse positions to the drawing area boundaries.
    let constrainedMouseX = constrain(mouseX, drawAreaX, drawAreaX + drawAreaSize);
    let constrainedMouseY = constrain(mouseY, drawAreaY, drawAreaY + drawAreaSize);
    let constrainedPmouseX = constrain(pmouseX, drawAreaX, drawAreaX + drawAreaSize);
    let constrainedPmouseY = constrain(pmouseY, drawAreaY, drawAreaY + drawAreaSize);
    
    lines.push({
      x1: constrainedPmouseX, 
      y1: constrainedPmouseY,
      x2: constrainedMouseX, 
      y2: constrainedMouseY,
      color: colorPicker.value(),
      weight: weightSlider.value()
    });
  }
}

function mouseReleased() {
  drawing = false;
}
