import React, { Component } from 'react'
import { Grid, Card } from '@material-ui/core'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { decorate, observable } from 'mobx'
import routes from 'routes'
import ConnectJiraLoggedIn from './connect_jira_logged_in'
import ConnectJiraLoggedOut from './connect_jira_logged_out'

const StyledGrid = styled(Grid)`
  && {
    height: calc(100vh - 48px);
    overflow-y: auto;
  }
`

const StyledCard = styled(Card)`
  && {
    height: calc(100vh - 64px);
  }
`

const FormWrapper = styled.div`
  @media only screen and (max-width: 768px) {
    width: 90%;
  }
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
  position: relative;
  top: calc(50vh - 350px);
`

class ConnectJira extends Component {
  constructor (props) {
    super(props)
    this.board = false
    this.saveCredentials = true
    this.jiraLogin = ''
    this.jiraPassword = ''
    this.jiraSubdomain = ''
  }

  componentDidMount () {
    if (
      localStorage.getItem('jira-credentials') !== null &&
      localStorage.getItem('jira-subdomains') !== null
    ) {
      const data = JSON.parse(localStorage.getItem('jira-credentials'))
      const subdomains = JSON.parse(localStorage.getItem('jira-subdomains'))
      this.props.store.jiraStore.jiraLogin(
        subdomains[0],
        data.jiraLogin,
        data.jiraPassword
      )
    }
    window.onpopstate = this.onBackButtonEvent
  }

  onBackButtonEvent = e => {
    const {
      store: {
        userStore: { leaveRoom }
      },
      history: { push }
    } = this.props
    leaveRoom()
    push(routes.root())
  }

  render () {
    const {
      store: {
        jiraStore: { jiraLoggedIn }
      }
    } = this.props
    return (
      <StyledGrid item xs={12}>
        <StyledCard>
          <FormWrapper>
            {jiraLoggedIn ? <ConnectJiraLoggedIn /> : <ConnectJiraLoggedOut />}
          </FormWrapper>
        </StyledCard>
      </StyledGrid>
    )
  }
}

decorate(ConnectJira, {
  jiraLogin: observable,
  jiraPassword: observable,
  jiraSubdomain: observable,
  jiraSubdomainMore: observable,
  board: observable,
  subdomains: observable,
  saveCredentials: observable
})

export { ConnectJira }
export default inject('store')(withRouter(observer(ConnectJira)))
