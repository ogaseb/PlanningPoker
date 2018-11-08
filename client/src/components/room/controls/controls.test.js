import React from "react"
import { Controls } from "./controls"
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("Controls", () => {
  it("renders without errors", () => {
    const store = {
      room: { cardsAreTheSame : false, cardResults : []},
      user: {admin: true}
    }

    const component = shallow(<Controls store={store} />)
    expect(component).toMatchSnapshot()
  })
})
