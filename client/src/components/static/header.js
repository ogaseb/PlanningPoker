import React, {Component} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import GithubCircle from "mdi-material-ui/GithubCircle";
import styled from "styled-components";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios"

const StyledIconButton = styled(IconButton)`
  && {
  position:absolute;
  right: 0
  }
`;


class Header extends Component {
  handleLogin = () =>{
    axios.get("/login/google")
      .then(function (response) {
        // handle success
        console.log(response.data)
        // window.open(response.data, "windowname1", 'width=800, height=600');
        // console.log(response);
      })
  }
  render() {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Planning Poker
          </Typography>
          <Button onClick={this.handleLogin} >Login via Google</Button>
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

