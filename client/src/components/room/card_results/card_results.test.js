import React from "react"
import { CardResults } from "./card_results"
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("CardResults", () => {
  it("renders without errors", () => {
    const store = {
      room: { waiting : [], cardResults : []}
    }

    const component = shallow(<CardResults store={store} />)
    expect(component).toMatchSnapshot()
  })
})
