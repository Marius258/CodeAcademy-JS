const gameContainer = document.querySelector('#gameContainer')

const GAME_FIELD_SIZE = 70
const MIN_ENEMY_WIDTH = GAME_FIELD_SIZE * 0.1
const MAX_ENEMY_WIDTH = GAME_FIELD_SIZE * 0.3
const CURRENT_ENEMY_ARRAY = []

// generating the game field
const generateGameField = () => {
     gameContainer.style.setProperty('--grid-size', GAME_FIELD_SIZE)
     for (let i = 0; i < GAME_FIELD_SIZE; i++) {
          for (let j = 0; j < GAME_FIELD_SIZE; j++) {
               const cell = document.createElement('div')
               cell.setAttribute('data-y', i + 1)
               cell.setAttribute('data-x', j + 1)

               gameContainer.appendChild(cell).className = 'grid-cell'
          }
     }
}

// generating the plane
const planeCenterPixel = {
     x: GAME_FIELD_SIZE / 2,
     y: GAME_FIELD_SIZE - 10,
}

function getAmountToSubtract(yValue) {
     return Math.abs(planeCenterPixel.x - yValue)
}

const generatePlanePixelArray = () => {
     const planePixelArray = [
          { y: planeCenterPixel.y, x: planeCenterPixel.x },
          { y: planeCenterPixel.y + 1, x: planeCenterPixel.x + 0 },
          { y: planeCenterPixel.y + 2, x: planeCenterPixel.x + 0 },
          { y: planeCenterPixel.y + 3, x: planeCenterPixel.x + 0 },
          { y: planeCenterPixel.y + 4, x: planeCenterPixel.x + 0 },
          { y: planeCenterPixel.y + 5, x: planeCenterPixel.x + 0 },
          { y: planeCenterPixel.y + 6, x: planeCenterPixel.x + 0 },
          { y: planeCenterPixel.y + 7, x: planeCenterPixel.x + 0 },
          { y: planeCenterPixel.y + 8, x: planeCenterPixel.x + 0 },
          { y: planeCenterPixel.y + 9, x: planeCenterPixel.x + 0 },
          { y: planeCenterPixel.y + 8, x: planeCenterPixel.x + 1 },
          { y: planeCenterPixel.y + 8, x: planeCenterPixel.x + 2 },
          { y: planeCenterPixel.y + 8, x: planeCenterPixel.x + 3 },
          { y: planeCenterPixel.y + 2, x: planeCenterPixel.x + 1 },
          { y: planeCenterPixel.y + 1, x: planeCenterPixel.x + 0 },
          { y: planeCenterPixel.y + 2, x: planeCenterPixel.x + 0 },
          { y: planeCenterPixel.y + 3, x: planeCenterPixel.x + 0 },
          { y: planeCenterPixel.y + 4, x: planeCenterPixel.x + 0 },
          { y: planeCenterPixel.y + 7, x: planeCenterPixel.x + 1 },
          { y: planeCenterPixel.y + 7, x: planeCenterPixel.x + 2 },
     ]

     planePixelArray.forEach((pixel) => {
          const amountToSubtract = getAmountToSubtract(pixel.x)
          const leftSidePixel = {
               y: pixel.y,
               x: pixel.x - amountToSubtract * 2,
          }
          planePixelArray.push(leftSidePixel)
     })

     return planePixelArray
}

// TODO: fix prev shape clearing function
const generatePlane = () => {
     //  clear previous plane position
     const previousPlaneCells = document.querySelectorAll('.plane')
     previousPlaneCells.forEach((el) => {
          el.classList.remove('plane')
     })
     //generate new plane position
     planePixelArray = generatePlanePixelArray()

     planePixelArray.forEach((pixel) => {
          let spawnPlane = document.querySelector(
               `[data-y='${pixel.y}'][data-x="${pixel.x}"]`
          )
          spawnPlane.classList.add('plane')
     })
}

// move the plane
// TODO: remove magic numbers on line 87 and 94
const moveThePlane = (e) => {
     e = e || window.event

     if (e.key === 'ArrowLeft') {
          planeCenterPixel.x--
          if (planeCenterPixel.x === 3) {
               planeCenterPixel.x++
               return
          }
          generatePlane()
     } else if (e.key === 'ArrowRight') {
          planeCenterPixel.x++
          if (planeCenterPixel.x === GAME_FIELD_SIZE - 2) {
               planeCenterPixel.x--
               return
          }
          generatePlane()
     }
}

// generating enemy objects
const generateEnemyPixelArray = () => {
     const width = getRandomInt(MIN_ENEMY_WIDTH, MAX_ENEMY_WIDTH)
     const height = getRandomInt(3, 8)

     const startingEnemyPixel = {
          x: getRandomInt(1, GAME_FIELD_SIZE - width),
          y: -Math.abs(height) + 2,
     }

     const enemyPixelArray = []

     enemyPixelArray.maxHeight = height

     for (let i = 0; i < width; i++) {
          for (let j = 0; j < height; j++) {
               let pixel = {
                    y: startingEnemyPixel.y + j,
                    x: startingEnemyPixel.x + i,
               }
               enemyPixelArray.push(pixel)
          }
     }
     CURRENT_ENEMY_ARRAY.push(enemyPixelArray)
     return enemyPixelArray
}

const drawEnemies = () => {
     const previousEnemyCells = document.querySelectorAll('.enemy')
     previousEnemyCells.forEach((el) => {
          el.classList.remove('enemy')
     })

     for (let i = 0; i < CURRENT_ENEMY_ARRAY.length; i++) {
          CURRENT_ENEMY_ARRAY[i].forEach((pixel, index) => {
               let drawEnemies = document.querySelector(
                    `[data-y='${pixel.y}'][data-x="${pixel.x}"]`
               )

               if (drawEnemies) {
                    drawEnemies.classList.add('enemy')
               }

               pixel.y = pixel.y + 1

               if (
                    pixel.y - CURRENT_ENEMY_ARRAY[i].maxHeight >
                    GAME_FIELD_SIZE
               ) {
                    CURRENT_ENEMY_ARRAY[i].splice(index, 1)
               }
          })
     }
}

// checking for collisions

const checkForCollision = () => {
     const collisionPixel = document.querySelectorAll('.plane.enemy')
     if (collisionPixel.length) {
          collisionPixel.forEach((pixel) => {
               pixel.style.backgroundColor = 'red'
          })
          return true
     }
}

// intervals

const moveEnemies = () => {
     const interval = setInterval(() => {
          drawEnemies()

          if (checkForCollision()) {
               clearInterval(interval)
               stopTheGame()
          }
     }, 20)
}

const generateEnemies = () => {
     setInterval(generateEnemyPixelArray, 600)
}

// utility functions
// function clearPreviousShapePosition(shapeToClear) {
//      const previousPlaneCells = document.querySelectorAll(`.${shapeToClear}`)
//      previousPlaneCells.forEach((el) => {
//           el.classList.remove(`.${shapeToClear}`)
//      })
// }

function getRandomInt(min, max) {
     min = Math.ceil(min)
     max = Math.floor(max)
     return Math.floor(Math.random() * (max - min + 1) + min)
}

// add event listener
const addMoveEvent = () => {
     document.addEventListener('keydown', moveThePlane, true)
}

// remove event listener

const stopTheGame = () => {
     document.removeEventListener('keydown', moveThePlane, true)
}

// game initialization

const game = () => {
     generateGameField()
     generatePlane()
     addMoveEvent()
     generateEnemies()
     moveEnemies()
}

game()
