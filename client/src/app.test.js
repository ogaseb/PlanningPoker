import React from "react";
import {App} from "./app";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const noop = () => {}
it("renders without crashing", () => {
    const store = {
        fetchRooms: noop
    }
    const component = shallow(<App store={store} />)
    expect(component).toMatchSnapshot()
});
