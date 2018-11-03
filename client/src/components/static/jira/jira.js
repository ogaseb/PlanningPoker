import React, {Component} from "react";
import styled from 'styled-components'
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


import {Jira} from 'mdi-material-ui'
import {TextField} from "@material-ui/core";
import {decorate, observable} from "mobx";


const StyledMenu = styled(Menu)`
  && {
  padding:0;
  width:50vw;
  min-width:50vw;
  }
`

const DefaultSelect = styled.select`
  width:100%;
`

class JiraConnector extends Component {
  constructor(props) {
    super(props)
    this.jiraLogin = ""
    this.jiraPassword = ""
    this.jiraSubdomain = ""
    this.subdomains = []
    this.state = {
      anchorEl: null
    };
  }

  componentDidMount() {
    if (localStorage.getItem("jira-credentials") !== null && localStorage.getItem("jira-subdomains") !== null) {
      const subdomains =  JSON.parse(localStorage.getItem('jira-subdomains'));
      this.subdomains = subdomains
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
    if (e.target.id === "more-subdomain-jira") {
      this.jiraSubdomainMore = e.target.value
    }
  }

  handleJiraLogin = () => {
    if (this.jiraLogin !== "" && this.jiraPassword !== "" && this.jiraSubdomain !== "") {
      this.props.store.jiraLogin(this.jiraSubdomain, this.jiraLogin, this.jiraPassword)
      const subDomains = [this.jiraSubdomain]
      const data = {
        jiraLogin: this.jiraLogin,
        jiraPassword: this.jiraPassword
      }
      this.jiraLogin = this.jiraPassword = this.jiraSubdomain = ""
      localStorage.setItem('jira-subdomains', JSON.stringify(subDomains));
      localStorage.setItem('jira-credentials', JSON.stringify(data));
    }
  }

  handleJiraLogout = () => {
    localStorage.removeItem('jira-credentials');
    localStorage.removeItem('jira-subdomains');
    this.props.store.jiraLoggedIn = false
  }

  addSubdomain = () => {
    if (localStorage.getItem("jira-subdomains") !== null) {
      let subdomains = localStorage.getItem('jira-subdomains');
      subdomains = JSON.parse(subdomains)
      subdomains.push(this.jiraSubdomainMore)
      this.jiraSubdomainMore = ""
      localStorage.setItem('jira-subdomains', JSON.stringify(subdomains));
      this.subdomains = subdomains

    }
  }

  changeSubdomain = (e) => {
    if (localStorage.getItem("jira-credentials") !== null) {
      let data = localStorage.getItem('jira-credentials');
      let subdomains = localStorage.getItem('jira-subdomains');
      data = JSON.parse(data)
      subdomains = JSON.parse(subdomains)
      this.props.store.jiraLogin(subdomains[parseInt(e.target.value)], data.jiraLogin, data.jiraPassword)
      this.subdomains = subdomains
    }

  }

  render() {
    return (
      <React.Fragment>
        <Divider/>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon><Jira/> </ListItemIcon>
          <ListItemText primary={"Jira"}/>
        </ListItem>

        <StyledMenu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          {this.props.store.jira.jiraLoggedIn && <div>
            <MenuItem>
              <TextField
                id="more-subdomain-jira"
                label="Add more subdomains"
                placeholder="subdomain.atlassian.net"
                value={this.jiraSubdomainMore}
                onChange={this.handleChange}
                type="text"
              />
            </MenuItem>
            <MenuItem onClick={this.addSubdomain}>Save subdomain</MenuItem>
            <DefaultSelect onChange={this.changeSubdomain}>
              {this.subdomains.length > 0 && this.subdomains.map((data, index) => {
                return (
                  <option value={index}>{data}</option>
                )
              })}
            </DefaultSelect>
            <Divider/>
            <MenuItem onClick={this.handleJiraLogout}>Log Out</MenuItem>

          </div>}
          {!this.props.store.jira.jiraLoggedIn && <div>
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
            <Divider/>
            <MenuItem onClick={this.handleJiraLogin}>Login</MenuItem>
          </div>}
        </StyledMenu>
      </React.Fragment>
    );
  }
};

decorate(JiraConnector, {
  jiraLogin: observable,
  jiraPassword: observable,
  jiraSubdomain: observable,
  jiraSubdomainMore: observable,
  subdomains: observable

});

export default inject("store")(withRouter(observer(JiraConnector)));

