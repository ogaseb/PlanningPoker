import React from "react"
import {Room} from "./room"
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

const noop = () => {}

describe("Room", () => {
  it("renders without errors", () => {
    const store = {
      room: { cardsAreTheSame : false, cardResults : [], cardHistory: []},
      user: {admin: true, users: []},
      jira: {activeBoardFetching: false, activeBoard: { issues: []}},
      fetchUsers: noop
    }

    const component = shallow(<Room store={store} />)
    expect(component).toMatchSnapshot()
  })
})
