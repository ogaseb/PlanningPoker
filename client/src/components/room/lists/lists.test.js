import React from "react"
import {Lists} from "./lists"
import { shallow } from "enzyme";

describe("UserList", () => {
  it("renders without errors", () => {

    const component = shallow(<Lists />)
    expect(component).toMatchSnapshot()
  })
})
