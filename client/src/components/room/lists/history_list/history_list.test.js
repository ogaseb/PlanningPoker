import React from 'react'
import { HistoryList } from './history_list'
import { shallow } from 'enzyme'

describe('HistoryList', () => {
  it('renders without errors', () => {
    const props = {
      store: {
        roomStore: { cardsAreTheSame: false, cardResults: [], cardHistory: [] },
        userStore: { admin: true, users: [] },
        jiraStore: { activeBoardFetching: false, activeBoard: { issues: [] } }
      }
    }

    const component = shallow(<HistoryList {...props} />)
    expect(component).toMatchSnapshot()
  })
})
