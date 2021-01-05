import React from "react";
import {shallow} from "enzyme";
import {Error} from "./error";

describe("Error", () => {

  it("renders without crashing", () => {
    const props = {
      store: {
        userStore: {connected: false}
      }
    }
    const component = shallow(<Error {...props}/>)
    expect(component).toMatchSnapshot()
  });

});