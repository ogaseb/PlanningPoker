import React from "react"
import {Lists} from "./lists"
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("UserList", () => {
  it("renders without errors", () => {

    const component = shallow(<Lists />)
    expect(component).toMatchSnapshot()
  })
})
