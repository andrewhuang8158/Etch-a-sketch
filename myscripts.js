const default_color = '#333333'
const default_mode = 'color'
const default_size = 16

let currentColor = default_color
let currentMode = default_mode
let currentSize = default_size

const container = document.querySelector('grid')



function setCurrentColor(newColor) {
    currentColor = newColor
}

function setCurrentMode (newMode) {
    activateButton(newMode)
    currentMode = newMode
}

function setCurrentSize(newSize) { 
    currentSize = newSize
}

window.onload=() => {
const colorPicker = document.querySelector('colorPicker')
const colorBtn = document.querySelector('colorBtn')
const rainbowBtn = document.querySelector('rainbowBtn')
const clearBtn = document.querySelector('clearBtn')
const sizeValue = document.querySelector('sizeValue')
const sizeSlider = document.querySelector('sizeSlider')
const grid = document.querySelector('grid')
}

colorPicker.onchange = (e) => setCurrentColor(e.target.value)
colorBtn.onclick = (e) => setCurrentMode('color')
rainbowBtn.onclick = (e) => setCurrentMode('rainbow')
clearBtn.onclick = (e) => reloadGrid()
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)


let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


function changeSize (value) {
    setCurrentSize(value)
    updateSizeValue(value)
    reloadGrid()
}

function updateSizeValue(value) {
    sizeValue.innerText = `${value} x ${value}`
}

function reloadGrid() {
    clearGrid()
    setupGrid(currentSize)
}

function clearGrid() {
    grid.innerHTML = ''
}

// function makeRows(rows,cols) {
//     grid.style.setProperty ('--grid-rows' , rows )
//     grid.style.setProperty ('--grid-cols' , cols )
//     for (c = 0; c < (rows * cols); c++) {
//         let cell = document.createElement ('grid')
//         cell.innerText = (c+1)
//         container.appendChild(cell).className = 'grid-item' 
//     }
//}
function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr )`

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('grid')
        gridElement.classList.add("grid-element")
        gridElement.addEventListener('mouseover', changeColor)
        gridElement.addEventListener('mousedown', changeColor)
        grid.appendChild(gridElement)
    }
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random()*256)
        const randomG = Math.floor(Math.random()*256)
        const randomB = Math.floor(Math.random()*256)
        e.target.style.backgroundColor = `rgb(${randomR},${randomG},${randomB})` 

    }  if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor
        
    }   if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#fefefe'
      }
    }

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
        rainbowBtn.classList.remove('active')
    } if (currentMode === 'color') {
        colorBtn.classList.remove('active') 
    }

    if (newMode === 'rainbow') {
        rainbowBtn.classList.add ('active') 
    } if (newMode === 'color') {
        colorBtn.classList.add ('active') 
    }
}

window.onload = () => {
    setupGrid(default_size)
    activateButton(default_mode)
  }