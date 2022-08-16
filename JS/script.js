const sketchContainer = document.querySelector(".sketch-container")
const eraserButton = document.querySelector("#eraser")
const gridSize = document.getElementsByClassName("grid")
const gridSlider = document.getElementById("grid-slider")
const sliderSize = document.querySelector(".grid-size")
const clearGrid = document.querySelector("#clear")
const selectColor = document.querySelector("#color")
const rainbow = document.querySelector("#rainbow")
const defaultColor = "#000"
let rgb = ""
let grid = 12
let color = defaultColor
let eraserColor = "#FFF"

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)
selectColor.oninput = (e) => {
    color = e.target.value
    rainbow.classList.remove("active")
    eraserButton.classList.remove("active")
}
gridSlider.onmousemove = (e) => updateSliderValue(e.target.value)
gridSlider.onchange = (e) => updateGrid(e.target.value)

const updateSliderValue = (value) => {
    sliderSize.innerHTML = `${value} x ${value}`
}

const clear = () => {

    rainbow.classList.remove("active")
    eraserButton.classList.remove("active")
    for (const grid of gridSize) {
        grid.style.backgroundColor = eraserColor
    }

    color = defaultColor
}

clearGrid.addEventListener("click", clear)

const eraser = () => {
    color = eraserColor;
    eraserButton.classList.add("active")
    rainbow.classList.remove("active")
    return color;
}

eraserButton.addEventListener("click", eraser)

const updateGrid = (value) => {
    grid = value

    sketchGenerator()
}

const rainbowColor = () => {
    eraserButton.classList.remove("active")
    rainbow.classList.add("active")
    color = "rainbow"
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    rgb = `rgb(${r}, ${g}, ${b})`
    return rgb;
}

rainbow.addEventListener("click", rainbowColor)

const changeColor = (e) => {
    
    if (e.type === "mouseover" && !mouseDown) return
    if (color === "#000") {
        e.target.style.backgroundColor = color
    }else if (color === "#FFF") {
        e.target.style.backgroundColor = color
    }else if (color === "rainbow") {
        e.target.style.backgroundColor = rainbowColor(rgb)
    }else {
        e.target.style.backgroundColor = color
    }

}

export const sketchGenerator = () => {
    let size = grid ** 2
    for (let i = 0; i < size; i++) {
        const div = document.createElement("div")
        div.classList.add("grid")  
        div.addEventListener('mouseover', changeColor)
        div.addEventListener('mousedown', changeColor)
        sketchContainer.appendChild(div)
    }
    sketchContainer.style.gridTemplateColumns = `repeat(${grid}, 1fr)`
    sketchContainer.style.gridTemplateRows = `repeat(${grid}, 1fr)`
    clear()
}

sketchGenerator()


