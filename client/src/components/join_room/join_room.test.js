import React from 'react'
import { JoinRoom } from './join_room'
import { shallow } from 'enzyme'

const noop = () => {}
describe('JoinRoom', () => {
  it('renders without crashing', () => {
    const props = {
      store: {
        userStore: { connected: false }
      }
    }
    const component = shallow(<JoinRoom {...props} />)
    expect(component).toMatchSnapshot()
  })
})
