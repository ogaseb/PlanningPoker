import React from 'react'
import { Jira } from './jira'
import { configure, shallow } from 'enzyme'

describe('Jira', () => {
  it('renders without errors', () => {
    const store = {
      room: { cardsAreTheSame: false, cardResults: [], cardHistory: [] },
      user: { admin: true, users: [] },
      jira: { activeBoardFetching: false, activeBoard: { issues: [] } }
    }

    const component = shallow(<Jira store={store} />)
    expect(component).toMatchSnapshot()
  })
})
