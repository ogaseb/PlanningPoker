import React, {Component} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import GithubCircle from "mdi-material-ui/GithubCircle";
import styled from "styled-components";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import JiraConnector from "./jira/jira";
import List from "@material-ui/core/List/List";
import Drawer from "@material-ui/core/Drawer/Drawer";
import MenuButton from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";


const StyledIconButton = styled(IconButton)`
  && {
  position:absolute;
  right: 0
  }
`;

const StyledDrawer = styled(Drawer)`
  && {
  height:0;
  max-height:50%;
  }
`;

class Header extends Component {
  state = {
    left: false
  };

  componentDidMount() {
    if (localStorage.getItem("jira-credentials") !== null && localStorage.getItem("jira-subdomains") !== null) {
      const data = JSON.parse(localStorage.getItem("jira-credentials"));
      const subdomains =  JSON.parse(localStorage.getItem("jira-subdomains"));
      this.props.store.jiraLogin(subdomains[0], data.jiraLogin, data.jiraPassword)
    }
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu" onClick={this.toggleDrawer("left", true)}>
            <MenuButton/>
          </IconButton>
          <StyledDrawer open={this.state.left} onClose={this.toggleDrawer("left", false)}>
            <div style={{width: "200px"}}>
              <List>
                <ListItem button onClick={this.toggleDrawer("left", false)}>
                  <ListItemIcon><MenuButton/> </ListItemIcon>
                  <ListItemText primary={"back"}/>
                </ListItem>
                <JiraConnector/>
              </List>
            </div>
          </StyledDrawer>
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
}


export default inject("store")(withRouter(observer(Header)));

