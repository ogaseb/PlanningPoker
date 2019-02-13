import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { decorate, observable, reaction } from 'mobx'
import styled from 'styled-components'
import Jira from 'img/jira.png'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import cookie from 'react-cookies'
// import {ConnectJiraLoggedOut} from "../../connect_jira/connect_jira_logged_out";

const StyledDialog = styled(Dialog)`
  & > div > div {
    width: -webkit-fill-available;
  }
`

class JiraDialog extends Component {
  constructor (props) {
    super(props)
    this.openDialog = true
    this.saveCredentials = true
    this.jiraLogin = ''
    this.jiraPassword = ''
    this.jiraSubdomain = ''

    reaction(
      () => this.props.store.jiraStore.jiraLoggedIn,
      () => (this.props.store.jiraStore.jiraLoggedIn ? this.cancelJira() : null)
    )
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

  nextWeek = () => {
    let today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
  }

  handleJiraLogin = () => {
    if (this.jiraLogin && this.jiraPassword && this.jiraSubdomain) {
      this.props.store.jiraStore.jiraLogin(
        this.jiraSubdomain,
        this.jiraLogin,
        this.jiraPassword
      )

      if (this.saveCredentials) {
        cookie.save(
          'userJiraData',
          {
            jiraSubdomain: this.jiraSubdomain,
            jiraLogin: this.jiraLogin,
            jiraPassword: this.jiraPassword
          },
          { path: '/', expires: this.nextWeek() }
        )
      }
    }
  }

  cancelJira = () => {
    this.openDialog = false
    this.props.handleClose()
  }

  render () {
    const { open } = this.props
    return (
      <StyledDialog
        open={open && this.openDialog}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Jira Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Copy your room link and past it to your coworkers if you want them
            to join you.
          </DialogContentText>
          <img
            style={{
              width: '100px',
              position: 'relative',
              left: 'calc(50% - 50px)'
            }}
            src={Jira}
            alt={'Jira logo'}
          />
          <Typography variant='h3' align={'center'}>
            Jira Integration
          </Typography>
          <Typography>
            Do you want to setup Jira integration? This will allow you to select
            issues and set their story points directly from Planning Poker
          </Typography>
          <TextField
            fullWidth
            id='subdomain-jira'
            label='Jira subdomain'
            placeholder='subdomain.atlassian.net'
            value={this.jiraSubdomain}
            onChange={this.handleChangeJiraSubdomain}
            type='text'
            margin='normal'
          />
          <TextField
            fullWidth
            id='login-jira'
            label='Jira E-mail'
            value={this.jiraLogin}
            onChange={this.handleChangeJiraLogin}
            type='email'
            margin='normal'
          />
          <TextField
            fullWidth
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
        </DialogContent>
        <DialogActions>
          <Button onClick={this.cancelJira} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={this.handleJiraLogin}
            color='primary'
            variant='contained'
          >
            Login to jira
          </Button>
        </DialogActions>
      </StyledDialog>
    )
  }
}

decorate(JiraDialog, {
  openDialog: observable,
  jiraLogin: observable,
  jiraPassword: observable,
  jiraSubdomain: observable,
  jiraSubdomainMore: observable,
  subdomains: observable,
  saveCredentials: observable
})

export { JiraDialog }
export default inject('store')(withRouter(observer(JiraDialog)))
