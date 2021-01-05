import React from "react";
import {shallow} from "enzyme";
import {ConnectJira} from "./connect_jira";

describe("CreateRoom", () => {
  it("renders without crashing", () => {
    const props = {
      store: {
        jiraStore:{}
      }
    }
    const component = shallow(<ConnectJira {...props}/>)
    expect(component).toMatchSnapshot()
  });
});