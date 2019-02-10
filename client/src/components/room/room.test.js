import React from 'react'
import { Room } from './room'
import { shallow } from 'enzyme'

const noop = () => {}

describe('Room', () => {
  it('renders without errors', () => {
    const store = {
      roomStore: { cardsAreTheSame: false, cardResults: [], cardHistory: [] },
      userStore: { admin: true, users: [] },
      jiraStore: { activeBoardFetching: false, activeBoard: { issues: [] } },
      fetchUsers: noop
    }

    const component = shallow(<Room store={store} />)
    expect(component).toMatchSnapshot()
  })
})
