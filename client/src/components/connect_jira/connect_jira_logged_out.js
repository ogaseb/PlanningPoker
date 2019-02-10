import React, { Component } from 'react'
import { Grid, Button, TextField } from '@material-ui/core'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { ArrowUpBold, Login } from 'mdi-material-ui'
import { decorate, observable } from 'mobx'
import Jira from 'img/jira.png'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel'
import routes from 'routes'

const StyledButton = styled(Button)`
  && {
    width: 100%;
  }
`

const StyledTypography = styled(Typography)`
  && {
    text-align: center;
    position: relative;
    top: 20%;
  }
`

const StyledGrid = styled(Grid)`
  margin-top: 40px;
`

const StyledArrowUpBold = styled(ArrowUpBold)`
  margin-left: 10px;
`

const StyledLogin = styled(Login)`
  margin-left: 10px;
`

class ConnectJiraLoggedOut extends Component {
  constructor (props) {
    super(props)
    this.saveCredentials = true
    this.jiraLogin = ''
    this.jiraPassword = ''
    this.jiraSubdomain = ''
  }

  handleJiraLogin = () => {
    if (this.jiraLogin && this.jiraPassword && this.jiraSubdomain) {
      this.props.store.jiraStore.jiraLogin(
        this.jiraSubdomain,
        this.jiraLogin,
        this.jiraPassword
      )
      const subDomains = [this.jiraSubdomain]
      const data = {
        jiraLogin: this.jiraLogin,
        jiraPassword: this.jiraPassword
      }
      this.jiraLogin = this.jiraPassword = this.jiraSubdomain = ''
      if (this.saveCredentials) {
        localStorage.setItem('jira-subdomains', JSON.stringify(subDomains))
        localStorage.setItem('jira-credentials', JSON.stringify(data))
      }
    }
  }

  handleChangeJiraLogin = e => {
    this.jiraLogin = e.target.value
  }

  handleChangeJiraPassword = e => {
    this.jiraPassword = e.target.value
  }

  handleChangeJiraSubdomain = e => {
    this.jiraSubdomain = e.target.value
  }

  handleChangeJiraCredentials = e => {
    this.saveCredentials = e.target.checked
  }

  goToRoom = () => {
    const {
      store: {
        jiraStore: { jiraLoggedIn, saveBoardId },
        roomStore: { roomName, roomId }
      },
      history: { push }
    } = this.props
    if (jiraLoggedIn) {
      saveBoardId(this.board)
    }
    push(routes.room(roomName, roomId))
  }

  render () {
    return (
      <>
        <img
          style={{ width: '100px', margin: '0 auto' }}
          src={Jira}
          alt={'Jira logo'}
        />
        <Typography variant='h3' align={'center'}>
          Jira Integration
        </Typography>
        <Typography>
          Do you want to setup Jira integration? This will allow you to select
          issues and set ther story points directly from Planning Poker
        </Typography>
        <TextField
          id='subdomain-jira'
          label='Jira subdomain'
          placeholder='subdomain.atlassian.net'
          value={this.jiraSubdomain}
          onChange={this.handleChangeJiraSubdomain}
          type='text'
          margin='normal'
        />
        <TextField
          id='login-jira'
          label='Jira E-mail'
          value={this.jiraLogin}
          onChange={this.handleChangeJiraLogin}
          type='email'
          margin='normal'
        />
        <TextField
          id='password-jira'
          label='Jira api-key'
          value={this.jiraPassword}
          onChange={this.handleChangeJiraPassword}
          type='password'
          margin='normal'
        />
        <FormControlLabel
          control={
            <Checkbox
              id='save-credentials'
              checked={this.saveCredentials}
              onChange={this.handleChangeJiraCredentials}
              value='save'
              color='primary'
            />
          }
          label='Keep me logged in'
        />
        <StyledGrid container>
          <Grid item xs={5}>
            <StyledButton
              color='primary'
              variant='contained'
              onClick={this.handleJiraLogin}
            >
              Connect to Jira
              <StyledLogin />
            </StyledButton>
          </Grid>
          <Grid item xs={2}>
            <StyledTypography variant='h5'> OR </StyledTypography>
          </Grid>
          <Grid item xs={5}>
            <StyledButton variant='contained' onClick={this.goToRoom}>
              Skip and go to room
              <StyledArrowUpBold />
            </StyledButton>
          </Grid>
        </StyledGrid>
      </>
    )
  }
}

decorate(ConnectJiraLoggedOut, {
  jiraLogin: observable,
  jiraPassword: observable,
  jiraSubdomain: observable,
  jiraSubdomainMore: observable,
  subdomains: observable,
  saveCredentials: observable
})

export { ConnectJiraLoggedOut }
export default inject('store')(withRouter(observer(ConnectJiraLoggedOut)))
