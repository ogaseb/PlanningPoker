import React from "react"
import {UserList} from "./user_list"
import { shallow} from "enzyme";


describe("HistoryList", () => {
  it("renders without errors", () => {
    const props = {
      store: {
        roomStore: {cardsAreTheSame: false, cardResults: [], cardHistory: [], roomUsers: []},
        userStore: {admin: true},
        jiraStore: {activeBoardFetching: false, activeBoard: {issues: []}}
      }
    }

    const component = shallow(<UserList {...props} />)
    expect(component).toMatchSnapshot()
  })

})
