const numOfRolls = 100000000

const button = document.querySelector('#rollDice')
const numOfDiceInput = document.querySelector('#numOfDiceInput')
const expectedSumInput = document.querySelector('#expectedSumInput')
const display = document.querySelector('#display')
const minMaxRange = document.querySelector('#minMaxRange')

button.addEventListener('click', () => {
     probabilityDisplay(rollDice())
})

const rollDice = () => {
     const numOfDice = parseInt(numOfDiceInput.value)
     const expectedSum = parseInt(expectedSumInput.value)
     if (expectedSumInput.value !== NaN && numOfDice !== NaN) {
          return getMatchingRolls(numOfDice, expectedSum)
     }
}

// generates random sum of dice
const getDiceSum = (numOfDice) => {
     const max = numOfDice * 6
     const min = numOfDice
     return (diceSum = Math.floor(Math.random() * (max - min + 1) + min))
}

//simulates the dice throw and comapres to expected sum
const getMatchingRolls = (numOfDice, expectedSum) => {
     let matchingRolls = 0
     for (i = 0; i < numOfRolls; i++) {
          const diceSum = getDiceSum(numOfDice)
          if (expectedSum === diceSum) {
               matchingRolls += 1
          }
     }

     return matchingRolls / numOfRolls
}

// UI *******************************************************************

const probabilityDisplay = (value) => {
     const message = value * 100
     display.textContent = message + '%'
}

// sets min expected sum input
numOfDiceInput.addEventListener('change', () => {
     minExpectedSum()
})

const minExpectedSum = () => {
     const numOfDice = parseInt(numOfDiceInput.value)
     minMaxRange.textContent = `${numOfDice} - ${numOfDice * 6}`
}

// Validations *********************
const validateInputs = () => {
     const numOfDice = parseInt(numOfDiceInput.value)
     const expectedSum = parseInt(expectedSumInput.value)

     const min = numOfDice
     const max = numOfDice * 6
     return expectedSum >= min && expectedSum <= max
          ? enableButton(false)
          : enableButton(true)
}

expectedSumInput.addEventListener('change', () => {
     minExpectedSum()
     validateInputs()
})

numOfDiceInput.addEventListener('change', () => {
     validateInputs()
})

const enableButton = (value) => {
     button.disabled = value
}
