// 1 uzduotis

const printBigL = (size) => {
     for (i = 0; i < size; i++) {
          if (i === size - 1) {
               console.log(`${Array(size + 1).join('L')}`)
               break
          }
          console.log('L')
     }
}

printBigL(5)

// 2 uzduotis

const printBigC = (size) => {
     for (i = 0; i < size; i++) {
          if (i === size - 1 || i === 0) {
               console.log(`${Array(size + 1).join('C')}`)
               continue
          }
          console.log('C')
     }
}

printBigC(5)

// 3 uzduotis

const nameList = document.querySelector('#namesList')

document.querySelector('#nameInput').addEventListener('blur', () => {
     const nameInput = document.querySelector('#nameInput')
     const { value } = nameInput
     if (!value) return
     const nameNode = document.createElement('span')

     nameNode.textContent = `${value}. `

     if (nameList.childElementCount >= 1) {
          nameList.childNodes.forEach((el) => {
               el.textContent = el.textContent.replace('.', ',')
          })
     }

     nameList.appendChild(nameNode)
     nameInput.value = null
})

// 9.2
// Išbandome ekraną. Sukurkite mygtuką su HTML.
// JS pasirašykite, kad mygtukas position: absolute
// ir jo lokacija - viršus, kairė. Paspaudus ant mygtuko,
// jis turi peršokti į apačią dešinę pusę. Paspaudus vėl -
// į viršų, kairę pusę. Ir taip šokinėti įstrižai per ekraną
// kiekvieno paspaudimo metu.

const btn = document.querySelector('#btn')

btn.style.position = 'absolute'
btn.style.top = '0'
btn.style.left = '0'

btn.addEventListener('click', () => {
     if (btn.style.top) {
          btn.style.top = ''
          btn.style.left = ''
          btn.style.bottom = '0'
          btn.style.right = '0'
     } else {
          btn.style.top = '0'
          btn.style.left = '0'
          btn.style.bottom = ''
          btn.style.right = ''
     }
})
