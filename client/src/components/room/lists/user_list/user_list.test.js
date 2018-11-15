import React from "react"
import {UserList} from "./user_list"
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import sinon from "sinon";

configure({adapter: new Adapter()});

describe("HistoryList", () => {
  it("renders without errors", () => {
    const props = {
      store: {
        room: {cardsAreTheSame: false, cardResults: [], cardHistory: []},
        user: {admin: true, users: []},
        jira: {activeBoardFetching: false, activeBoard: {issues: []}}
      }
    }

    const component = shallow(<UserList {...props} />)
    expect(component).toMatchSnapshot()
  })

  it("kicks user", () => {
    const props = {
      store: {
        kickUser: sinon.spy(),
        user: {admin: true, users: [], userName:""},
        room: {cardsAreTheSame: false, cardResults: [], cardHistory: []},
        jira: {boardId:""}
      },
    }

    const component = shallow(<UserList {...props}/>)
    const instance = component.instance()
    instance.userId = "user"
    instance.handleKick()
    expect(props.store.kickUser.called).toBe(true)
  });

  it("gives admin permission to user", () => {
    const props = {
      store: {
        changeAdmin: sinon.spy(),
        user: {admin: true, users: [], userName:""},
        room: {cardsAreTheSame: false, cardResults: [], cardHistory: []},
        jira: {boardId:""}
      },
    }

    const component = shallow(<UserList {...props}/>)
    const instance = component.instance()
    instance.userId = "user"
    instance.handleAdmin()
    expect(props.store.changeAdmin.called).toBe(true)
  });
})
