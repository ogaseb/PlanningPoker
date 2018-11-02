import React, {Component} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import GithubCircle from 'mdi-material-ui/GithubCircle'
import styled from 'styled-components'
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import {Jira} from 'mdi-material-ui'
import {TextField} from "@material-ui/core";
import {decorate, observable} from "mobx";


const StyledIconButton = styled(IconButton)`
  && {
  position:absolute;
  right: 0
  }
`
const StyledMenu = styled(Menu)`
  && {
  padding:0;
  width:50vw;
  min-width:50vw;
  }
`

class Header extends Component {
  constructor(props) {
    super(props)
    this.jiraLogin = ""
    this.jiraPassword = ""
    this.jiraSubdomain = ""

  }

  state = {
    anchorEl: null,
  };

  componentDidMount(){
    if (localStorage.getItem("jira-credentials") !== null) {
      let data = localStorage.getItem('jira-credentials');
      data = JSON.parse(data)
      this.props.store.jiraLogin(data.jiraSubdomain, data.jiraLogin, data.jiraPassword)
    }

  }

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  handleChange = (e) => {
    if (e.target.id === "login-jira") {
      this.jiraLogin = e.target.value
    }
    if (e.target.id === "password-jira") {
      this.jiraPassword = e.target.value
    }
    if (e.target.id === "subdomain-jira") {
      this.jiraSubdomain = e.target.value
    }
  }
  handleJiraLogin = () => {
    if (this.jiraLogin !== "" && this.jiraPassword !== "" && this.jiraSubdomain !== "") {
      this.props.store.jiraLogin(this.jiraSubdomain, this.jiraLogin, this.jiraPassword)
      const data = {
        jiraLogin: this.jiraLogin,
        jiraPassword: this.jiraPassword,
        jiraSubdomain: this.jiraSubdomain
      }
      localStorage.setItem('jira-credentials', JSON.stringify(data));
    }
  }

  handleJiraLogout = () => {
    localStorage.removeItem('jira-credentials');
    this.props.store.jiraLoggedIn = false
  }

  render() {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Planning Poker
          </Typography>
          <IconButton color="inherit" aria-label="Menu" onClick={this.handleClick}>
            <Jira/>
          </IconButton>
          <StyledMenu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
          >
            {this.props.store.jiraLoggedIn && <div>
              <MenuItem onClick={this.handleJiraLogout}>Log Out</MenuItem>
            </div>}
            {!this.props.store.jiraLoggedIn && <div>
              <MenuItem>
                <TextField
                  id="subdomain-jira"
                  label="Jira subdomain"
                  placeholder="subdomain.atlassian.net"
                  value={this.jiraSubdomain}
                  onChange={this.handleChange}
                  type="text"
                />
              </MenuItem>
              <MenuItem>
                <TextField
                  id="login-jira"
                  label="Jira E-mail"
                  value={this.jiraLogin}
                  onChange={this.handleChange}
                  type="email"
                />
              </MenuItem>
              <MenuItem>
                <TextField
                  id="password-jira"
                  label="Jira api-key"
                  value={this.jiraPassword}
                  onChange={this.handleChange}
                  type="password"
                />
              </MenuItem>
              <MenuItem onClick={this.handleJiraLogin}>Login</MenuItem>
            </div>}

          </StyledMenu>

          <StyledIconButton
            href="https://github.com/ProPanek/ScrumPoker"
            aria-haspopup="true"
            color="inherit"
          >
            <GithubCircle/>
          </StyledIconButton>
        </Toolbar>
      </AppBar>
    );
  }
};

decorate(Header, {
  jiraLogin: observable,
  jiraPassword: observable,
  jiraSubdomain: observable
});

export default inject("store")(withRouter(observer(Header)));

