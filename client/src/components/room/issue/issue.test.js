import React from "react"
import {Issue} from "./issue"
import { shallow} from "enzyme";

describe("Issue", () => {
  it("renders without errors", () => {
    const store = {
      roomStore: {cardsAreTheSame: false, cardResults: []},
      userStore: {admin: true},
      jiraStore: {activeBoardFetching: false, activeBoard: {issues: []}}
    }

    const component = shallow(<Issue store={store}/>)
    expect(component).toMatchSnapshot()
  })
})
