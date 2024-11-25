let rows, cols
let w = 40
let grid = []

function setup () {
  createCanvas(400, 400)
  cols = floor(width / w)
  rows = floor(height / w)

  for (j = 0; j < rows; j++) {
    for (i = 0; i < cols; i++) {
      let cell = new Cell(i, j)
      grid.push(cell)
    }
  }
}

function draw () {
  background(51)
  for (i = 0; i < grid.length; i++) {
    // console.log(i)
    grid[i].show()
    // console.log(grid)
  }
}

function Cell (i, j) {
  this.i = i
  this.j = j

  this.show = function () {
    let x = this.i * w
    let y = this.j * w
    stroke(255)
    noFill()
    rect(x, y, w, w)
  }
}
