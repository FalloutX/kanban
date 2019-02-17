
const store = new Store(initState, appReducer, [], 'taskBoardStore')
const header = new Header(store)
const board = new Board(store)
const container = document.getElementById('container')

container.appendChild(header)
container.appendChild(board)


