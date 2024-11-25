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
    grid[i].show()
  }
}

function Cell (i, j) {
  this.i = i
  this.j = j
  this.walls = [true, true, true, true]

  this.show = function () {
    let x = this.i * w
    let y = this.j * w
    stroke(255)
    if (this.walls[0]) {
      line(x, y, x + w, y)
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w)
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w)
    }
    if (this.walls[3]) {
      line(x, y + w, x, y)
    }
    // noFill()
    // rect(x, y, w, w)
  }
}
