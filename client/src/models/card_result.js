import { types } from "mobx-state-tree"

const Card = types.model("Card", {
  userName: types.string,
  cardValue: types.number,
  color: types.maybe(types.string)
})

export default Card
