import React from "react"
import {UserList} from "./user_list"
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("UserList", () => {
  it("renders without errors", () => {
    const store = {
      room: { cardsAreTheSame : false, cardResults : [], cardHistory: []},
      user: {admin: true, users: []},
      jira: {activeBoardFetching: false, activeBoard: { issues: []}}
    }

    const component = shallow(<UserList store={store} />)
    expect(component).toMatchSnapshot()
  })
})
