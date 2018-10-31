import React from "react"
import { shallow } from "enzyme"
import { Notification } from "components/notification/notification"

describe("Notification", () => {
  it("renders without errors", () => {
    const store = {
      uiStore: {
        notificationMessage: "test",
        closeNotification: false,
        notificationOptions: {}
      }
    }
    const component = shallow(<Notification store={store} />)
    expect(component).toMatchSnapshot()
  })
})
