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

// for some reason js thinks that null is an object xd
const isObject = (obj) => {
     if (obj === null || JSON.stringify(obj) === '[]') {
          return false
     }
     return typeof obj === 'object'
}

// A recursive rendering of a nested object
const renderWithRecursion = (list, father) => {
     // loops through every top level element in the object array
     for (let item in list) {
          // checks if current list item is an object
          if (isObject(list[item])) {
               // if yes then it creates a fresh ul
               const ul = document.createElement('ul')
               // appends it to the current father element
               father.appendChild(ul)
               // calls the function again with the found object and new father element
               renderWithRecursion(list[item], ul)
          } else {
               // adds item to current UL if its name === name
               if (item === 'name') {
                    const li = document.createElement('li')
                    li.textContent = list[item]
                    father.appendChild(li)
               }
          }
     }
}

renderWithRecursion(list, display)

// B
const renderNoRecursion = (list) => {}

renderNoRecursion(list)
