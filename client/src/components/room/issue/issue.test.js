import React from "react"
import { Issue} from "./issue"
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Issue", () => {
  it("renders without errors", () => {
    const store = {
      room: { cardsAreTheSame : false, cardResults : []},
      user: {admin: true},
      jira: {activeBoardFetching: false, activeBoard: { issues: []}}
    }

    const component = shallow(<Issue store={store} />)
    expect(component).toMatchSnapshot()
  })
})
