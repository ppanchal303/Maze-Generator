let rows, cols
let w = 80
let grid = []
let current
let stack = []
let all = []

function setup () {
  createCanvas(400, 400)
  cols = floor(width / w)
  rows = floor(height / w)
  frameRate(5)

  for (j = 0; j < rows; j++) {
    for (i = 0; i < cols; i++) {
      let cell = new Cell(i, j)
      grid.push(cell)
    }
  }

  current = grid[0]
}

function draw () {
  background(50)
  for (i = 0; i < grid.length; i++) {
    grid[i].show()
  }

  current.visited = true

  current.highlight()
  // STEP 1: Check neighbors
  let next = current.checkNeighbors()
  if (next) {
    stack.push(current)
    next.visited = true

    // STEP 2: Add

    // STEP 3: Remove walls between neighbors
    removeWalls(current, next)

    //STEP 4: Move to the next cell
    current = next
  } else if (stack.length > 0) {
    current = stack.pop()
  }
}

function index (i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1
  }
  return i + j * cols
}

function Cell (i, j) {
  this.i = i
  this.j = j
  this.walls = [true, true, true, true]
  this.visited = false

  this.checkNeighbors = function () {
    let neighbors = []

    let top = grid[index(i, j - 1)]
    let right = grid[index(i + 1, j)]
    let bottom = grid[index(i, j + 1)]
    let left = grid[index(i - 1, j)]

    if (top && !top.visited) {
      neighbors.push(top)
    }
    if (right && !right.visited) {
      neighbors.push(right)
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom)
    }
    if (left && !left.visited) {
      neighbors.push(left)
    }

    if (neighbors.length > 0) {
      let r = floor(random(0, neighbors.length))
      return neighbors[r]
    } else {
      return undefined
    }
  }

  this.highlight = function () {
    let x = this.i * w
    let y = this.j * w
    fill(0, 255, 0, 0.6 * 255)
    noStroke()
    rect(x, y, w, w)
  }

  this.show = function () {
    let x = this.i * w
    let y = this.j * w

    if (this.visited) {
      fill(0, 0, 255, 0.6 * 255)
      noStroke()
      rect(x, y, w, w)
    }

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
  }
}

function removeWalls (a, b) {
  let x = b.i - a.i
  if (x == 1) {
    a.walls[1] = false
    b.walls[3] = false
  } else if (x == -1) {
    a.walls[3] = false
    b.walls[1] = false
  }
  let y = b.j - a.j
  if (y == 1) {
    a.walls[2] = false
    b.walls[0] = false
  } else if (y == -1) {
    a.walls[0] = false
    b.walls[2] = false
  }
}
