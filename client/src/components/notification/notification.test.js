import React from "react"
import { Notification } from "./notification"
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Notification", () => {
  it("renders without errors", () => {
    const store = {
      notificationMessage: ""
    }
    const component = shallow(<Notification store={store} />)
    expect(component).toMatchSnapshot()
  })
})
