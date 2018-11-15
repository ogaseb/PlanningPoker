import React from "react"
import {Jira} from "./jira"
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Jira", () => {
  it("renders without errors", () => {
    const store = {
      room: { cardsAreTheSame : false, cardResults : [], cardHistory: []},
      user: {admin: true, users: []},
      jira: {activeBoardFetching: false, activeBoard: { issues: []}},
    }

    const component = shallow(<Jira store={store} />)
    expect(component).toMatchSnapshot()
  })
})
