import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import GithubCircle from 'mdi-material-ui/GithubCircle'

import styled from 'styled-components'

const RoomName = styled(Typography)`
  && {
  position:absolute;
  margin: 0 auto;
  width: 200px;
  right: calc(50vw - 100px);
  }
`

const StyledIconButton = styled(IconButton)`
  && {
  position:absolute;
  right: 0
  }
`

const Header = ({roomName, userName}) => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="title" color="inherit">
          Scrum Poker
        </Typography>
        <RoomName variant="subtitle1" color="inherit">
          {userName !== "" && <div> User Name: {userName}</div> }
          {roomName !== "" && <div> Room Name: {roomName}</div> }
        </RoomName>
        <StyledIconButton
          href="https://github.com/ProPanek/ScrumPoker"
          aria-haspopup="true"
          color="inherit"
        >
          <GithubCircle />
        </StyledIconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
