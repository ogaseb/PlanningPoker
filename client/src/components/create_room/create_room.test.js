import React from "react";
import {CreateRoom} from "./create_room";
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from "sinon";

configure({adapter: new Adapter()});


describe("CreateRoom", () => {

  it("renders without crashing", () => {
    const store = {
      jira: {
        jiraBoardsFetching: false,
        jiraBoards: {values: []}
      }
    }
    const component = shallow(<CreateRoom store={store}/>)
    expect(component).toMatchSnapshot()
  });

  it("creates room", () => {
    const props = {
      store: {
        jira: {
          jiraBoardsFetching: true,
          jiraBoards: {values: []}
        },
        createRoom: sinon.spy()
      },
    }

    const component = shallow(<CreateRoom {...props} />)
    component.setState({userName: "testName", roomName: "testRoom", roomPassword: "testPassword"});
    const instance = component.instance()
    instance.handleSubmit()
    expect(props.store.createRoom.called).toBe(true)
  });


});