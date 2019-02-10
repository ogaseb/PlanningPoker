import React from 'react'
import { Controls } from './controls'
import { shallow } from 'enzyme'

describe('Controls', () => {
  it('renders without errors', () => {
    const store = {
      roomStore: { cardsAreTheSame: false, cardResults: [] },
      userStore: { admin: true },
      jiraStore: { jiraLoggedIn: true }
    }

    const component = shallow(<Controls store={store} />)
    expect(component).toMatchSnapshot()
  })
})
