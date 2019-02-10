import React from 'react'
import { shallow } from 'enzyme'
import { ConnectJiraLoggedIn } from './connect_jira_logged_in'

describe('CreateRoom', () => {
  it('renders without crashing', () => {
    const props = {
      store: {
        jiraStore: { jiraBoards: { values: [] } }
      }
    }
    const component = shallow(<ConnectJiraLoggedIn {...props} />)
    expect(component).toMatchSnapshot()
  })
})
