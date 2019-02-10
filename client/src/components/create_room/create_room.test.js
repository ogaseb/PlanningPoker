import React from 'react'
import { shallow } from 'enzyme'
import { CreateRoom } from './create_room'

describe('CreateRoom', () => {
  it('renders without crashing', () => {
    const props = {
      store: {
        userStore: { connected: false }
      }
    }
    const component = shallow(<CreateRoom {...props} />)
    expect(component).toMatchSnapshot()
  })
})
