import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import GithubCircle from 'mdi-material-ui/GithubCircle'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import cookie from 'react-cookies'
import routes from 'routes'
import { decorate, observable } from 'mobx'
import DialogPopup from 'components/dialog_popup/dialog_popup'

const StyledIconButton = styled(IconButton)`
  && {
    margin-right: 5px;
  }
`

const StyledLogoutButton = styled(Button)`
  && {
    margin-right: 5px;
  }
`

const StyledJiraLoginButton = styled(Button)`
  && {
    margin-right: 5px;
  }
`

const StyledCreateRoomButton = styled(Button)`
  && {
    margin-right: 5px;
  }
`

const ButtonWrapper = styled.div`
  && {
    position: absolute;
    right: 0;
  }
`

const StyledAppBar = styled(AppBar)`
  && {
    position: relative;
  }
`

class Header extends Component {
  constructor (props) {
    super(props)
    this.openCreateDialog = false
    this.openJiraDialog = false
  }

  checkIfIsInRoom = () => {
    let link = document.location.href.split('/')
    return link[3] !== 'room'
  }

  componentDidMount () {
    const userData = cookie.load('userLoginData')
    if (userData) {
      this.props.store.userStore.loginUser(
        userData.userId,
        userData.userName,
        userData.userEmail
      )
      if (this.checkIfIsInRoom()) {
        this.props.history.push(routes.rooms())
      }
    } else {
      if (this.checkIfIsInRoom()) {
        this.props.store.userStore.logout()
        this.props.history.push(routes.root())
      }
    }

    const jiraData = cookie.load('userJiraData')
    if (jiraData) {
      this.props.store.jiraStore.jiraLogin(
        jiraData.jiraSubdomain,
        jiraData.jiraLogin,
        jiraData.jiraPassword
      )
    }
  }

  handleLogout = () => {
    cookie.remove('userLoginData', { path: '/' })
    cookie.remove('userJiraData', { path: '/' })
    this.props.store.userStore.logout()
    this.props.store.jiraStore.logout()
    this.props.history.push(routes.root())
  }

  handleCreateRoom = () => {
    this.openCreateDialog = true
  }

  handleJiraLogin = () => {
    this.openJiraDialog = true
  }

  handleCloseCreateDialog = () => {
    this.openCreateDialog = false
  }

  handleCloseJiraDialog = () => {
    this.openJiraDialog = false
  }

  render () {
    const {
      store: {
        userStore: { loggedIn },
        jiraStore: { jiraLoggedIn },
        location
      }
    } = this.props

    return (
      <StyledAppBar position='static' color='default'>
        <DialogPopup
          createDialog={this.openCreateDialog}
          closeCreateDialog={this.handleCloseCreateDialog}
        />
        <DialogPopup
          jiraDialog={this.openJiraDialog}
          closeJiraDialog={this.handleCloseJiraDialog}
        />
        <Toolbar>
          <Typography variant='title' color='inherit'>
            Planning Poker
          </Typography>
          <ButtonWrapper>
            {loggedIn && this.checkIfIsInRoom() && (
              <StyledCreateRoomButton
                onClick={this.handleCreateRoom}
                color={'primary'}
                variant={'contained'}
              >
                Create room
              </StyledCreateRoomButton>
            )}
            {!jiraLoggedIn && this.checkIfIsInRoom() && (
              <StyledJiraLoginButton
                onClick={this.handleJiraLogin}
                color={'primary'}
                variant={'contained'}
              >
                Jira login
              </StyledJiraLoginButton>
            )}
            {loggedIn && (
              <StyledLogoutButton
                onClick={this.handleLogout}
                color={'primary'}
                variant={'contained'}
              >
                Logout
              </StyledLogoutButton>
            )}
            <StyledIconButton
              href='https://github.com/ProPanek/ScrumPoker'
              aria-haspopup='true'
              color='inherit'
            >
              <GithubCircle />
            </StyledIconButton>
          </ButtonWrapper>
        </Toolbar>
      </StyledAppBar>
    )
  }
}

decorate(Header, {
  openCreateDialog: observable,
  openJiraDialog: observable
})

export default inject('store')(withRouter(observer(Header)))
