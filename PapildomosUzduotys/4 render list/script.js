const list = [
     { name: 'Team 1', id: 1, children: [] },
     {
          name: 'Team 2',
          id: 2,
          children: [
               {
                    name: 'Team 2_1',
                    id: 3,
                    children: [
                         {
                              name: 'Team 2_1_1',
                              id: 4,
                              children: [
                                   { name: 'Team 2_1_1_1', id: 5 },
                                   {
                                        name: 'Team 2_1_1_2',
                                        id: 6,
                                        children: null,
                                   },
                                   {
                                        name: 'Team 2_1_1_3',
                                        id: 7,
                                        children: [
                                             { name: 'Team 2_1_1_3_1', id: 8 },
                                             {
                                                  name: 'Team 2_1_1_3_2',
                                                  id: 9,
                                                  children: [],
                                             },
                                        ],
                                   },
                                   {
                                        name: 'Team 2_1_1_4',
                                        id: 10,
                                        children: [
                                             {
                                                  name: 'Team 2_1_1_4_1',
                                                  id: 11,
                                                  children: [],
                                             },
                                             {
                                                  name: 'Team 2_1_1_4_2',
                                                  id: 12,
                                                  children: [],
                                             },
                                             {
                                                  name: 'Team 2_1_1_4_3',
                                                  id: 13,
                                                  children: [],
                                             },
                                        ],
                                   },
                              ],
                         },
                    ],
               },
          ],
     },
]

//utily functions and event listeners

// add item event listeners
const addItemEvent = (id) => {
     const item = document.getElementById(id)
     item.addEventListener('click', (e) => {
          e.stopPropagation()
          addChild(item)
     })
}

// add item function
const addChild = (item) => {
     const name = prompt('Enter the name of the item you want to add:')
     if (name.length) {
          const id = Math.floor(Math.random() * 99999999)

          const ul = document.createElement('ul')
          const li = document.createElement('li')
          li.textContent = name
          li.setAttribute('id', id)
          ul.appendChild(li)
          item.appendChild(ul)
          addItemEvent(id)
     }
}

// for some reason js thinks that null is an object xd
const hasChildren = (obj) => {
     if (
          obj === null ||
          obj === undefined ||
          (Array.isArray(obj) && !obj.length)
     ) {
          return false
     }
     return typeof obj === 'object'
}

// console.log(hasChildren([]))

// A recursive rendering
const containerRecursion = document.querySelector('.container-recursion')
const displayRecursion = document.createElement('ul')
containerRecursion.appendChild(displayRecursion)

const renderWithRecursion = (list, father) => {
     for (let i = 0; i < list.length; i++) {
          const li = document.createElement('li')
          li.textContent = list[i].name
          li.setAttribute('id', list[i].id)

          father.appendChild(li)
          addItemEvent(li.id)

          if (hasChildren(list[i].children)) {
               if (!list[i].children.length) {
                    console.log('dab')
                    renderWithRecursion(list[i].children, father)
                    continue
               }
               const ul = document.createElement('ul')
               li.appendChild(ul)
               renderWithRecursion(list[i].children, ul)
          }
     }
}

renderWithRecursion(list, displayRecursion)

// B iterative rendering

const container = document.querySelector('.container-stack')
const displayStack = document.createElement('ul')
container.appendChild(displayStack)

const renderWithNoRecursion = (list, father) => {
     const stack = []
     const fatherStack = []

     for (let i = 0; i < list.length; i++) {
          stack.push(list[i])
          fatherStack.push(father)

          while (stack.length > 0) {
               let current = stack.pop()
               let currentFather = fatherStack[fatherStack.length - 1]

               const li = document.createElement('li')
               li.textContent = current.name
               li.setAttribute('id', parseInt(current.id) + 100)

               if (!hasChildren(current.children)) {
                    currentFather.appendChild(li)
                    addItemEvent(li.id)

                    fatherStack.pop()
                    continue
               }

               if (hasChildren(current.children)) {
                    const ul = document.createElement('ul')

                    currentFather.appendChild(li)
                    li.appendChild(ul)

                    for (let i = current.children.length - 1; i >= 0; i--) {
                         stack.push(current.children[i])
                         fatherStack.push(ul)
                    }
               }
          }
     }
}

renderWithNoRecursion(list, displayStack)
