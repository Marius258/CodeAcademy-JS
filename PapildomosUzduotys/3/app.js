const numOfRolls = 100000
const numOfDice = 10
const expectedSum = 60

//calculates the total sum of all dice version 2
const getDiceSum = () => {
     const max = numOfDice * 6
     const min = numOfDice
     const diceSum = Math.floor(Math.random() * (max - min + 1) + min)
     return diceSum
}

const getMatchingRolls = () => {
     let matchingRolls = 0
     for (i = 0; i < numOfRolls; i++) {
          let diceSum = getDiceSum()
          if (diceSum === expectedSum) {
               matchingRolls += 1
          }
     }
     return matchingRolls
}

const calculateProbability = () => {
     const matchingRolls = getMatchingRolls()
     return matchingRolls / numOfRolls
}

console.log(calculateProbability() * 100)

// used to debug random dice sum generator
// let hits = 0

// for (i = 0; i < 1000; i++) {
//      let max = 10
//      let dice = getDiceSum2()
//      if (dice <= max) {
//           hits += 1
//      }
// }
// console.log(`hits ${hits}`)
// *****************************************************************
// calculates the total sum of all dice version 1
// generates a single dice
// const generateDice = () => {
//      return (dice = Math.floor(Math.random() * 6) + 1)
// }
// const getDiceSum = () => {
//      let diceSum = 0
//      for (i = 0; i < numOfDice; i++) {
//           diceSum += generateDice()
//      }
//      return diceSum
// }
