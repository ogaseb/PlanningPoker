import React from 'react'
import { Notification } from './notification'
import { shallow } from 'enzyme'

describe('Notification', () => {
  it('renders without errors', () => {
    const store = {
      socketStore: {}
    }
    const component = shallow(<Notification store={store} />)
    expect(component).toMatchSnapshot()
  })
})
