import React, { Component } from 'react'
import { Button, Card, Grid } from '@material-ui/core'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import AddCircle from '@material-ui/icons/AddCircle'
import { ArrowUpBold } from 'mdi-material-ui'
import { decorate, observable, reaction } from 'mobx'
import { withCookies } from 'react-cookie'
import GoogleButton from 'react-google-button'

import routes from 'routes'

const StyledGrid = styled(Grid)`
  && {
    height: calc(100vh - 48px);
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
  top: calc(50vh - 240px);
`

const StyledButton = styled(Button)`
  && {
    height: 50px;
    width: 240px;
  }
`

const StyledTypography = styled(Typography)`
  && {
    text-align: center;
    position: relative;
    top: 20%;
  }
`

const StyledAddCircle = styled(AddCircle)`
  && {
    margin-left: 10px;
  }
`

const StyledArrowUpBold = styled(ArrowUpBold)`
  && {
    margin-left: 10px;
  }
`

const StyledButtonGrid = styled(Grid)`
  && {
    margin-top: 40px;
  }
`

class MainPage extends Component {
  constructor (props) {
    super(props)
    this.userName = ''
    this.roomName = ''
    this.roomPassword = ''

    // const {cookies} = props;
    // if (cookies.get('userLoginData')) {
    // }

    // console.log(cookies.get('userLoginData'))
    // reaction(
    //   () => this.props.store.userStore.connected,
    //   () => {
    //     if (this.props.store.userStore.connected) {
    //       this.props.history.push(routes.jira())
    //     }
    //   },
    // )
  }

  handleLogin = () => {
    const {
      cookies,
      history: { push },
      store: {
        userStore: { loginUser }
      }
    } = this.props

    let win = window.open(
      'http://localhost:3001/login/google',
      'GoogleAuth',
      'width=400, height=600'
    )
    const interval = setInterval(() => {
      win.postMessage('getdata', 'http://localhost:3001/login/google/redirect')
    }, 1000)

    window.addEventListener('message', receiveMessage, false)

    function nextWeek () {
      let today = new Date()
      return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 7
      )
    }

    function receiveMessage (event) {
      if (event.origin !== 'http://localhost:3001') return
      clearInterval(interval)
      cookies.set('userLoginData', event.data, {
        path: '/',
        expires: nextWeek()
      })
      loginUser(event.data.userId, event.data.userName, event.data.userEmail)
      push(routes.rooms())
    }
  }

  createGuestAccount = () => {
    this.props.history.push(routes.create())
  }

  render () {
    return (
      <StyledGrid item xs={12}>
        <StyledCard>
          <FormWrapper>
            <Typography variant='h3' align={'center'}>
              Welcome to Planning Poker app
            </Typography>
            <Typography variant={'display1'}>
              {' '}
              please choose if you want to simply create one room or login to
              manage and access all you rooms
            </Typography>
            <StyledButtonGrid container>
              <Grid item xs={5}>
                <GoogleButton type='light' onClick={this.handleLogin} />
                {/*<StyledButton variant="contained" onClick={this.handleJoin}>*/}
                {/*Join room*/}
                {/*<StyledArrowUpBold/>*/}
                {/*</StyledButton>*/}
              </Grid>
              <Grid item xs={2}>
                <StyledTypography variant='h5'> OR </StyledTypography>
              </Grid>
              <Grid item xs={5}>
                <StyledButton
                  color='primary'
                  variant='contained'
                  onClick={this.createGuestAccount}
                >
                  guest sign in
                  <StyledAddCircle />
                </StyledButton>
              </Grid>
            </StyledButtonGrid>
          </FormWrapper>
        </StyledCard>
      </StyledGrid>
    )
  }
}

decorate(MainPage, {
  userName: observable,
  roomName: observable,
  roomPassword: observable
})

export { MainPage }
export default inject('store')(withCookies(withRouter(observer(MainPage))))
