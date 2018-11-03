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
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import MenuButton from "@material-ui/icons/Menu";


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

const DefaultSelect = styled.select`
  width:100%;
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
    left: false
  };

  componentDidMount() {
    if (localStorage.getItem("jira-credentials") !== null && localStorage.getItem("jira-subdomains") !== null) {
      let data = localStorage.getItem('jira-credentials');
      let subdomains = localStorage.getItem('jira-subdomains');
      data = JSON.parse(data)
      subdomains = JSON.parse(subdomains)
      this.props.store.jiraLogin(subdomains[0], data.jiraLogin, data.jiraPassword)
      this.subdomains = subdomains
    }

  }

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
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
      this.jiraLogin = ""
      this.jiraPassword = ""
      localStorage.setItem('jira-subdomains', JSON.stringify(subDomains));
      localStorage.setItem('jira-credentials', JSON.stringify(data));
    }
  }

  handleJiraLogout = () => {
    localStorage.removeItem('jira-credentials');
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
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu" onClick={this.toggleDrawer('left', true)}>
            <MenuButton/>
          </IconButton>
          <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
            <div style={{width: "200px"}}>
              <List>
                <ListItem button onClick={this.toggleDrawer('left', false)}>
                  <ListItemIcon><MenuButton/> </ListItemIcon>
                  <ListItemText primary={"back"}/>
                </ListItem>
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
                  {this.props.store.jiraLoggedIn && <div>
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
                      {this.subdomains.map((data,index)=>{
                        return (
                          <option value={index}>{data}</option>
                        )
                      })}
                    </DefaultSelect>
                    <Divider/>
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
                    <Divider/>
                    <MenuItem onClick={this.handleJiraLogin}>Login</MenuItem>

                  </div>}

                </StyledMenu>
              </List>
            </div>
          </Drawer>
          <Typography variant="title" color="inherit">
            Planning Poker
          </Typography>


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
  jiraSubdomain: observable,
  jiraSubdomainMore: observable,
  subdomains: observable

});

export default inject("store")(withRouter(observer(Header)));

