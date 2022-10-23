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

function setCookie(cname, cvalue) {
     const d = new Date()
     d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000)
     let expires = 'expires=' + d.toUTCString()
     document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

function saveToCookies(formObject) {
     for (const [key, value] of Object.entries(formObject)) {
          setCookie(key, value)
     }
}

function saveToLocalStorage({ nameL, ageL, genderL, newsletterL = 'false' }) {
     localStorage.clear()
     localStorage.setItem('name', nameL)
     localStorage.setItem('age', ageL)
     localStorage.setItem('gender', genderL)
     localStorage.setItem('newsletter', newsletterL)
}

function saveToSessionStorage({ nameS, ageS, genderS, newsletterS = 'false' }) {
     sessionStorage.clear()
     sessionStorage.setItem('name', nameS)
     sessionStorage.setItem('age', ageS)
     sessionStorage.setItem('gender', genderS)
     sessionStorage.setItem('newsletter', newsletterS)
}

/*
Kai atsidaro puslapis, jeigu randa issaugotas reiksmes,
jas suveda i input'us.
*/

function loadFromCookies() {
     const stringArray = document.cookie.split(';')
     let archive = {}

     stringArray.forEach((string) => {
          const key = string.split('=')[0].replace(' ', '')
          const value = string.split('=')[1]
          const object = { [key]: value }
          archive = { ...archive, [key]: value }
     })

     const form = document.querySelector('#cookies')

     form.childNodes.forEach((node) => {
          if (node.id === 'nameC' && archive.nameC) {
               node.value = archive.nameC
          }
          if (node.id === 'ageC' && archive.ageC) {
               node.value = archive.ageC
          }
          if (archive.genderC && node.value === archive.genderC) {
               node.checked = true
          }
          if (node.id === 'newsletterC' && archive.newsletterC === 'true') {
               node.checked = true
          }
     })
}

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

function loadFromSessionStorage() {
     const archive = {}
     const keys = Object.keys(sessionStorage)
     let i = keys.length
     while (i--) {
          archive[keys[i]] = sessionStorage.getItem(keys[i])
     }
     const form = document.querySelector('#sessionStorage')

     form.childNodes.forEach((node) => {
          if (node.id === 'nameS' && archive.name) {
               node.value = archive.name
          }
          if (node.id === 'ageS' && archive.age) {
               node.value = archive.age
          }
          if (archive.gender && node.value === archive.gender) {
               node.checked = true
          }
          if (node.id === 'newsletterS' && archive.newsletter === 'true') {
               node.checked = true
          }
     })
}

window.onload = () => {
     loadFromCookies()
     loadFromLocalStorage()
     loadFromSessionStorage()
}
