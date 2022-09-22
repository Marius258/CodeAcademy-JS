const gameContainer = document.querySelector('#gameContainer')

// generating the game field
const gameFieldSize = 50

const generateGameField = (gameFieldSize) => {
     gameContainer.style.setProperty('--grid-size', gameFieldSize)
     for (i = 0; i < gameFieldSize; i++) {
          for (j = 0; j < gameFieldSize; j++) {
               const cell = document.createElement('div')
               cell.setAttribute('data-y', i + 1)
               cell.setAttribute('data-x', j + 1)

               gameContainer.appendChild(cell).className = 'grid-cell'
          }
     }
}

// generating the plane
const centerPixel = {
     x: gameFieldSize / 2,
     y: 40,
}

function getAmountToSubtract(yValue) {
     return Math.abs(centerPixel.x - yValue)
}

const generatePlanePixelArray = () => {
     const planePixelArray = [
          [centerPixel.y, centerPixel.x],
          [centerPixel.y + 1, centerPixel.x + 0],
          [centerPixel.y + 2, centerPixel.x + 0],
          [centerPixel.y + 3, centerPixel.x + 0],
          [centerPixel.y + 4, centerPixel.x + 0],
          [centerPixel.y + 5, centerPixel.x + 0],
          [centerPixel.y + 6, centerPixel.x + 0],
          [centerPixel.y + 7, centerPixel.x + 0],
          [centerPixel.y + 8, centerPixel.x + 0],
          [centerPixel.y + 9, centerPixel.x + 0],
          [centerPixel.y + 8, centerPixel.x + 1],
          [centerPixel.y + 8, centerPixel.x + 2],
          [centerPixel.y + 8, centerPixel.x + 3],
          [centerPixel.y + 8, centerPixel.x + 4],
          [centerPixel.y + 2, centerPixel.x + 1],
          [centerPixel.y + 3, centerPixel.x + 1],
          [centerPixel.y + 4, centerPixel.x + 1],
          [centerPixel.y + 5, centerPixel.x + 1],
          [centerPixel.y + 6, centerPixel.x + 1],
          [centerPixel.y + 7, centerPixel.x + 1],
          [centerPixel.y + 7, centerPixel.x + 2],
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
          let spawn = document.querySelector(
               `[data-y='${pixel[0]}'][data-x="${pixel[1]}"]`
          )
          spawn.classList.add('plane')
     })
}

// move the plane
// TODO: remove magic numbers
const moveThePlane = (e) => {
     e = e || window.event

     if (e.key === 'ArrowLeft') {
          centerPixel.x--
          if (centerPixel.x === 4) {
               centerPixel.x++
               return
          }
          generatePlane()
     } else if (e.key === 'ArrowRight') {
          centerPixel.x++
          if (centerPixel.x === gameFieldSize - 3) {
               centerPixel.x--
               return
          }
          generatePlane()
     }
}

document.addEventListener('keydown', moveThePlane)

generateGameField(gameFieldSize)
generatePlane()

// utility functions
// function clearPreviousShapePosition(shapeToClear) {
//      const previousPlaneCells = document.querySelectorAll(`.${shapeToClear}`)
//      previousPlaneCells.forEach((el) => {
//           el.classList.remove(`.${shapeToClear}`)
//      })
// }
