import React from "react";
import {JoinRoom} from "./join_room";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from "sinon";
import {JoinDialog} from "./join_dialog";
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

  it("joins room", () => {
    const props = {
      store: { joinRoom: sinon.spy(), user:{connected: true}},
      match: { params: {} }
    }

    const component = shallow(<JoinDialog {...props}/>)
    component.setState({roomPassword: "testPass", roomId: "testId", userName: "testUser"});

    const instance = component.instance()
    instance.joinRoom()
    expect(props.store.joinRoom.called).toBe(true)
  });
});