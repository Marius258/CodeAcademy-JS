// http://localhost:3000/todos?_sort=completed&_order=asc
const container = document.querySelector('#itemList')

const getData = async () => {
     const data = await fetch(
          'http://localhost:3000/todos?_sort=completed&_order=desc'
     )
     return data.json()
}

//render the TODO list
const renderTodoList = async () => {
     const todoListData = await getData()

     todoListData.forEach((element) => {
          const article = document.createElement('article')
          article.classList.add('card', 'todo-item')

          const taskName = document.createElement('h3')
          if (element.completed) {
               taskName.classList.add('completed')
          }

          const iconContainer = document.createElement('div')
          iconContainer.classList.add('icon-container')
          const editIcon = document.createElement('i')
          editIcon.classList.add('fa-solid', 'fa-pen-to-square')
          editIcon.addEventListener('click', () => {
               showEditModal()
               populateModal(element)
          })
          const trashIcon = document.createElement('i')
          trashIcon.classList.add('fa-solid', 'fa-trash')
          trashIcon.addEventListener('click', () => {
               deleteTask(element.id)
          })

          taskName.textContent = element.task
          article.appendChild(taskName)
          iconContainer.appendChild(editIcon)
          iconContainer.appendChild(trashIcon)

          article.appendChild(iconContainer)
          container.appendChild(article)
     })
}
window.onload = renderTodoList

// add new TODO
const addTaskForm = document.querySelector('#addTaskForm')

addTaskForm.addEventListener('submit', async (e) => {
     e.preventDefault()
     const formData = new FormData(addTaskForm)
     //  formData.append('completed', 'false')
     if (formData.get('task')) {
          const payload = new URLSearchParams(formData)

          await fetch(`http://localhost:3000/todos`, {
               method: 'POST',
               body: payload,
          })
     } else {
          showError(addTaskForm)
     }
})

// delete TODO

const deleteTask = (id) => {
     fetch(`http://localhost:3000/todos/${id}`, {
          method: 'DELETE',
          headers: {
               'Content-type': 'application/json',
          },
     })
}

//edit TODO
const editTaskForm = document.querySelector('#editTaskForm')

editTaskForm.addEventListener('submit', async (e) => {
     e.preventDefault()

     const formData = new FormData(editTaskForm)
     if (formData.get('task')) {
          const taskId = document.querySelector('#taskId')
          console.log(taskId.value)
          //  const id = taskId.textContent
          const payload = new URLSearchParams(formData)

          await fetch(`http://localhost:3000/todos/${taskId.value}`, {
               method: 'PUT',
               body: payload,
          })
     } else {
          showError(editTaskForm)
     }
})

//edit modal
const modal = document.querySelector('#modal')

modal.addEventListener('click', (e) => {
     if (e.target == modal) {
          modal.classList.add('modal-disable')
     }
})

window.onclick = function (event) {}

const showEditModal = () => {
     modal.classList.remove('modal-disable')
}

const populateModal = ({ id, task, completed }) => {
     const taskId = document.querySelector('#taskId')
     const taskName = document.querySelector('#task')
     const taskCompleted = document.querySelector('#completed')
     taskId.value = id
     taskName.value = task
     if (completed === 'true') {
          taskCompleted.checked = true
     }
}

// utils

const showError = (parentElement) => {
     const children = Array.from(parentElement.children)

     const child = children.find((element) => {
          if (element.classList.contains('message')) {
               return element
          }
     })

     child.classList.add('active')
}
