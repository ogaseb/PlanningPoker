import React, {Component} from "react";
import styled from "styled-components";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {Jira} from "mdi-material-ui";
import {TextField} from "@material-ui/core";
import {decorate, observable} from "mobx";
import Paper from "@material-ui/core/Paper/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const StyledPaper = styled(Paper)`
  && {
  padding:0;
  width:100%;
  }
`;

const DefaultSelect = styled.select`
  width:100%;
`;

const StyledExpansionPanelDetails = styled(ExpansionPanelDetails)`
  &&{
  padding:0;
  }
`;

class JiraConnector extends Component {
  constructor(props) {
    super(props)
    this.jiraLogin = ""
    this.jiraPassword = ""
    this.jiraSubdomain = ""
    this.subdomains = []
    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem("jira-credentials") !== null && localStorage.getItem("jira-subdomains") !== null) {
      this.subdomains = JSON.parse(localStorage.getItem("jira-subdomains"))
    }
  }

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
      localStorage.setItem("jira-subdomains", JSON.stringify(subDomains));
      localStorage.setItem("jira-credentials", JSON.stringify(data));
      this.subdomains = JSON.parse(localStorage.getItem("jira-subdomains"))
    }
  }

  handleJiraLogout = () => {
    localStorage.removeItem("jira-credentials");
    localStorage.removeItem("jira-subdomains");
    this.props.store.jira.jiraLoggedIn = false
  }

  addSubdomain = () => {
    if (localStorage.getItem("jira-subdomains") !== null) {
      let subdomains = JSON.parse(localStorage.getItem("jira-subdomains"));
      subdomains.push(this.jiraSubdomainMore)
      this.jiraSubdomainMore = ""
      localStorage.setItem("jira-subdomains", JSON.stringify(subdomains));
      this.subdomains = subdomains
    }
  }

  changeSubdomain = (e) => {
    if (localStorage.getItem("jira-credentials") !== null) {
      const data =  JSON.parse(localStorage.getItem("jira-credentials"));
      const subdomains = JSON.parse(localStorage.getItem("jira-subdomains"));
      this.props.store.jiraLogin(subdomains[parseInt(e.target.value)], data.jiraLogin, data.jiraPassword)
      this.subdomains = subdomains
    }
  }

  render() {
    return (
      <React.Fragment>
        <Divider/>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <ListItemIcon><Jira /></ListItemIcon>
            <ListItemText primary={"Jira"}/>
          </ExpansionPanelSummary>
          <StyledExpansionPanelDetails>
            <StyledPaper>
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
                      <option key={index} value={index}>{data}</option>
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
            </StyledPaper>
          </StyledExpansionPanelDetails>
        </ExpansionPanel>
      </React.Fragment>
    );
  }
}

decorate(JiraConnector, {
  jiraLogin: observable,
  jiraPassword: observable,
  jiraSubdomain: observable,
  jiraSubdomainMore: observable,
  subdomains: observable
});

export {Jira}
export default inject("store")(withRouter(observer(JiraConnector)));

