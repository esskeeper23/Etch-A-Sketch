const sketchContainer = document.querySelector(".sketch-container")
const gridColor = document.getElementsByClassName("grid")
const gridSlider = document.getElementById("grid-slider")
const gridSize = document.querySelector(".grid-size")
let grid = 12
let color = "#000"

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

gridSlider.addEventListener("input",  function () {
    gridSize.innerHTML = gridSlider.value + " x " + gridSlider.value
    grid = gridSlider.value
    sketchGenerator()

})

export const sketchGenerator = () => {
    let size = grid ** 2
    for (let i = 0; i < size; i++) {
        const div = document.createElement("div")
        div.classList.add("grid")
        /* div.dataset.grid = `${key}` */
        div.innerHTML = ``        
        sketchContainer.appendChild(div)
    }
    sketchContainer.style.gridTemplateColumns = `repeat(${grid}, 1fr)`
}

sketchGenerator()

const changeColor = (e) => {
    
    if (e.type === "mouseover" && !mouseDown) return
    if (color === "#000") {
        e.target.style.backgroundColor = color
    }
}

for (const grid of gridColor) {
    grid.addEventListener('mouseover', changeColor)
    grid.addEventListener('mousedown', changeColor)
}