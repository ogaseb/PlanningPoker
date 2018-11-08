import React from "react";
import {JoinDialog} from "./join_dialog";
import sinon from 'sinon'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


describe("CreateRoom", () => {

  it("renders without crashing", () => {
    const store = {
     openJoinDialog: true
    }
    const component = shallow(<JoinDialog store={store}/>)
    expect(component).toMatchSnapshot()
  });

  it("cancels joining room", () => {
    const props = {
      store: {openJoinDialog: true},
      history: { push: sinon.spy() },
      match: { params: {} }
    }

    const component = shallow(<JoinDialog {...props}/>)
    const instance = component.instance()
    instance.cancelJoinRoom()
    expect(props.history.push.called).toBe(true)

  });

  it("joins room", () => {
    const props = {
      store: {openJoinDialog: true, joinRoom: sinon.spy(), user:{connected: true}},
      match: { params: {} }
    }

    const component = shallow(<JoinDialog {...props}/>)
    const instance = component.instance()
    instance.joinRoom()
    expect(props.store.joinRoom.called).toBe(true)

  });
});