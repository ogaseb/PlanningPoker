import React, {Component} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import GithubCircle from "mdi-material-ui/GithubCircle";
import styled from "styled-components";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";

const StyledIconButton = styled(IconButton)`
  && {
  position:absolute;
  right: 0
  }
`;


class Header extends Component {

  render() {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
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

