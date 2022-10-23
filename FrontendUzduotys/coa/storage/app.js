/* 
Sukurti tris formas su keliais input field'ais:
text, number, radio, checkbox.
*/
/*
onSubmit - issaugoti input reiksmes cookies, localStorage ir
session storage.
*/
const forms = document.querySelectorAll('form')
forms.forEach((form) => {
     form.addEventListener('submit', (e) => {
          e.preventDefault()
          const formData = new FormData(form)
          const formObject = Object.fromEntries(formData)

          if (form.id === 'cookies') {
               saveToCookies(formObject)
          }
          if (form.id === 'localStorage') {
               saveToLocalStorage(formObject)
          }
          if (form.id === 'sessionStorage') {
               saveToSessionStorage(formObject)
          }
     })
})

function saveToCookies({ nameC, ageC, genderC, newsletterC = 'false' }) {}

function saveToLocalStorage({ nameL, ageL, genderL, newsletterL = 'false' }) {
     localStorage.clear()
     localStorage.setItem('name', nameL)
     localStorage.setItem('age', ageL)
     localStorage.setItem('gender', genderL)
     localStorage.setItem('newsletter', newsletterL)
}

function saveToSessionStorage({ nameS, ageS, newsletterS = 'false' }) {}

/*
Kai atsidaro puslapis, jeigu randa issaugotas reiksmes,
jas suveda i input'us.
*/

function loadFromCookies() {}

function loadFromLocalStorage() {
     const archive = {}
     const keys = Object.keys(localStorage)
     let i = keys.length
     while (i--) {
          archive[keys[i]] = localStorage.getItem(keys[i])
     }

     const form = document.querySelector('#localStorage')

     form.childNodes.forEach((node) => {
          if (node.id === 'nameL' && archive.name) {
               node.value = archive.name
          }
          if (node.id === 'ageL' && archive.age) {
               node.value = archive.age
          }
          if (archive.gender && node.value === archive.gender) {
               node.checked = true
          }
          if (node.id === 'newsletterL' && archive.newsletter === 'true') {
               node.checked = true
          }
     })
}

function loadFromSessionStorage() {}

window.onload = () => {
     loadFromLocalStorage()
}
