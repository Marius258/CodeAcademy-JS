const gameboard = document.querySelector('#gameboard')
const button = document.querySelector('#btn')

let counter = 0
const selectedCards = []

button.addEventListener('click', generateGame)

function generateGame() {
     const inputValue = document.querySelector('#input').value
     if (inputValue && inputValue > 1 && inputValue % 2 == 0) {
          clearField()
          makeGrid(inputValue, inputValue)
          createCards(inputValue)
     }
}

function makeGrid(rows, cols) {
     gameboard.style.setProperty('--grid-rows', rows)
     gameboard.style.setProperty('--grid-cols', cols)
     for (i = 0; i < rows * cols; i++) {
          const cell = document.createElement('div')

          gameboard.appendChild(cell).className = 'grid-item'
     }
}

function createCards(inputValue) {
     const cards = document.querySelectorAll('.grid-item')
     const valueArray = []

     // creates the array for populating card values
     for (let i = 1; i <= (inputValue * inputValue) / 2; i++) {
          valueArray.push(i)
          valueArray.push(i)
     }

     // uses the array to add values to grid items and adds
     // the event listener for checking if cards match
     cards.forEach((card) => {
          const random = Math.floor(Math.random() * valueArray.length)
          card.setAttribute('data-value', valueArray[random])
          card.setAttribute('id', Math.floor(Math.random() * 100000))
          valueArray.splice(random, 1)

          card.addEventListener('click', gameLogic)
     })
}

function clearField() {
     while (gameboard.firstChild) {
          gameboard.removeChild(gameboard.lastChild)
     }
}

function gameLogic(e) {
     if (selectedCards.length === 2) {
          selectedCards[0].style.setProperty('--display', 'none')
          selectedCards[1].style.setProperty('--display', 'none')
          selectedCards.shift()
          selectedCards.shift()
     }

     e.target.style.setProperty('--display', 'block')

     selectedCards.push(e.target)
     if (selectedCards[0] === selectedCards[1]) {
          selectedCards.pop()
     }

     counter++
     if (selectedCards.length === 2) {
          if (checkForMatch(selectedCards)) {
               selectedCards[0].removeEventListener('click', gameLogic)
               selectedCards[1].removeEventListener('click', gameLogic)
               selectedCards.length = 0
          }
          counter = 0
     }
}

function checkForMatch(selectedCards) {
     return selectedCards[0].dataset.value === selectedCards[1].dataset.value
          ? true
          : false
}
