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
                                                  name: 'Team 2_1_1_4_1',
                                                  id: 12,
                                                  children: [],
                                             },
                                             {
                                                  name: 'Team 2_1_1_4_1',
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
const container = document.querySelector('.container')
const display = document.createElement('ul')
container.appendChild(display)

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
          const child = {
               name,
               id,
               children: [],
          }
          const ul = document.createElement('ul')
          const li = document.createElement('li')
          li.textContent = name
          li.setAttribute('id', id)
          ul.appendChild(li)
          item.appendChild(ul)
     }
}

// for some reason js thinks that null is an object xd
const isObject = (obj) => {
     if (obj === null) {
          return false
     }
     return typeof obj === 'object'
}

// A recursive rendering of a nested object
const renderWithRecursion = (list, father) => {
     for (let i = 0; i < list.length; i++) {
          const li = document.createElement('li')
          li.textContent = list[i].name
          li.setAttribute('id', list[i].id)

          father.appendChild(li)
          addItemEvent(li.id)

          if (isObject(list[i].children)) {
               if (!list[i].children.length) {
                    renderWithRecursion(list[i].children, father)
                    continue
               }
               const ul = document.createElement('ul')
               li.appendChild(ul)
               renderWithRecursion(list[i].children, ul)
          }
     }
}

renderWithRecursion(list, display)

// B
const renderNoRecursion = (list) => {}

renderNoRecursion(list)
