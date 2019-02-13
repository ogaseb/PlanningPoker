import { types } from 'mobx-state-tree'

const Board = types.model('Board', {
  value: types.maybe(types.number),
  label: types.maybe(types.string)
})

export default Board

// boardId: types.model("boardId", {value: types.maybe(types.number), label: types.maybe(types.string)}),
