class Payment {
     #fee = 1.01
     constructor(amount) {
          this.amount = amount
     }

     calculateAmountWithFee = () => {
          return this.amount * this.#fee
     }
}

const generatePaymentArray = () => {
     const array = []
     for (let i = 0; i < 1000; i++) {
          const amount = Math.random() * 1000 + 1
          const payment = new Payment(amount.toFixed(2))
          array.push(payment)
     }
     return array
}

const paymentArray = generatePaymentArray()

// ****************************************************
paymentArray.sort(
     (a, b) => a.calculateAmountWithFee() - b.calculateAmountWithFee()
)

// console.log('lowest')
// for (let i = 0; i < 15; i++) {
//      console.log(paymentArray[i])
// }
// console.log('-----------')
// console.log('biggest')
// for (let i = paymentArray.length - 1; i > paymentArray.length - 15; i--) {
//      console.log(paymentArray[i])
// }

// const findMedian = () => {
//      let total = 0
//      for (let i = 0; i < paymentArray.length - 1; i++) {
//           total += paymentArray[i].calculateAmountWithFee()
//      }
//      return total / paymentArray.length
// }

// console.log(`median: ${findMedian()}`)
// ****************************************************

const list = document.querySelector('#list')

const paginate = (array, pageSize, pageNumber) => {
     return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
}

const displayList = (pageNumber) => {
     const arrayToDisplay = paginate(paymentArray, 20, pageNumber)
     for (let i = 0; i < 20; i++) {
          const li = document.createElement('li')
          li.textContent = arrayToDisplay[i].calculateAmountWithFee().toFixed(2)
          list.appendChild(li)
     }
}

let page = 1
const nextBtn = document.querySelector('#next')
nextBtn.addEventListener('click', () => {
     while (list.lastChild) {
          list.removeChild(list.lastChild)
     }
     page += 1
     displayList(page)
})

const prevBtn = document.querySelector('#prev')
prevBtn.addEventListener('click', () => {
     while (list.lastChild) {
          list.removeChild(list.lastChild)
     }
     if (page > 1) {
          page -= 1
          displayList(page)
     } else {
          displayList(1)
     }
})

displayList(1)
