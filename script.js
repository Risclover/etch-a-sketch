const defaultMode = 'default';
const defaultSize = 30;
const defaultColor = '#0b478b';
let currentMode = defaultMode;
let currentSize = defaultSize;
let currentColor = defaultColor;

function setCurrentMode(newMode) {
	activeButton(newMode);
	currentMode = newMode;
}
function setCurrentSize(newSize) {
	currentSize = newSize;
}
function setCurrentColor(newColor) {
	currentColor = newColor;
}

// Links the various HTML elements to this script
const sizeValue = document.querySelector('#sizevalue');
const sizeSlider = document.querySelector('#sizeslider');
const colorPicker = document.querySelector('#colorpicker');
const defaultBtn = document.querySelector('#default');
const partyBtn = document.querySelector('#party');
const grayBtn = document.querySelector('#grayscale');
const eraserBtn = document.querySelector('#eraser');
const clearBtn = document.querySelector('#clear');
const grid = document.querySelector('#maincontainer');

// DOM manipulations for buttons, color picker, and size slider
colorPicker.onchange = (e) => setCurrentColor(e.target.value);
defaultBtn.onclick = () => setCurrentMode('default');
partyBtn.onclick = () => setCurrentMode('party');
grayBtn.onclick = () => setCurrentMode('gray');
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

// When the size is changed, we set the grid size, update the size value (text), and reload the grid.
function changeSize(value) {
	setCurrentSize(value);
	updateSizeValue(value);
	reloadGrid();
}

// When we update the size value, the text changes to reflect.
function updateSizeValue(value) {
	sizeValue.innerHTML = `${value} x ${value}`;
}

// When we reload the grid, we ensure that we clear the grid and that the size is still the current size.
function reloadGrid() {
	clearGrid()
	makeGrid(currentSize)
}

// When we clear the grid, it clears the grid.
function clearGrid() {
	grid.innerHTML = ''
}

// Creates the base grid
function makeGrid(size) {
	grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
	grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
	for (i = 0; i < size*size; i++) {
		let square = document.createElement('div');
		square.addEventListener('mouseover', changeColor);
		grid.appendChild(square);
	}
}

// Conditions to set the color of the "pen"
function changeColor(e) {
	if (currentMode === 'party') {
		const randomR = Math.floor(Math.random() * 256);
		const randomG = Math.floor(Math.random() * 256);
		const randomB = Math.floor(Math.random() * 256);
		e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
	} else if (currentMode === 'default') {
		e.target.style.backgroundColor = currentColor;
	} else if (currentMode === 'gray') {
		e.target.style.backgroundColor = calculateGray(e);
	} else if (currentMode === 'eraser') {
		e.target.style.backgroundColor = 'white';
	}
}

// Shading mode
function calculateGray(e){
    let clr = returnRGB(e.target.style.backgroundColor);
    if(!clr || clr[1] !== clr[2] || clr[1] !== clr[3]){
        return `rgb(255, 255, 255)`;
    }
    return clr[1] <= 0 ? `rgb(255, 255, 255)` : `rgb(${clr[1]-25}, ${clr[1]-25}, ${clr[1]-25})`;
}

function returnRGB(value){
    return value.match(/rgb\(([0-9]*), ([0-9]*), ([0-9]*)\)/);
}

// Changes the buttons depending on which "mode" is active
function activeButton(newMode) {
	if (currentMode === 'party') {
		partyBtn.classList.remove('active');
	} else if (currentMode === 'default') {
		defaultBtn.classList.remove('active');
	} else if (currentMode === 'gray') {
		grayBtn.classList.remove('active');
	} else if (currentMode === 'eraser') {
		eraserBtn.classList.remove('active');
	}

	if (newMode === 'party') {
		partyBtn.classList.add('active');
	} else if (newMode === 'default') {
		defaultBtn.classList.add('active');
	} else if (newMode === 'gray') {
		grayBtn.classList.add('active');
	} else if (newMode === 'eraser') {
		eraserBtn.classList.add('active');
	}
}

// Ensures that, when we load the page, we make the grid and activate the correct mode (default).
window.onload = () => {
	makeGrid(defaultSize);
	activeButton(defaultMode);
}