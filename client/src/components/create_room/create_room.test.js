import React from "react";
import {CreateRoom} from "./create_room";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


describe("CreateRoom", () => {

  it("renders without crashing", () => {
    const store = {
      jira:{
        jiraBoardsFetching: true,
        jiraBoards: { values: []}
      }
    }
    const component = shallow(<CreateRoom store={store}/>)
    expect(component).toMatchSnapshot()
  });
});