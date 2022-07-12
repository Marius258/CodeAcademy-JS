const numOfRolls = 100000

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
     const diceArray = []
     for (i = 0; i < numOfDice; i++) {
          const roll = Math.floor(Math.random() * 6) + 1
          diceArray.push(roll)
     }
     return diceArray.reduce((acc, curr) => acc + curr, 0)
}

//simulates the dice throw and comapres to expected sum
const getMatchingRolls = (numOfDice, expectedSum) => {
     let matchingRolls = 0
     // console.log(`number of rolls: ${numOfRolls}`)

     let i = 0
     while (i !== numOfRolls) {
          let diceSum = getDiceSum(numOfDice)

          if (expectedSum === diceSum) {
               matchingRolls += 1
          }

          i++
     }

     // why does this loop not work
     // for(i = 0; i < numOfRolls; i++){
     // let diceSum = getDiceSum(numOfDice)
     // console.log(`dice sum: ${diceSum}`)
     // console.log(`expected sum: ${expectedSum}`)
     // console.log(`current roll: ${i + 1}`)
     // if (expectedSum === diceSum) {
     //      matchingRolls += 1
     // }
     // console.log(`matching rolls: ${matchingRolls}`)
     // }

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
