import { types } from 'mobx-state-tree'

const Card = types.model('Card', {
  userName: types.string,
  cardValue: types.union(types.maybe(types.number), types.maybe(types.string)),
  color: types.maybe(types.string)
});

export default Card
