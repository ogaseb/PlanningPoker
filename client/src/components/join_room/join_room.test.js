import React from "react";
import {JoinRoom} from "./join_room";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


describe("JoinRoom", () => {

  it("renders without crashing", () => {
    const store = {
      jira:{
        jiraBoardsFetching: true,
        jiraBoards: { values: []}
      },
      room:{rooms:[]}
    }
    const component = shallow(<JoinRoom store={store}/>)
    expect(component).toMatchSnapshot()
  });
});