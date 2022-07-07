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

const isObject = (obj) => {
     if (obj === null) {
          return false
     }
     return typeof obj === 'object'
}

// A
const renderWithRecursion = (list, father) => {
     for (let item in list) {
          if (isObject(list[item])) {
               const ul = document.createElement('ul')
               father.appendChild(ul)
               renderWithRecursion(list[item], ul)
          } else {
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
// const renderNoRecursion = (list) => {}

// renderNoRecursion(list)
