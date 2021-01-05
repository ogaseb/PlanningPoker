import React from "react";
import {shallow} from "enzyme";
import {JoinDialog} from "./join_dialog";


const noop = () => {}
describe("JoinRoom", () => {

  it("renders without crashing", () => {
    const props = {
      store: {
        userStore: {connected: false}
      }
    }
    const component = shallow(<JoinDialog {...props}/>)
    expect(component).toMatchSnapshot()
  });

});