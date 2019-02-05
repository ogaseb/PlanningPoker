import React from "react";
import {App} from "./app";
import { shallow } from "enzyme";

const noop = () => {}
it("renders without crashing", () => {
    const store = {
        userStore: {initialize: noop},
        roomStore:{initialize: noop},
        socketStore:{initialize: noop},
        jiraStore:{initialize: noop},
    }
    const component = shallow(<App store={store} />)
    expect(component).toMatchSnapshot()
});
