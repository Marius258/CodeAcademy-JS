const gameContainer = document.querySelector('#gameContainer')

const GAME_FIELD_SIZE = 60
const MIN_ENEMY_WIDTH = GAME_FIELD_SIZE * 0.1
const MAX_ENEMY_WIDTH = GAME_FIELD_SIZE * 0.3
const CURRENT_ENEMY_ARRAY = []

// generating the game field
const generateGameField = () => {
     gameContainer.style.setProperty('--grid-size', GAME_FIELD_SIZE)
     for (i = 0; i < GAME_FIELD_SIZE; i++) {
          for (j = 0; j < GAME_FIELD_SIZE; j++) {
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
          [planeCenterPixel.y, planeCenterPixel.x],
          [planeCenterPixel.y + 1, planeCenterPixel.x + 0],
          [planeCenterPixel.y + 2, planeCenterPixel.x + 0],
          [planeCenterPixel.y + 3, planeCenterPixel.x + 0],
          [planeCenterPixel.y + 4, planeCenterPixel.x + 0],
          [planeCenterPixel.y + 5, planeCenterPixel.x + 0],
          [planeCenterPixel.y + 6, planeCenterPixel.x + 0],
          [planeCenterPixel.y + 7, planeCenterPixel.x + 0],
          [planeCenterPixel.y + 8, planeCenterPixel.x + 0],
          [planeCenterPixel.y + 9, planeCenterPixel.x + 0],
          [planeCenterPixel.y + 8, planeCenterPixel.x + 1],
          [planeCenterPixel.y + 8, planeCenterPixel.x + 2],
          [planeCenterPixel.y + 8, planeCenterPixel.x + 3],
          [planeCenterPixel.y + 8, planeCenterPixel.x + 4],
          [planeCenterPixel.y + 2, planeCenterPixel.x + 1],
          [planeCenterPixel.y + 3, planeCenterPixel.x + 1],
          [planeCenterPixel.y + 4, planeCenterPixel.x + 1],
          [planeCenterPixel.y + 5, planeCenterPixel.x + 1],
          [planeCenterPixel.y + 6, planeCenterPixel.x + 1],
          [planeCenterPixel.y + 7, planeCenterPixel.x + 1],
          [planeCenterPixel.y + 7, planeCenterPixel.x + 2],
     ]

     planePixelArray.forEach((pixel) => {
          const amountToSubtract = getAmountToSubtract(pixel[1])
          const leftSidePixel = [pixel[0], pixel[1] - amountToSubtract * 2]
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
               `[data-y='${pixel[0]}'][data-x="${pixel[1]}"]`
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
          if (planeCenterPixel.x === 4) {
               planeCenterPixel.x++
               return
          }
          generatePlane()
     } else if (e.key === 'ArrowRight') {
          planeCenterPixel.x++
          if (planeCenterPixel.x === GAME_FIELD_SIZE - 3) {
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
     for (i = 0; i < width; i++) {
          for (j = 0; j < height; j++) {
               let pixel = [startingEnemyPixel.y + j, startingEnemyPixel.x + i]
               enemyPixelArray.push(pixel)
          }
     }
     CURRENT_ENEMY_ARRAY.push(enemyPixelArray)
     return enemyPixelArray
}

const spawnEnemy = () => {
     const enemyPixelArray = generateEnemyPixelArray()

     enemyPixelArray.forEach((pixel) => {
          let spawnEnemy = document.querySelector(
               `[data-y='${pixel[0]}'][data-x="${pixel[1]}"]`
          )
          if (spawnEnemy) {
               spawnEnemy.classList.add('enemy')
          }
     })
}

const moveEnemy = () => {}

document.addEventListener('keydown', moveThePlane)

generateGameField()
generatePlane()
spawnEnemy()

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
