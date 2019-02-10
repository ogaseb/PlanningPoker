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
import { withCookies } from 'react-cookie'
import routes from '../../routes'
import { reaction } from 'mobx'

const StyledIconButton = styled(IconButton)`
  && {
    position: absolute;
    right: 0;
  }
`

const StyledLogoutButton = styled(Button)`
  && {
    position: absolute;
    right: 50px;
  }
`

const StyledCreateRoomButton = styled(Button)`
  && {
    position: absolute;
    right: 150px;
  }
`

class Header extends Component {
  componentDidMount () {
    const { cookies } = this.props
    const userData = cookies.get('userLoginData')
    if (userData) {
      this.props.store.userStore.loginUser(
        userData.userId,
        userData.userName,
        userData.userEmail
      )
      let link = document.location.href.split('/')
      if (link[3] !== 'room') {
        this.props.history.push(routes.rooms())
      }
    } else {
      let link = document.location.href.split('/')
      if (link[3] !== 'room') {
        this.props.store.userStore.logout()
        this.props.history.push(routes.root())
      }
    }
  }

  handleLogout = () => {
    const { cookies } = this.props
    this.props.store.userStore.logout()
    cookies.remove('userLoginData')
    this.props.history.push(routes.root())
  }

  handleCreateRoom = () => {
    this.props.history.push(routes.create())
  }

  render () {
    const {
      store: {
        userStore: { loggedIn }
      }
    } = this.props

    return (
      <AppBar position='static' color='default'>
        <Toolbar>
          <Typography variant='title' color='inherit'>
            Planning Poker
          </Typography>
          {loggedIn && (
            <StyledLogoutButton
              onClick={this.handleLogout}
              color={'primary'}
              variant={'contained'}
            >
              Logout
            </StyledLogoutButton>
          )}
          {loggedIn && (
            <StyledCreateRoomButton
              onClick={this.handleCreateRoom}
              color={'primary'}
              variant={'contained'}
            >
              Create room
            </StyledCreateRoomButton>
          )}
          <StyledIconButton
            href='https://github.com/ProPanek/ScrumPoker'
            aria-haspopup='true'
            color='inherit'
          >
            <GithubCircle />
          </StyledIconButton>
        </Toolbar>
      </AppBar>
    )
  }
}

export default inject('store')(withCookies(withRouter(observer(Header))))
